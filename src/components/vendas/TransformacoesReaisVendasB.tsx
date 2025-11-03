import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/components/OptimizedImage";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CONTACT } from "@/lib/constants";
import { openLeadChat } from "@/lib/leadChat";
import Autoplay from "embla-carousel-autoplay";

// Import transformation images
import beforeAfter01 from "@/assets/transformations/before-after-01.avif";
import beforeAfter02 from "@/assets/transformations/before-after-02.avif";
import beforeAfter03 from "@/assets/transformations/before-after-03.avif";
import beforeAfter04 from "@/assets/transformations/before-after-04.avif";
import beforeAfter05 from "@/assets/transformations/before-after-05.avif";
import beforeAfter06 from "@/assets/transformations/before-after-06.avif";
import beforeAfter07 from "@/assets/transformations/before-after-07.avif";
import beforeAfter08 from "@/assets/transformations/before-after-08.avif";

const transformations = [
  { src: beforeAfter01, alt: "Transformação real - Antes e depois 1" },
  { src: beforeAfter02, alt: "Transformação real - Antes e depois 2" },
  { src: beforeAfter03, alt: "Transformação real - Antes e depois 3" },
  { src: beforeAfter04, alt: "Transformação real - Antes e depois 4" },
  { src: beforeAfter05, alt: "Transformação real - Antes e depois 5" },
  { src: beforeAfter06, alt: "Transformação real - Antes e depois 6" },
  { src: beforeAfter07, alt: "Transformação real - Antes e depois 7" },
  { src: beforeAfter08, alt: "Transformação real - Antes e depois 8" },
];

export const TransformacoesReaisVendasB = () => {
  const handleWhatsApp = () => {
    openLeadChat('transformacoes_vendas_b', CONTACT.WHATSAPP_BALAO_VENDAS);
  };

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Transformações que Inspiram
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Mais de 3.000 vidas transformadas com o Programa LevSer. 
              Veja resultados reais de pacientes que voltaram a ter confiança, energia e autoestima.
            </p>
          </div>

          {/* Carousel */}
          <div className="mb-12">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 4000,
                }),
              ]}
              className="w-full"
            >
              <CarouselContent>
                {transformations.map((transformation, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-2">
                      <OptimizedImage
                        src={transformation.src}
                        alt={transformation.alt}
                        width={600}
                        height={600}
                        className="rounded-xl shadow-elegant hover:shadow-hover transition-all w-full"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          {/* CTA */}
          <div className="text-center space-y-6 bg-muted/30 rounded-xl p-8">
            <p className="text-lg md:text-xl font-semibold max-w-2xl mx-auto">
              Essas são pessoas reais, com histórias e desafios como os seus, 
              mas que decidiram dar o primeiro passo.
            </p>
            <p className="text-base text-muted-foreground">
              Se você também quer ter resultados como esses, clique no botão abaixo e venha conhecer nossos tratamentos.
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
