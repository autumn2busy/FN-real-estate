import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function countLeads() {
  const counts = await prisma.agencyLead.groupBy({
    by: ['status'],
    _count: { id: true }
  });
  console.log(JSON.stringify(counts, null, 2));
  await prisma.$disconnect();
}
countLeads();
