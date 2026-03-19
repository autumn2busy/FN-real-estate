import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedTestLead() {
  console.log("Seeding test lead for Closer Agent testing...");

  try {
    const lead = await prisma.agencyLead.upsert({
      where: { contactEmail: "test@flynerd.tech" },
      update: {
        status: "PITCHED",
        intelScore: 85,
      },
      create: {
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

    console.log("Successfully seeded test lead:");
    console.log(JSON.stringify(lead, null, 2));
    await prisma.$disconnect();
    process.exit(0);
  } catch (error) {
    console.error("--- FULL PRISMA ERROR ---");
    console.error(error);
    if (error.code) console.error("Error Code:", error.code);
    if (error.message) console.error("Error Message:", error.message);
    await prisma.$disconnect();
    process.exit(1);
  }
}

seedTestLead();
