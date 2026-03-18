import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import Groq from "groq-sdk";
import { upsertContact, addTagToContact } from "@/lib/activecampaign";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// POST /api/agents/closer (Webhook from Inbound Email/AC)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Assuming ActiveCampaign sends a webhook on reply or we use a manual trigger
    const { From, TextBody } = body;

    if (!From || !TextBody) {
      return NextResponse.json({ error: "Missing email payload data" }, { status: 400 });
    }

    const leadEmail = From.toLowerCase().trim();
    const lead = await prisma.agencyLead.findFirst({
      where: { contactEmail: leadEmail },
    });

    if (!lead) return NextResponse.json({ message: "No lead found" });

    // Update status
    await prisma.agencyLead.update({
      where: { id: lead.id },
      data: { status: "NEGOTIATING" },
    });

    const prompt = `Handle objection for ${lead.businessName}: "${TextBody}". Push to Stripe ${process.env.STRIPE_PAYMENT_LINK}`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
    });

    const aiReplyDraft = completion.choices[0]?.message?.content || "";

    // In ActiveCampaign, you might trigger an automation with this draft
    // or use a Note/Custom Field that a human or AC automation sends.
    // For now, we'll tag them to signify an AI response is ready.
    const contactRes = await upsertContact(leadEmail, lead.businessName, "Business");
    const contactId = contactRes.contact?.id;
    
    if (contactId) {
      await addTagToContact(contactId, "AI_REPLY_READY");
    }

    return NextResponse.json({
      message: "Reply processed via Groq. Lead tagged in ActiveCampaign.",
      draftedReply: aiReplyDraft,
    });
  } catch (error: any) {
    console.error("Closer Agent Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
