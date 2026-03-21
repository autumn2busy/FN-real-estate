import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import Groq from "groq-sdk";
import { upsertContact, addTagToContact, getDealsByContact, updateDealStage } from "@/lib/activecampaign";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// ActiveCampaign Stage IDs (Flynerd Auto-Pilot Pipeline)
const STAGE_NEGOTIATING = "12";
const STAGE_CLOSED_WON = "13";

// POST /api/agents/closer (Webhook from Inbound Email/n8n)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { From, TextBody } = body;

    if (!From || !TextBody) {
      return NextResponse.json({ error: "Missing email payload data" }, { status: 400 });
    }

    let leadEmail = From.toLowerCase().trim();
    // n8n often sends From as "Name <email@domain.com>" - extract just the email
    const emailMatch = leadEmail.match(/<([^>]+)>/);
    if (emailMatch) {
        leadEmail = emailMatch[1];
    }
    const lead = await prisma.agencyLead.findFirst({
      where: { contactEmail: leadEmail },
    });

    if (!lead) return NextResponse.json({ message: "No lead found" });

    // 1. Update DB status
    await prisma.agencyLead.update({
      where: { id: lead.id },
      data: { status: "NEGOTIATING" },
    });

    // 2. Generate AI response
    const prompt = `Handle objection for ${lead.businessName}: "${TextBody}". Push to Stripe ${process.env.STRIPE_PAYMENT_LINK}`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
    });

    const aiReplyDraft = completion.choices[0]?.message?.content || "";

    // 3. ActiveCampaign: Tag + Move Deal to "Negotiating" stage
    const contactRes = await upsertContact(leadEmail, lead.businessName, "Business");
    const contactId = contactRes.contact?.id;
    
    if (contactId) {
      await addTagToContact(contactId, "AI_REPLY_READY");
      await addTagToContact(contactId, "email replied");

      // Find the contact's open deal and move it to Negotiating
      const dealsRes = await getDealsByContact(contactId);
      const openDeal = dealsRes.deals?.find((d: any) => d.status === "0"); // status 0 = Open
      
      if (openDeal) {
        await updateDealStage(openDeal.id, STAGE_NEGOTIATING);
        console.log(`[Closer Agent] Moved Deal ${openDeal.id} to Stage: Negotiating`);
      }
    }

    return NextResponse.json({
      message: "Reply processed via Groq. Deal moved to Negotiating.",
      draftedReply: aiReplyDraft,
    });
  } catch (error: any) {
    console.error("Closer Agent Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

