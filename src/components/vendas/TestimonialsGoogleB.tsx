import React from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Star } from "lucide-react";
import { CONTACT } from "@/lib/constants";
import { openLeadChat } from "@/lib/leadChat";
import { useGoogleReviews } from "@/hooks/useGoogleReviews";
import { GoogleReviewCard } from "@/components/GoogleReviewCard";
import { Skeleton } from "@/components/ui/skeleton";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const GOOGLE_MAPS_URL = "https://www.google.com/maps/place/?q=place_id:ChIJDci2qDFYzpQRTYTSlhawUyI";

const TestimonialsGoogleB = () => {
  const { data, isLoading, isError } = useGoogleReviews();
  
  const autoplayPlugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );
  
  const handleWhatsApp = () => {
    openLeadChat('testimonials_google_b', CONTACT.WHATSAPP_BALAO_VENDAS);
  };

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-br from-background via-muted/20 to-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header com Badge Destacado */}
          <div className="text-center mb-16">
            {/* 5 Estrelas Grandes */}
            <div className="flex justify-center gap-2 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="w-8 h-8 md:w-10 md:h-10 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>

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
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              O Que Nossas Pacientes Dizem
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Nada gera mais confiança do que ver o resultado de quem já passou pela mesma jornada.
            </p>
          </div>

          {/* Reviews Content */}
          {isLoading && (
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {Array.from({ length: 12 }).map((_, i) => (
                <Skeleton key={i} className="h-64 rounded-lg" />
              ))}
            </div>
          )}

          {isError && (
            <div className="text-center py-12 bg-muted/20 rounded-lg mb-12">
              <p className="text-muted-foreground">
                Não foi possível carregar as avaliações no momento.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Veja todas as avaliações diretamente no Google.
              </p>
            </div>
          )}

          {!isLoading && !isError && data?.reviews && (
            <div className="max-w-6xl mx-auto relative mb-12">
              <Carousel
                plugins={[autoplayPlugin.current]}
                opts={{ align: "start", loop: true }}
                className="w-full"
              >
                <CarouselContent className="-ml-4">
                  {data.reviews.slice(0, 12).map((review) => (
                    <CarouselItem key={review.time} className="pl-4 md:basis-1/2 lg:basis-1/3">
                      <GoogleReviewCard review={review} variant="default" />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2 md:-left-12" />
                <CarouselNext className="right-2 md:-right-12" />
              </Carousel>
            </div>
          )}

          {/* Ver Todas no Google */}
          <div className="text-center mb-12">
            <Button
              variant="outline"
              size="lg"
              asChild
              className="gap-2"
            >
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver todas as avaliações no Google
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>

          {/* CTA Destacado */}
          <div className="bg-wellness-cream rounded-3xl p-8 md:p-12 text-center shadow-sm">
            <p className="text-xl md:text-2xl text-foreground font-medium mb-8">
              Agende sua avaliação e comece a escrever sua própria história de sucesso.
            </p>
            <Button
              size="lg"
              onClick={handleWhatsApp}
              className="text-lg px-10 py-7 h-auto shadow-elegant hover:shadow-hover"
            >
              Agendar Avaliação Gratuita
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsGoogleB;
