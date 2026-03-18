import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// POST /api/agents/intel
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

    const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
    const YELP_API_KEY = process.env.YELP_API_KEY;

    if (!GOOGLE_PLACES_API_KEY && !YELP_API_KEY) {
      return NextResponse.json(
        { error: "Missing both GOOGLE_PLACES_API_KEY and YELP_API_KEY in environment" },
        { status: 500 }
      );
    }

    let reviews = [];
    let rating = 0;
    let userRatingCount = 0;

    if (GOOGLE_PLACES_API_KEY) {
      // 1. Fetch Google Places Details (Reviews)
      const placesResponse = await fetch(
        `https://places.googleapis.com/v1/places/${placeId}?languageCode=en`,
        {
          method: "GET",
          headers: {
            "X-Goog-Api-Key": GOOGLE_PLACES_API_KEY,
            "X-Goog-FieldMask": "reviews,rating,userRatingCount",
          },
        }
      );

      if (placesResponse.ok) {
        const placeData = await placesResponse.json();
        reviews = placeData.reviews || [];
        rating = placeData.rating || 0;
        userRatingCount = placeData.userRatingCount || 0;
      }
    } else if (YELP_API_KEY) {
      // 1. Fetch Yelp Business Reviews
      const reviewsResponse = await fetch(
        `https://api.yelp.com/v3/businesses/${placeId}/reviews`,
        {
          headers: { Authorization: `Bearer ${YELP_API_KEY}` },
        }
      );

      if (reviewsResponse.ok) {
        const data = await reviewsResponse.json();
        reviews = data.reviews || [];
        // Note: Yelp Reviews API doesn't return the business rating, 
        // normally you'd get that from the business details API.
        // For now we assume a neutral rating if only reviews are fetched.
        rating = 4.0; 
      }
    }

    // 2. Prepare reviews for OpenAI analysis
    let reviewsText = "No reviews available.";
    if (reviews.length > 0) {
      reviewsText = reviews
        .map((r: any) => `Review (${r.rating} stars): ${r.text?.text || "No text"}`)
        .join("\n");
    }

    // 3. AI Analysis (Intel Agent Core)
    const prompt = `
    Analyze the following reviews and rating for "${businessName}" (${rating} stars).
    The business currently has NO official website.
    
    1. Determine a "Web Opportunity Score" from 0 to 100 on how badly they need a website and how likely they are to buy one based on their reputation.
    2. Extract up to 3 key pain points or customer complaints from these reviews that a professional website could help solve (e.g., "hard to find contact info", "unclear pricing formatting").

    Return the analysis strictly in the following JSON format:
    {
      "opportunityScore": 85,
      "painPoints": ["Customer couldn't find...", "No pricing visible..."],
      "reputationSummary": "A brief 1-sentence summary of their online reputation."
    }

    Reviews:
    ${reviewsText}
    `;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    const aiAnalysisRaw = completion.choices[0]?.message?.content || "{}";
    const aiAnalysis = JSON.parse(aiAnalysisRaw);

    // 4. Update the DB: AgencyLead
    const updatedLead = await prisma.agencyLead.update({
      where: { id: leadId },
      data: {
        status: "AUDITED",
        intelScore: aiAnalysis.opportunityScore || 50,
        intelData: {
          rating,
          reviewCount: userRatingCount || reviews.length,
          painPoints: aiAnalysis.painPoints || [],
          reputationSummary: aiAnalysis.reputationSummary || "",
        },
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
