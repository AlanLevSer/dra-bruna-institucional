import type { VercelRequest, VercelResponse } from "@vercel/node";

type GooglePlacesReview = {
  rating?: number;
  text?: { text?: string };
  authorAttribution?: {
    displayName?: string;
    uri?: string;
    photoUri?: string;
  };
  publishTime?: string;
  relativePublishTimeDescription?: string;
};

type GooglePlacesResponse = {
  rating?: number;
  userRatingCount?: number;
  reviews?: GooglePlacesReview[];
};

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "OPTIONS") {
    res.status(204);
    for (const [k, v] of Object.entries(CORS)) res.setHeader(k, v);
    res.end();
    return;
  }

  if (req.method !== "GET") {
    res.status(405).json({ ok: false, error: "method_not_allowed" });
    return;
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    res.status(500).json({ ok: false, error: "missing_env", reviews: [], rating: 0, total_reviews: 0 });
    return;
  }

  try {
    const url = `https://places.googleapis.com/v1/places/${placeId}`;
    const upstream = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "displayName,rating,userRatingCount,reviews",
      },
    });

    if (!upstream.ok) {
      const body = await upstream.text();
      console.error(`[google-reviews] upstream error ${upstream.status}: ${body}`);
      res.status(502).json({ ok: false, error: "upstream_error", reviews: [], rating: 0, total_reviews: 0 });
      return;
    }

    const data = (await upstream.json()) as GooglePlacesResponse;
    const reviews = (data.reviews ?? [])
      .filter((r) => (r.rating ?? 0) >= 4)
      .slice(0, 10)
      .map((r) => ({
        author_name: r.authorAttribution?.displayName ?? "Anônimo",
        author_url: r.authorAttribution?.uri ?? "",
        profile_photo_url: r.authorAttribution?.photoUri ?? "",
        rating: r.rating ?? 0,
        text: r.text?.text ?? "",
        time: r.publishTime ? new Date(r.publishTime).getTime() / 1000 : Date.now() / 1000,
        relative_time_description: r.relativePublishTimeDescription ?? "",
      }));

    const payload = {
      rating: data.rating ?? 0,
      total_reviews: data.userRatingCount ?? 0,
      reviews,
    };

    for (const [k, v] of Object.entries(CORS)) res.setHeader(k, v);
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate=3600");
    res.status(200).json(payload);
  } catch (err) {
    console.error("[google-reviews] error:", err);
    res.status(500).json({ ok: false, error: "internal_error", reviews: [], rating: 0, total_reviews: 0 });
  }
}
