import { Star } from "lucide-react";
import { useGoogleReviews } from "@/hooks/useGoogleReviews";
import { GoogleReviewCard } from "@/components/GoogleReviewCard";
import type { GoogleReview } from "@/types/google-reviews";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { selectReviews } from "@/components/glp1/Glp1Avaliacoes";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const BalaoLocAvaliacoes = () => {
  const { data, isLoading, isError } = useGoogleReviews();

  if (isLoading || isError || !data?.reviews?.length) return null;

  const selected = selectReviews(data.reviews);
  if (selected.length === 0) return null;

  return (
    <section id="experiencias-reais" className="bg-background">
      <div className="mx-auto w-full max-w-5xl px-5 py-12 md:py-16">
        <ScrollReveal>
          <p className="text-xs font-medium tracking-[0.08em] text-primary mb-3">
            Experiências reais
          </p>
          <h2 className="text-2xl md:text-3xl font-normal text-foreground leading-snug">
            Experiências compartilhadas por pacientes da LevSer
          </h2>
        </ScrollReveal>

        {typeof data.rating === "number" && data.rating > 0 && (
          <ScrollReveal delay={80} className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-3xl font-bold text-foreground tabular-nums">
              {data.rating.toFixed(1).replace(".", ",")}
            </span>
            <span className="flex gap-0.5 items-center" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.round(data.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-muted text-muted"
                  }`}
                />
              ))}
            </span>
            {typeof data.total_reviews === "number" && data.total_reviews > 0 && (
              <span className="text-sm text-muted-foreground">
                {data.total_reviews} avaliações no Google
              </span>
            )}
          </ScrollReveal>
        )}

        <ScrollReveal delay={120} className="mt-8 relative">
          <Carousel opts={{ align: "start", loop: selected.length > 3 }}>
            <CarouselContent className="-ml-4">
              {selected.map((review: GoogleReview) => (
                <CarouselItem key={review.time} className="pl-4 basis-full md:basis-1/3">
                  <GoogleReviewCard review={review} variant="compact" noHover />
                </CarouselItem>
              ))}
            </CarouselContent>
            {selected.length > 3 && (
              <>
                <CarouselPrevious className="left-1 md:-left-10" />
                <CarouselNext className="right-1 md:-right-10" />
              </>
            )}
          </Carousel>
        </ScrollReveal>
      </div>
    </section>
  );
};
