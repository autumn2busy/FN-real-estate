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
    const prompt = `
You are a top-tier Sales Executive at Flynerd Tech. 
You are replying to an email from a lead named ${lead.businessName}. 
They just replied to our cold pitch with this message: "${TextBody}"

Your goal is to handle their objection or question.
If they ask about pricing, use this exact structure:
- Setup Fee: $997 (covers custom design, AI booking agent, and integration)
- Monthly: $197/mo (covers hosting, 24/7 AI maintenance, and support)

Rules for your reply:
1. Be concise, professional, and friendly. Write it exactly like a real human sending an email.
2. Directly answer their question.
3. Include this exact call to action at the end: "You can securely complete your setup and claim this site here: ${process.env.STRIPE_PAYMENT_LINK}"
4. CRITICAL: DO NOT include any meta-commentary, notes, or structural explanations (e.g. "This response aims to..."). Return ONLY the exact body of the email.
`;

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

