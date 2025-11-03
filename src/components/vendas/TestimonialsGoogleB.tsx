import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { CONTACT } from "@/lib/constants";
import { openLeadChat } from "@/lib/leadChat";
import { useGoogleReviews } from "@/hooks/useGoogleReviews";
import { GoogleReviewCard } from "@/components/GoogleReviewCard";
import { Skeleton } from "@/components/ui/skeleton";
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
  
  const handleWhatsApp = () => {
    openLeadChat('testimonials_google_b', CONTACT.WHATSAPP_BALAO_VENDAS);
  };

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              O Que Nossas Pacientes Dizem
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
              Nada gera mais confiança do que ver o resultado de quem já passou pela mesma jornada.
            </p>
          </div>

          {/* Reviews Content */}
          {isLoading && (
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {Array.from({ length: 6 }).map((_, i) => (
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
            <>
              {/* Desktop: Grid */}
              <div className="hidden md:grid md:grid-cols-3 gap-6 mb-12">
                {data.reviews.slice(0, 6).map((review) => (
                  <GoogleReviewCard key={review.time} review={review} variant="default" />
                ))}
              </div>

              {/* Mobile: Carousel */}
              <div className="md:hidden mb-12">
                <Carousel className="w-full">
                  <CarouselContent>
                    {data.reviews.slice(0, 6).map((review) => (
                      <CarouselItem key={review.time}>
                        <GoogleReviewCard review={review} variant="default" />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            </>
          )}

          {/* Ver Todas no Google */}
          <div className="text-center mb-8">
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

          {/* CTA */}
          <div className="text-center">
            <p className="text-lg text-muted-foreground mb-6">
              Agende sua avaliação e comece a escrever sua própria história de sucesso.
            </p>
            <Button
              size="lg"
              onClick={handleWhatsApp}
              className="text-base px-8 py-6 h-auto shadow-elegant hover:shadow-hover"
            >
              Agendar Avaliação
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsGoogleB;
