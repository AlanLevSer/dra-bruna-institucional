import { supabase } from "@/integrations/supabase/client";
import { GoogleReviewsResponse } from "@/types/google-reviews";

export const fetchGoogleReviews = async (): Promise<GoogleReviewsResponse> => {
  const { data, error } = await supabase.functions.invoke("get-google-reviews");

  if (error) {
    console.error("Error fetching Google reviews:", error);
    throw error;
  }

  return data as GoogleReviewsResponse;
};
