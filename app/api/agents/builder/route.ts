import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// POST /api/agents/builder
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

    const VERCEL_API_TOKEN = process.env.VERCEL_API_TOKEN;
    const HEYGEN_API_KEY = process.env.HEYGEN_API_KEY; // For high-quality video generation

    const BUIDLER_TEMPLATES: Record<string, string> = {
      plumber: "https://github.com/flynerdtech/plumbing-template",
      dentist: "https://github.com/flynerdtech/dentist-template",
      default: "https://github.com/flynerdtech/biz-template-v1",
    };

    const templateRepo = BUIDLER_TEMPLATES[niche?.toLowerCase()] || BUIDLER_TEMPLATES.default;

    // Simulate Vercel API Deployment
    // In production, we'd hit POST https://api.vercel.com/v9/projects
    console.log(`[Builder Agent] Cloning ${templateRepo} for ${businessName}... via Vercel API...`);

    // We can simulate an API call timeout here.
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulate HeyGen Video API
    console.log(`[Builder Agent] Generating AI video avatar walkthrough for ${businessName} via HeyGen...`);
    
    // Simulate Video processing timeout
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const simDemoSiteUrl = `https://${businessName.toLowerCase().replace(/[^a-z0-9]/g, "")}.flynerd-agency.dev`;
    const simVideoUrl = `https://share.heygen.com/xyz123-${Date.now()}`;

    // Update DB
    const updatedLead = await prisma.agencyLead.update({
      where: { id: leadId },
      data: {
        status: "BUILT",
        demoSiteUrl: simDemoSiteUrl,
        walkthroughVideoUrl: simVideoUrl,
      },
    });

    return NextResponse.json({
      message: "Builder agent successful.",
      urls: { demoSiteUrl: simDemoSiteUrl, videoUrl: simVideoUrl },
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
