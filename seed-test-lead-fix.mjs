import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedTestLead() {
  console.log("Seeding test lead for Closer Agent testing...");

  const testEmail = "test@flynerd.tech";
  const testPlaceId = `test-place-${Date.now()}`;

  try {
    // Check if it already exists to avoid PlaceId unique constraint error if run twice
    const existing = await prisma.agencyLead.findFirst({
      where: { contactEmail: testEmail }
    });

    if (existing) {
      console.log("Test lead already exists. Updating status to PITCHED...");
      await prisma.agencyLead.update({
        where: { id: existing.id },
        data: { status: "PITCHED" }
      });
      console.log("Update complete.");
    } else {
      const lead = await prisma.agencyLead.create({
        data: {
          businessName: "Test Plumbing Co",
          niche: "plumber",
          status: "PITCHED",
          contactEmail: testEmail,
          placeId: testPlaceId,
          intelScore: 85,
          intelData: {
            painPoints: ["attracting emergency call-outs", "no mobile optimization"],
            presenceScore: 40
          },
          demoSiteUrl: "https://test-plumbing-demo.vercel.app",
          walkthroughVideoUrl: "https://share.heygen.com/demo-test-123"
        }
      });
      console.log("Successfully created new test lead:");
      console.log(JSON.stringify(lead, null, 2));
    }

    await prisma.$disconnect();
    process.exit(0);
  } catch (error) {
    console.error("--- FULL PRISMA ERROR ---");
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

seedTestLead();
