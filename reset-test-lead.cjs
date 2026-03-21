const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function reset() {
  await prisma.agencyLead.update({
    where: { id: '89ed7a73-0563-4496-8302-8c869029f590' },
    data: {
      status: 'PROSPECT',
      demoSiteUrl: null,
      walkthroughVideoUrl: null,
      intelData: null,
      intelScore: null
    }
  });
  console.log('Lead reset to PROSPECT');
  await prisma.$disconnect();
}

reset();
