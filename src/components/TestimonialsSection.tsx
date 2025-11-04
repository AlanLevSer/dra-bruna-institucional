import React from "react";
import { Quote, Star } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { OptimizedImage } from "@/components/OptimizedImage";
import { useGoogleReviews } from "@/hooks/useGoogleReviews";
import { GoogleReviewCard } from "@/components/GoogleReviewCard";
import Autoplay from "embla-carousel-autoplay";

// Import transformation images
import transformation1 from "@/assets/transformation-beginning.avif";
import transformation2 from "@/assets/transformation-confidence.avif";
import transformation3 from "@/assets/transformation-empowerment.avif";
import transformation4 from "@/assets/transformation-health.avif";
import transformation5 from "@/assets/transformation-joy.avif";
import transformation6 from "@/assets/transformation-lifestyle.avif";
import transformation7 from "@/assets/transformation-selfcare.avif";
import transformation8 from "@/assets/transformation-success.avif";
import transformation9 from "@/assets/transformation-wellness.avif";

const TestimonialsSection = () => {
  const { data, isLoading, isError } = useGoogleReviews();
  const autoplayPlugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  const transformationImages = [
    {
      src: transformation1,
      alt: "Transformação paciente - Antes e depois",
      description: "10 meses entre essas duas fotos - Perda de 20% de peso"
    },
    {
      src: transformation2,
      alt: "Transformação paciente - Antes e depois",
      description: "11 meses separaram essas duas fotos - Diferença de 20kg"
    },
    {
      src: transformation3,
      alt: "Transformação paciente - Antes e depois",
      description: "Transformação incrível"
    },
    {
      src: transformation4,
      alt: "Transformação paciente - Antes e depois",
      description: "Resultado surpreendente"
    },
    {
      src: transformation5,
      alt: "Transformação paciente - Antes e depois",
      description: "Eliminei 35kg com muita dedicação - Nova vida"
    },
    {
      src: transformation6,
      alt: "Transformação paciente - Antes e depois",
      description: "Mais uma paciente realizada"
    },
    {
      src: transformation7,
      alt: "Transformação paciente - Antes e depois",
      description: "Retirada de balão com perda de 22kg"
    },
    {
      src: transformation8,
      alt: "Transformação paciente - Antes e depois",
      description: "Finalmente cheguei na meta - Linda, radiante e feliz"
    },
    {
      src: transformation9,
      alt: "Transformação paciente - Antes e depois",
      description: "4 anos sem o balão, mantendo o peso - Transformação incrível"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
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

          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Histórias de transformação
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conheça algumas das centenas de pessoas que já transformaram suas vidas 
            com nosso programa interdisciplinar.
          </p>
        </div>

        {isLoading && (
          <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-6xl mx-auto">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-wellness-cream rounded-2xl p-8">
                <Skeleton className="h-4 w-20 mb-4" />
                <Skeleton className="h-24 w-full mb-6" />
                <div className="border-t border-wellness-soft pt-4">
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-3 w-24 mb-2" />
                  <Skeleton className="h-6 w-28" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && data?.reviews && (
          <div className="mb-16 max-w-6xl mx-auto relative">
            <Carousel
              plugins={[autoplayPlugin.current]}
              opts={{ align: "start", loop: true }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {data.reviews.slice(0, 12).map((review) => (
                  <CarouselItem key={review.time} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <div className="bg-wellness-cream rounded-2xl p-8 relative hover:scale-105 transition-smooth hover:shadow-warm h-full">
                      <Quote className="absolute top-4 right-4 w-8 h-8 text-wellness-warm opacity-30" />
                      <GoogleReviewCard review={review} variant="minimal" />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2 md:-left-12" />
              <CarouselNext className="right-2 md:-right-12" />
            </Carousel>
          </div>
        )}

        {isError && (
          <div className="text-center py-8 mb-16">
            <p className="text-muted-foreground">
              Não foi possível carregar os depoimentos no momento.
            </p>
          </div>
        )}

        {/* Transformations Carousel */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Transformações Reais dos Nossos Pacientes
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Veja as incríveis transformações de quem confiou no nosso programa interdisciplinar
            </p>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            <Carousel className="w-full">
              <CarouselContent>
                {transformationImages.map((image, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-2">
                      <div className="bg-wellness-cream rounded-2xl p-4 hover:scale-105 transition-smooth hover:shadow-warm">
                        <div className="aspect-[3/4] overflow-hidden rounded-xl mb-4">
                          <OptimizedImage
                            src={image.src}
                            alt={image.alt}
                            width={400}
                            height={533}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <p className="text-sm text-center text-foreground font-medium">
                          {image.description}
                        </p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>
          </div>
        </div>

        {/* Video Testimonial Section */}
        <div className="bg-gradient-sage rounded-3xl p-8 md:p-12 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-6">
            Veja o depoimento completo da Maria
          </h3>
          <div className="max-w-2xl mx-auto">
            <div className="aspect-video bg-black/20 rounded-2xl flex items-center justify-center mb-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                  </svg>
                </div>
                <p className="text-lg opacity-90">
                  Clique para assistir o depoimento completo
                </p>
              </div>
            </div>
            <p className="text-lg opacity-90">
              "A transformação vai muito além dos números na balança. 
              Hoje eu me sinto confiante, saudável e principalmente, feliz comigo mesma."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
