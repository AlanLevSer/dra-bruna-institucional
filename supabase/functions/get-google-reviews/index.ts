import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 horas
const cache = new Map();

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('[Google Reviews] Request received');
    
    const cacheKey = "google_reviews";
    const cached = cache.get(cacheKey);
    const now = Date.now();

    // Check cache
    if (cached && (now - cached.timestamp) < CACHE_TTL) {
      console.log('[Google Reviews] Returning cached data');
      return new Response(JSON.stringify(cached.data), {
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
          "X-Cache": "HIT",
        },
      });
    }

    // Fetch from Google Places API
    const apiKey = Deno.env.get("GOOGLE_PLACES_API_KEY");
    const placeId = Deno.env.get("GOOGLE_PLACE_ID");

    if (!apiKey || !placeId) {
      console.error('[Google Reviews] Missing environment variables');
      throw new Error("Missing GOOGLE_PLACES_API_KEY or GOOGLE_PLACE_ID");
    }

    console.log('[Google Reviews] Fetching from Google Places API (New)');

    // Use Places API (New) endpoint
    const url = `https://places.googleapis.com/v1/places/${placeId}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'displayName,rating,userRatingCount,reviews',
      },
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[Google Reviews] API error: ${response.status} - ${errorText}`);
      throw new Error(`Google API error: ${response.status}`);
    }

    const data = await response.json();
    console.log(`[Google Reviews] API response received`);

    // Filter and process reviews (only 4-5 stars)
    const reviews = data.reviews || [];
    const processedData = {
      rating: data.rating || 0,
      total_reviews: data.userRatingCount || 0,
      reviews: reviews
        .filter((r: any) => r.rating >= 4)
        .slice(0, 10)
        .map((r: any) => ({
          author_name: r.authorAttribution?.displayName || 'Anonymous',
          author_url: r.authorAttribution?.uri || '',
          profile_photo_url: r.authorAttribution?.photoUri || '',
          rating: r.rating || 0,
          text: r.text?.text || '',
          time: new Date(r.publishTime).getTime() / 1000,
          relative_time_description: r.relativePublishTimeDescription || '',
        })),
    };

    console.log(`[Google Reviews] Processed ${processedData.reviews.length} reviews`);

    // Save to cache
    cache.set(cacheKey, {
      data: processedData,
      timestamp: now,
    });

    return new Response(JSON.stringify(processedData), {
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
        "X-Cache": "MISS",
      },
    });
  } catch (error) {
    console.error("[Google Reviews] Error:", error);
    
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    
    return new Response(
      JSON.stringify({ 
        error: "Failed to fetch reviews",
        message: errorMessage
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  }
});
