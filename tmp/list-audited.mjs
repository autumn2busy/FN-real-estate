import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function listAudited() {
  const audited = await prisma.agencyLead.findMany({
    where: { status: "AUDITED" }
  });
  console.log(JSON.stringify(audited, null, 2));
  await prisma.$disconnect();
}
listAudited();
