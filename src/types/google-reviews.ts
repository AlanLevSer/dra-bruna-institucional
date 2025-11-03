export interface GoogleReview {
  author_name: string;
  author_url: string;
  profile_photo_url: string;
  rating: number; // 1-5
  text: string;
  time: number; // Unix timestamp
  relative_time_description: string;
}

export interface GoogleReviewsResponse {
  rating: number;
  total_reviews: number;
  reviews: GoogleReview[];
}
