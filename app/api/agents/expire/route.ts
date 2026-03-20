import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { passwordProtectDeployment } from "@/lib/vercel";

// ─────────────────────────────────────────────────────────────────────────────
// Expiry Enforcement Agent  POST /api/agents/expire
//
// Called automatically by the demo page when it detects expiry, OR by a
// Vercel Cron job (see vercel.json cron config below).
//
// What it does:
//   1. Finds all BUILT leads where validUntil < now() and status != "EXPIRED"
//   2. Enables password protection on the Vercel project for each
//   3. Marks the lead status as "EXPIRED" in the DB
//
// Can also be called with { leadId } to expire a single lead immediately.
// ─────────────────────────────────────────────────────────────────────────────

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { leadId } = body;

    const whereClause = leadId
      ? { id: leadId }
      : {
          status: "BUILT",
          validUntil: { lt: new Date() },
        };

    const expiredLeads = await prisma.agencyLead.findMany({
      where: whereClause as any,
    });

    if (expiredLeads.length === 0) {
      return NextResponse.json({ message: "No leads to expire.", count: 0 });
    }

    const results = await Promise.allSettled(
      expiredLeads.map(async (lead: any) => {
        const projectName = `flynerd-demo-${lead.id.slice(0, 8)}`;
        // Use the lead ID as the bypass secret — simple and unique per lead
        const bypassSecret = lead.id;

        const { ok, error } = await passwordProtectDeployment(projectName, bypassSecret);

        await prisma.agencyLead.update({
          where: { id: lead.id },
          data: { status: "EXPIRED" },
        });

        return { leadId: lead.id, projectName, passwordProtected: ok, error };
      })
    );

    const summary = results.map((r: any) =>
      r.status === "fulfilled" ? r.value : { error: r.reason }
    );

    return NextResponse.json({
      message: `Processed ${expiredLeads.length} expired lead(s).`,
      count: expiredLeads.length,
      results: summary,
    });
  } catch (error: any) {
    console.error("Expire Agent Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message },
      { status: 500 }
    );
  }
}

// Vercel Cron: add this to vercel.json to run hourly:
// {
//   "crons": [{ "path": "/api/agents/expire", "schedule": "0 * * * *" }]
// }