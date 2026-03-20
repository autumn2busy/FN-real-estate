import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// ─────────────────────────────────────────────────────────────────────────────
// Intel Agent — v2  (Yelp Fusion only)
//
// Yelp Fusion API calls:
//   GET /v3/businesses/{id}            → rating, review_count, categories,
//                                        location, hours, price, photos
//   GET /v3/businesses/{id}/reviews    → up to 3 review snippets (Fusion limit)
//
// New intelData fields:
//   brandColors      { name, primary, accent, rationale }   ← selectedPalette
//   brandPalettes    [ ...3 options ]
//   operatingContext  string
//   socialProofPoints string[]   (up to 3)
// ─────────────────────────────────────────────────────────────────────────────

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { leadId, placeId, businessName } = body;

    if (!leadId || !placeId) {
      return NextResponse.json(
        { error: "Missing required fields: leadId, placeId" },
        { status: 400 }
      );
    }

    const YELP_API_KEY = process.env.YELP_API_KEY;
    if (!YELP_API_KEY) {
      return NextResponse.json(
        { error: "Missing YELP_API_KEY in environment" },
        { status: 500 }
      );
    }

    // ── 1. Business Details (rating, categories, price, hours) ──────────────
    // placeId is the Yelp business ID stored by the Scout agent (b.id)
    const detailsRes = await fetch(
      `https://api.yelp.com/v3/businesses/${placeId}`,
      { headers: { Authorization: `Bearer ${YELP_API_KEY}` } }
    );

    let rating = 0;
    let reviewCount = 0;
    let categories: string[] = [];
    let priceRange = "";
    let city = "";

    if (detailsRes.ok) {
      const details = await detailsRes.json();
      rating = details.rating ?? 0;
      reviewCount = details.review_count ?? 0;
      categories = (details.categories || []).map((c: any) => c.title);
      priceRange = details.price || "";
      city = details.location?.city || "";
    } else {
      console.warn(
        `[Intel Agent] Yelp business details fetch failed (${detailsRes.status}) for placeId: ${placeId}`
      );
    }

    // ── 2. Reviews (Yelp Fusion returns max 3 per free/standard tier) ───────
    const reviewsRes = await fetch(
      `https://api.yelp.com/v3/businesses/${placeId}/reviews?limit=3&sort_by=yelp_sort`,
      { headers: { Authorization: `Bearer ${YELP_API_KEY}` } }
    );

    let reviews: any[] = [];
    if (reviewsRes.ok) {
      const reviewsData = await reviewsRes.json();
      reviews = reviewsData.reviews || [];
    } else {
      console.warn(
        `[Intel Agent] Yelp reviews fetch failed (${reviewsRes.status}) for placeId: ${placeId}`
      );
    }

    // ── 3. Build review text for Groq ────────────────────────────────────────
    // Yelp review objects: { id, rating, text, time_created, url, user: { name } }
    // Note: Yelp truncates review text to ~160 chars on free tier
    let reviewsText = "No reviews available.";
    if (reviews.length > 0) {
      reviewsText = reviews
        .map(
          (r: any) =>
            `Review (${r.rating} stars): ${r.text || "No text"}`
        )
        .join("\n");
    }

    // Enrich the prompt with Yelp-specific structured data we already have
    const categoryStr =
      categories.length > 0 ? categories.join(", ") : "unknown niche";
    const contextHint = [
      categoryStr && `Categories: ${categoryStr}`,
      priceRange && `Price range: ${priceRange}`,
      city && `City: ${city}`,
    ]
      .filter(Boolean)
      .join(" | ");

    // ── 4. Groq — single call for all intel + brand palettes ────────────────
    const prompt = `
You are a brand strategist and conversion analyst. Analyze the following Yelp data for "${businessName}" (${rating} stars, ${reviewCount} total reviews).
Business context: ${contextHint}
This business currently has NO official website.

Return ONLY a valid JSON object with these exact fields — no markdown, no preamble:

{
  "opportunityScore": <integer 0-100, how badly they need a website and likelihood to buy>,
  "painPoints": [<up to 3 short strings — key customer complaints a professional website would solve>],
  "reputationSummary": "<1 sentence summary of their online reputation>",
  "operatingContext": "<1-2 sentences describing the specific services they are known for, inferred from categories and reviews>",
  "socialProofPoints": [
    "<most compelling review excerpt, under 20 words>",
    "<second best excerpt, under 20 words>",
    "<third best excerpt, under 20 words>"
  ],
  "brandPalettes": [
    {
      "name": "<descriptive palette name, e.g. 'Modern Authority'>",
      "primary": "<6-digit hex>",
      "accent": "<6-digit hex>",
      "rationale": "<1 sentence why this fits the brand>"
    },
    {
      "name": "<descriptive palette name>",
      "primary": "<6-digit hex>",
      "accent": "<6-digit hex>",
      "rationale": "<1 sentence why this fits the brand>"
    },
    {
      "name": "<descriptive palette name>",
      "primary": "<6-digit hex>",
      "accent": "<6-digit hex>",
      "rationale": "<1 sentence why this fits the brand>"
    }
  ],
  "selectedPalette": {
    "name": "<name of the best palette from the 3 above>",
    "primary": "<6-digit hex>",
    "accent": "<6-digit hex>",
    "rationale": "<why this is the overall best fit>"
  }
}

Palette rules:
- Use the business niche/categories, city, price range, review tone, and business name to inform palette choices
- No pure black (#000000) or pure white (#ffffff) as primary or accent
- All 3 palettes must be meaningfully distinct from each other
- For socialProofPoints: if reviews are truncated, use the best available wording. If fewer than 3 reviews exist, only include what is available.

Yelp Reviews:
${reviewsText}
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    const aiAnalysisRaw = completion.choices[0]?.message?.content || "{}";
    const aiAnalysis = JSON.parse(aiAnalysisRaw);

    // ── 5. Assemble intelData and persist ────────────────────────────────────
    const intelData = {
      // Yelp structured data (real values, not hardcoded)
      rating,
      reviewCount,
      categories,
      priceRange,
      city,
      // AI-derived fields
      painPoints: aiAnalysis.painPoints || [],
      reputationSummary: aiAnalysis.reputationSummary || "",
      operatingContext: aiAnalysis.operatingContext || "",
      socialProofPoints: (aiAnalysis.socialProofPoints || []).slice(0, 3),
      brandPalettes: aiAnalysis.brandPalettes || [],
      brandColors: aiAnalysis.selectedPalette || {
        name: "Default",
        primary: "#1a1a2e",
        accent: "#e8b923",
        rationale: "Fallback palette.",
      },
    };

    const updatedLead = await prisma.agencyLead.update({
      where: { id: leadId },
      data: {
        status: "AUDITED",
        intelScore: aiAnalysis.opportunityScore || 50,
        intelData,
      },
    });

    return NextResponse.json({
      message: "Intel successfully gathered.",
      lead: updatedLead,
    });
  } catch (error: any) {
    console.error("Intel Agent Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message },
      { status: 500 }
    );
  }
}