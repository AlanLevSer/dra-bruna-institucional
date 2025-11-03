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

    console.log('[Google Reviews] Fetching from Google Places API');

    const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
    url.searchParams.set("place_id", placeId);
    url.searchParams.set("key", apiKey);
    url.searchParams.set("fields", "name,rating,user_ratings_total,reviews");
    url.searchParams.set("language", "pt-BR");

    const response = await fetch(url.toString());
    
    if (!response.ok) {
      console.error(`[Google Reviews] API error: ${response.status}`);
      throw new Error(`Google API error: ${response.status}`);
    }

    const data = await response.json();
    console.log(`[Google Reviews] API status: ${data.status}`);

    if (data.status !== "OK") {
      console.error(`[Google Reviews] Invalid API status: ${data.status}`);
      throw new Error(`Google API status: ${data.status}`);
    }

    // Filter and process reviews (only 4-5 stars)
    const processedData = {
      rating: data.result.rating,
      total_reviews: data.result.user_ratings_total,
      reviews: data.result.reviews
        .filter((r: any) => r.rating >= 4)
        .slice(0, 10)
        .map((r: any) => ({
          author_name: r.author_name,
          author_url: r.author_url,
          profile_photo_url: r.profile_photo_url,
          rating: r.rating,
          text: r.text,
          time: r.time,
          relative_time_description: r.relative_time_description,
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
