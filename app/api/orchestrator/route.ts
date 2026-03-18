import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

// GET /api/orchestrator (Triggered via Vercel Cron or manual ping)
export async function GET(req: Request) {
  try {
    const results = {
      scoutCount: 0,
      intelProcessed: 0,
      builderProcessed: 0,
      outreachProcessed: 0,
    };

    // 1. You could optionally trigger SCOUT agent here for a specific niche/location 
    // but usually Scout is run manually or on a separate schedule to fill the funnel.

    // 2. Process PROSPECT -> AUDITED
    const prospects = await prisma.agencyLead.findMany({
      where: { status: "PROSPECT" },
      take: 5, // Process in small batches
    });

    for (const lead of prospects) {
      if (!lead.placeId) continue;
      
      // Call Intel Agent
      const res = await fetch(`${BASE_URL}/api/agents/intel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadId: lead.id,
          placeId: lead.placeId,
          businessName: lead.businessName,
        }),
      });

      if (res.ok) results.intelProcessed++;
    }

    // 3. Process AUDITED -> BUILT
    const auditedLeads = await prisma.agencyLead.findMany({
      where: { 
        status: "AUDITED",
        intelScore: { gte: 50 }, // Only build sites for those with high opportunity score
      },
      take: 2, // Video gen / Vercel API might be slow, keep batch small
    });

    for (const lead of auditedLeads) {
      const res = await fetch(`${BASE_URL}/api/agents/builder`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadId: lead.id,
          businessName: lead.businessName,
          niche: lead.niche,
          intelData: lead.intelData,
        }),
      });

      if (res.ok) results.builderProcessed++;
    }

    // 4. Process BUILT -> PITCHED
    const builtLeads = await prisma.agencyLead.findMany({
      where: { status: "BUILT" },
      take: 5,
    });

    for (const lead of builtLeads) {
      const res = await fetch(`${BASE_URL}/api/agents/outreach`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadId: lead.id,
          businessName: lead.businessName,
          contactEmail: lead.contactEmail,
          demoSiteUrl: lead.demoSiteUrl,
          walkthroughVideoUrl: lead.walkthroughVideoUrl,
        }),
      });

      if (res.ok) results.outreachProcessed++;
    }

    return NextResponse.json({
      message: "Orchestrator sweep complete.",
      results,
    });
  } catch (error: any) {
    console.error("Orchestrator Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message },
      { status: 500 }
    );
  }
}
