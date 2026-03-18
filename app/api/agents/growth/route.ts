import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { upsertContact, addTagToContact } from "@/lib/activecampaign";

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

    for (const client of leadsToProcess) {
      if (!client.contactEmail) continue;

      // In ActiveCampaign, we tag the user with "SEND_MONTHLY_REPORT"
      // or similar, which triggers an automation in AC that pulls data 
      // from custom fields or sends a standardized template.
      
      const contactRes = await upsertContact(client.contactEmail, client.businessName, "Business");
      const contactId = contactRes.contact?.id;
      
      if (contactId) {
        await addTagToContact(contactId, "FLYNERD_MONTHLY_REPORT_TRIGGER");
      }

      await prisma.agencyLead.update({
        where: { id: client.id },
        data: { updatedAt: new Date() },
      });
    }

    return NextResponse.json({
      message: `Growth agent tagged ${leadsToProcess.length} clients in ActiveCampaign for monthly reports.`,
    });
  } catch (error: any) {
    console.error("Growth Agent Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
