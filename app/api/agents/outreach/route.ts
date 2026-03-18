import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { upsertContact, addTagToContact, updateContactField } from "@/lib/activecampaign";

// POST /api/agents/outreach
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { leadId, businessName, contactEmail, demoSiteUrl, walkthroughVideoUrl } = body;

    if (!leadId || !businessName || !demoSiteUrl) {
      return NextResponse.json(
        { error: "Missing required fields: leadId, businessName, demoSiteUrl" },
        { status: 400 }
      );
    }

    if (!contactEmail) {
      console.log(`[Outreach Agent] No email for ${businessName}. Skipping.`);
      await prisma.agencyLead.update({
        where: { id: leadId },
        data: { status: "PITCHED" },
      });
      return NextResponse.json({ message: "No email, marked as pitched." });
    }

    // Use ActiveCampaign to trigger outreach
    // Scenario: We add the contact and tag them with "TRIGGER_OUTREACH"
    // ActiveCampaign Automation should be set to trigger on this tag.
    
    const contactRes = await upsertContact(contactEmail, businessName, "Business", leadId);
    const contactId = contactRes.contact?.id;

    if (!contactId) {
      return NextResponse.json({ error: "Failed to sync contact to ActiveCampaign" }, { status: 500 });
    }

    // Optional: Update custom fields for Demo URL and Video URL
    // You'd need to know the Field IDs from AC
    // await updateContactField(contactId, "1", demoSiteUrl); 

    await addTagToContact(contactId, "FLYNERD_OUTREACH_PENDING");

    const updatedLead = await prisma.agencyLead.update({
      where: { id: leadId },
      data: {
        status: "PITCHED",
        outreachHistory: [
          {
            type: "activecampaign",
            status: "tag_added",
            contactId,
            timestamp: new Date(),
          },
        ],
      },
    });

    return NextResponse.json({
      message: "Lead pushed to ActiveCampaign for outreach automation.",
      contactId,
      lead: updatedLead,
    });
  } catch (error: any) {
    console.error("Outreach Agent Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message },
      { status: 500 }
    );
  }
}
