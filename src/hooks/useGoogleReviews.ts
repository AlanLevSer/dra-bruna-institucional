import { useQuery } from "@tanstack/react-query";
import { fetchGoogleReviews } from "@/lib/googlePlaces";

export const useGoogleReviews = () => {
  return useQuery({
    queryKey: ["google-reviews"],
    queryFn: fetchGoogleReviews,
    staleTime: 1000 * 60 * 60, // 1 hora
    gcTime: 1000 * 60 * 60 * 2, // 2 horas
    retry: 2,
    refetchOnWindowFocus: false,
  });
};
