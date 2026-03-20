import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function seedProspect() {
  const businessName = "Flynerd Test Agency";
  const contactEmail = "info@flynerd.tech";
  const placeId = "test_place_" + Date.now();

  console.log(`Seeding PROSPECT lead for ${businessName}...`);

  try {
    const lead = await prisma.agencyLead.create({
      data: {
        businessName,
        contactEmail,
        placeId,
        niche: "digital-marketing",
        status: "PROSPECT",
      }
    });
    console.log("Successfully created PROSPECT lead:", lead.id);
  } catch (error) {
    console.error("Error seeding lead:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedProspect();
