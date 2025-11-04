import React from "react";
import { GrafismoDecor } from "@/components/GrafismoDecor";
import { Skeleton } from "@/components/ui/skeleton";
import { useGoogleReviews } from "@/hooks/useGoogleReviews";
import { GoogleReviewCard } from "@/components/GoogleReviewCard";
import { Star } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const TestimonialsVendas = () => {
  const { data, isLoading, isError } = useGoogleReviews();
  const autoplayPlugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  return (
    <section className="relative py-10 md:py-12 bg-muted/30 overflow-hidden">
      <GrafismoDecor variant="background" position="top-right" size="lg" opacity={0.15} />

      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          {/* 5 Estrelas Grandes */}
          <div className="flex justify-center gap-2 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="w-8 h-8 md:w-10 md:h-10 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>

          {/* Badge Google */}
          {!isLoading && !isError && data?.rating && (
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full mb-6 shadow-sm">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="font-semibold">⭐ {data.rating.toFixed(1)}</span>
              <span className="text-muted-foreground">|</span>
              <span className="font-medium">Host mais bem avaliado em 2025</span>
            </div>
          )}

          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            O que nossas pacientes dizem
          </h2>
          <p className="text-lg text-muted-foreground">
            Histórias reais de quem transformou a vida com o balão intragástrico e o Programa LevSer.
          </p>
        </div>

        {isLoading && (
          <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-6xl mx-auto">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-card rounded-xl p-6 shadow-elegant">
                <Skeleton className="h-4 w-20 mb-4" />
                <Skeleton className="h-20 w-full mb-4" />
                <div className="border-t pt-4">
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && data?.reviews && (
          <div className="max-w-6xl mx-auto relative mb-12">
            <Carousel
              plugins={[autoplayPlugin.current]}
              opts={{ align: "start", loop: true }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {data.reviews.slice(0, 12).map((review) => (
                  <CarouselItem key={review.time} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <GoogleReviewCard review={review} variant="minimal" />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2 md:-left-12" />
              <CarouselNext className="right-2 md:-right-12" />
            </Carousel>
          </div>
        )}

        {isError && (
          <div className="text-center py-8 mb-12">
            <p className="text-muted-foreground">
              Não foi possível carregar os depoimentos no momento.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
