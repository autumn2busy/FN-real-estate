import { PrismaClient } from "@prisma/client";
import fs from "fs";
const prisma = new PrismaClient();
async function getUrls() {
  const lead = await prisma.agencyLead.findFirst({
    orderBy: { updatedAt: 'desc' },
  });
  if (lead) {
    fs.writeFileSync("tmp/final-urls.txt", `DEMO_SITE_URL: ${lead.demoSiteUrl}\nVIDEO_URL: ${lead.walkthroughVideoUrl}`);
    console.log("URLs written to tmp/final-urls.txt");
  } else {
    console.log("No lead found.");
  }
  await prisma.$disconnect();
}
getUrls();
