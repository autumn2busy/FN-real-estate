// e2e-live-test.mjs
// This script runs ONE lead through the entire production pipeline.
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const BASE_URL = "http://localhost:3000";

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runLiveE2ETest() {
  console.log("==========================================");
  console.log("🚀 INITIATING LIVE FULL-FUNNEL TEST 🚀");
  console.log("==========================================\n");

  try {
    // 1. Setup: Grab a raw PROSPECT from the database.
    let lead = await prisma.agencyLead.findFirst({
      where: { status: "PROSPECT" }
    });

    if (!lead) {
      console.error("❌ No leads in 'PROSPECT' status found. Please run the Scout agent first.");
      process.exit(1);
    }

    console.log(`📌 Target Acquired: ${lead.businessName} (ID: ${lead.id})`);

    // IMPORTANT: Reroute the contact email to the user so they actually receive the pitch.
    const TEST_EMAIL = "info@flynerd.tech"; // <--- CHANGE THIS IF YOU WANT IT SENT TO YOUR PERSONAL GMAIL
    console.log(`⚠️ Overriding lead contact email to ${TEST_EMAIL} for testing...`);
    
    lead = await prisma.agencyLead.update({
      where: { id: lead.id },
      data: { contactEmail: TEST_EMAIL }
    });

    // 2. The Intel Phase
    console.log("\n🕵️ [STAGE 1] Triggering Intel Agent (Groq / Yelp)...");
    const intelRes = await fetch(`${BASE_URL}/api/agents/intel`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        leadId: lead.id,
        placeId: lead.placeId,
        businessName: lead.businessName,
      }),
    });
    console.log("Result:", await intelRes.json());
    await delay(2000);

    // 3. The Builder Phase
    console.log("\n🏗️ [STAGE 2] Triggering Builder Agent (Vercel / HeyGen)...");
    const builderRes = await fetch(`${BASE_URL}/api/agents/builder`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        leadId: lead.id,
        businessName: lead.businessName,
        niche: lead.niche,
        // Grabbing the fresh intel data from DB
        intelData: (await prisma.agencyLead.findUnique({where: {id:lead.id}})).intelData,
      }),
    });
    console.log("Result:", await builderRes.json());
    await delay(2000);

    // 4. The Outreach Phase
    console.log("\n📨 [STAGE 3] Triggering Outreach Agent (ActiveCampaign)...");
    // Fetch fresh database record to get the new Demo/Video URLs
    lead = await prisma.agencyLead.findUnique({where: {id: lead.id}});
    
    const outreachRes = await fetch(`${BASE_URL}/api/agents/outreach`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        leadId: lead.id,
        businessName: lead.businessName,
        contactEmail: lead.contactEmail,
        demoSiteUrl: lead.demoSiteUrl,
        walkthroughVideoUrl: lead.walkthroughVideoUrl,
      }),
    });
    console.log("Result:", await outreachRes.json());

    console.log("\n✅ OUTBOUND FUNNEL COMPLETE!");
    console.log("The lead is now tagged 'FLYNERD_OUTREACH_PENDING' in ActiveCampaign.");
    console.log("If your ActiveCampaign Automation is turned on, the cold pitch email should arrive in your inbox in a minute.");

    await prisma.$disconnect();
    process.exit(0);

  } catch (error) {
    console.error("Flow failed:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

runLiveE2ETest();
