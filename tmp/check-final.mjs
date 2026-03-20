import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function checkBuilt() {
  const leads = await prisma.agencyLead.findMany({
    orderBy: { updatedAt: 'desc' },
    take: 1
  });
  console.log(JSON.stringify(leads, null, 2));
  await prisma.$disconnect();
}
checkBuilt();
