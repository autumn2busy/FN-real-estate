import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// POST /api/agents/scout
export async function POST(req: Request) {
  console.log("[Scout Agent] Received POST request");
  try {
    const body = await req.json();
    console.log("[Scout Agent] Request body:", body);
    const { niche, location } = body;

    if (!niche || !location) {
      return NextResponse.json(
        { error: "Missing required fields: niche, location" },
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

    let leadsToCreate = [];

    if (GOOGLE_PLACES_API_KEY) {
      console.log(`[Scout Agent] Using Google Places for ${niche} in ${location}...`);
      const searchQuery = `${niche} in ${location}`;
      const placesResponse = await fetch(
        "https://places.googleapis.com/v1/places:searchText",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": GOOGLE_PLACES_API_KEY,
            "X-Goog-FieldMask": "places.id,places.displayName,places.internationalPhoneNumber,places.websiteUri,places.formattedAddress,places.businessStatus",
          },
          body: JSON.stringify({ textQuery: searchQuery, languageCode: "en" }),
        }
      );

      if (placesResponse.ok) {
        const data = await placesResponse.json();
        const places = data.places || [];
        leadsToCreate = places
          .filter((p: any) => !p.websiteUri && p.businessStatus === "OPERATIONAL")
          .map((p: any) => ({
            businessName: p.displayName?.text || "Unknown",
            contactPhone: p.internationalPhoneNumber || null,
            placeId: p.id,
            scoutData: p,
          }));
      }
    } else if (YELP_API_KEY) {
      console.log(`[Scout Agent] Using Yelp Fusion for ${niche} in ${location}...`);
      const yelpResponse = await fetch(
        `https://api.yelp.com/v3/businesses/search?term=${encodeURIComponent(niche)}&location=${encodeURIComponent(location)}`,
        {
          headers: { Authorization: `Bearer ${YELP_API_KEY}` },
        }
      );

      if (yelpResponse.ok) {
        const data = await yelpResponse.json();
        const businesses = data.businesses || [];
        // Yelp doesn't always have a clear "no website" filter in search, 
        // but it provides a URL to their Yelp page. We'll filter for businesses 
        // that don't have a direct website URL if available or just treat them as prospects 
        // to be audited.
        leadsToCreate = businesses.map((b: any) => ({
          businessName: b.name,
          contactPhone: b.phone || null,
          placeId: b.id,
          scoutData: b,
        }));
      }
    }

    const createdLeads = [];
    for (const leadData of leadsToCreate) {
      const existing = await prisma.agencyLead.findUnique({
        where: { placeId: leadData.placeId },
      });

      if (!existing) {
        const newLead = await prisma.agencyLead.create({
          data: {
            businessName: leadData.businessName,
            niche: niche,
            contactPhone: leadData.contactPhone,
            placeId: leadData.placeId,
            status: "PROSPECT",
            scoutData: leadData.scoutData,
          },
        });
        createdLeads.push(newLead);
      }
    }

    return NextResponse.json({
      message: `Scouted ${leadsToCreate.length} businesses. Added ${createdLeads.length} new leads.`,
      newLeadsCreated: createdLeads.length,
      leads: createdLeads,
    });
  } catch (error: any) {
    console.error("[Scout Agent] ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message },
      { status: 500 }
    );
  }
}
