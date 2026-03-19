import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { upsertContact, addTagToContact, updateContactField } from "@/lib/activecampaign";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// POST /api/agents/growth
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { leadId } = body;

    let leadsToProcess = [];

    if (leadId) {
      const singleLead = await prisma.agencyLead.findUnique({ where: { id: leadId } });
      if (singleLead && singleLead.status === "ACTIVE") leadsToProcess.push(singleLead);
    } else {
      leadsToProcess = await prisma.agencyLead.findMany({ where: { status: "ACTIVE" } });
    }

    if (leadsToProcess.length === 0) {
      return NextResponse.json({ message: "No active clients to process." });
    }

    const results = [];

    for (const client of leadsToProcess) {
      if (!client.contactEmail) continue;

      // 1. Generate a Personalized "Monthly Growth Insight" using Groq
      const upsellPitch = "AI Appointment Booking System";
      const prompt = `Draft a short, 2-sentence monthly check-in for ${client.businessName} (Niche: ${client.niche}). 
      Mention that their website is performing well, and suggest that adding an "${upsellPitch}" could help convert even more leads. 
      Keep it professional, friendly, and low-pressure. Agent Name: Flynerd Tech Team.`;

      const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
      });

      const growthInsight = completion.choices[0]?.message?.content || "";

      // 2. Sync to ActiveCampaign
      const contactRes = await upsertContact(client.contactEmail, client.businessName, "Business");
      const contactId = contactRes.contact?.id;
      
      if (contactId) {
        // Tag to trigger the "Growth Automation" in AC
        await addTagToContact(contactId, "FLYNERD_MONTHLY_REPORT_TRIGGER");
        
        // If the user adds a "GrowthInsight" field ID (e.g., 155) in the future, we can update it here.
        // For now, we'll log it to the outreach history in our DB.
        console.log(`[Growth Agent] Generated Insight for ${client.businessName}: ${growthInsight}`);
      }

      // 3. Update DB tracking
      await prisma.agencyLead.update({
        where: { id: client.id },
        data: { 
          updatedAt: new Date(),
          outreachHistory: [
            ...(Array.isArray(client.outreachHistory) ? client.outreachHistory : []),
            {
              type: "growth_insight",
              insight: growthInsight,
              timestamp: new Date(),
            }
          ]
        },
      });

      results.push({ business: client.businessName, status: "tagged", insight: growthInsight });
    }

    return NextResponse.json({
      message: `Growth agent processed ${leadsToProcess.length} clients.`,
      results
    });
  } catch (error: any) {
    console.error("Growth Agent Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

