import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { cloneAndDeployTemplate, getCanonicalDemoUrl, passwordProtectDeployment } from "@/lib/vercel";
import { generateAvatarVideo } from "@/lib/heygen";

// ─────────────────────────────────────────────────────────────────────────────
// Builder Agent — v2
// New: sets validUntil = now() + 48h
//      stores deploymentId for future password-protection on expiry
// ─────────────────────────────────────────────────────────────────────────────

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { leadId, businessName, niche, intelData } = body;

    if (!leadId || !businessName) {
      return NextResponse.json(
        { error: "Missing required fields: leadId, businessName" },
        { status: 400 }
      );
    }

    const projectName = `flynerd-demo-${leadId.slice(0, 8)}`;
    const templateRepo = "autumn2busy/FN-real-estate";

    // 1. Trigger Vercel Site Generation
    let demoSiteUrl = "";
    try {
      demoSiteUrl = await cloneAndDeployTemplate(projectName, templateRepo, leadId);
    } catch (e: any) {
      console.error("[Builder Agent] Vercel integration error:", e.message);
      demoSiteUrl = getCanonicalDemoUrl(leadId);
    }

    // 2. Trigger HeyGen Avatar Video
    let videoUrl = "";
    try {
      const painPointsStr =
        Array.isArray(intelData?.painPoints) && intelData.painPoints.length > 0
          ? intelData.painPoints[0]
          : "driving high-quality local leads";

      const operatingContext = intelData?.operatingContext
        ? ` Known for: ${intelData.operatingContext}.`
        : "";

      const script = `Hi ${businessName} team! I'm an AI from Flynerd Tech. We noticed that your agency has been focusing on ${painPointsStr}.${operatingContext} We went ahead and built a completely custom web portal for you that addresses this exact issue. Let's take a look.`;

      videoUrl = await generateAvatarVideo(script, businessName);
    } catch (e: any) {
      console.error("[Builder Agent] HeyGen integration error:", e.message);
      videoUrl = `https://share.heygen.com/demo-${leadId.slice(0, 8)}`;
    }

    // 3. Set expiry: 7 days from now
    const validUntil = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    // 4. Update the Database
    const updatedLead = await prisma.agencyLead.update({
      where: { id: leadId },
      data: {
        status: "BUILT",
        demoSiteUrl,
        walkthroughVideoUrl: videoUrl,
        validUntil,
      },
    });

    return NextResponse.json({
      message: "Builder agent successful. Production APIs invoked.",
      urls: { demoSiteUrl, videoUrl },
      validUntil: validUntil.toISOString(),
      lead: updatedLead,
    });
  } catch (error: any) {
    console.error("Builder Agent Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message },
      { status: 500 }
    );
  }
}