import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function getUrls() {
  const lead = await prisma.agencyLead.findFirst({
    orderBy: { updatedAt: 'desc' },
  });
  if (lead) {
    console.log("DEMO_SITE_URL: " + lead.demoSiteUrl);
    console.log("VIDEO_URL: " + lead.walkthroughVideoUrl);
  } else {
    console.log("No lead found.");
  }
  await prisma.$disconnect();
}
getUrls();
