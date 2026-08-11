import { GoogleReviewsResponse } from "@/types/google-reviews";

export const fetchGoogleReviews = async (): Promise<GoogleReviewsResponse> => {
  const res = await fetch("/api/google-reviews");

  if (!res.ok) {
    throw new Error(`Google Reviews API error: ${res.status}`);
  }

  return res.json() as Promise<GoogleReviewsResponse>;
};
