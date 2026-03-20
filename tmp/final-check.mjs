const apiKey = process.env.HEYGEN_API_KEY;
const videoId = "bf9ebc66c63542ff908dfd402e582ba4";

async function checkStatus() {
  const statusRes = await fetch(`https://api.heygen.com/v1/video_status.get?video_id=${videoId}`, {
    method: "GET",
    headers: { "X-Api-Key": apiKey },
  });
  const data = await statusRes.json();
  console.log("HeyGen Status:", JSON.stringify(data, null, 2));
}

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function checkLead() {
  const leadId = "70068d54-253f-427e-acda-cd3ef8cbf769";
  const lead = await prisma.agencyLead.findUnique({ where: { id: leadId } });
  console.log("Database Lead:", JSON.stringify(lead, null, 2));
  await prisma.$disconnect();
}

async function runCheck() {
  await checkStatus();
  await checkLead();
}
runCheck();
