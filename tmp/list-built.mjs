import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function listBuilt() {
  const built = await prisma.agencyLead.findMany({
    where: { status: "BUILT" },
    take: 5
  });
  console.log(JSON.stringify(built, null, 2));
  await prisma.$disconnect();
}
listBuilt();
