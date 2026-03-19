import { prisma } from "./lib/db";

async function seedTestLead() {
  console.log("Seeding test lead for Closer Agent testing...");

  try {
    const lead = await prisma.agencyLead.create({
      data: {
        businessName: "Test Plumbing Co",
        niche: "plumber",
        status: "PITCHED",
        contactEmail: "test@flynerd.tech",
        intelScore: 85,
        intelData: {
          painPoints: ["attracting emergency call-outs", "no mobile optimization"],
          presenceScore: 40
        },
        demoSiteUrl: "https://test-plumbing-demo.vercel.app",
        walkthroughVideoUrl: "https://share.heygen.com/demo-test-123"
      }
    });

    console.log("Successfully created test lead:");
    console.log(JSON.stringify(lead, null, 2));
    process.exit(0);
  } catch (error) {
    console.error("Error seeding test lead:", error);
    process.exit(1);
  }
}

seedTestLead();
