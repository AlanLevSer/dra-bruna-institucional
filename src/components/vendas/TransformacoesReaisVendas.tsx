import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { CONTACT } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import { GrafismoDecor } from "@/components/GrafismoDecor";

import transformation01 from "@/assets/transformations/before-after-01.avif";
import transformation02 from "@/assets/transformations/before-after-02.avif";
import transformation03 from "@/assets/transformations/before-after-03.avif";
import transformation04 from "@/assets/transformations/before-after-04.avif";
import transformation05 from "@/assets/transformations/before-after-05.avif";
import transformation06 from "@/assets/transformations/before-after-06.avif";
import transformation07 from "@/assets/transformations/before-after-07.avif";
import transformation08 from "@/assets/transformations/before-after-08.avif";
import transformation09 from "@/assets/transformations/before-after-09.avif";
import transformation10 from "@/assets/transformations/before-after-10.avif";

interface Transformation {
  image: string;
  name: string;
  testimonial: string;
}

const transformations: Transformation[] = [
  { image: transformation01, name: "M.S., 34 anos", testimonial: "Mudei completamente meu estilo de vida e recuperei minha autoestima!" },
  { image: transformation02, name: "A.L., 41 anos", testimonial: "Nunca imaginei que seria possível. Hoje me sinto uma nova pessoa!" },
  { image: transformation03, name: "C.R., 29 anos", testimonial: "O acompanhamento profissional fez toda a diferença na minha jornada." },
  { image: transformation04, name: "F.P., 38 anos", testimonial: "Resultados que vão muito além da balança. Ganhei saúde e qualidade de vida." },
  { image: transformation05, name: "L.M., 45 anos", testimonial: "Minha vida mudou completamente. Obrigada Dra. Bruna e equipe!" },
  { image: transformation06, name: "P.S., 27 anos", testimonial: "Superou minhas expectativas. Me sinto mais confiante e saudável." },
  { image: transformation07, name: "R.O., 36 anos", testimonial: "O Programa LevSer transformou não só meu corpo, mas também minha mente." },
  { image: transformation08, name: "T.A., 42 anos", testimonial: "Resultado incrível! Voltei a ter energia e disposição para viver." },
  { image: transformation09, name: "J.B., 33 anos", testimonial: "Cada quilo perdido foi uma conquista. Vale muito a pena!" },
  { image: transformation10, name: "N.F., 39 anos", testimonial: "Aprendi a me alimentar melhor e hoje tenho uma relação saudável com a comida." },
];

export const TransformacoesReaisVendas = () => {
  const autoplay = useRef(Autoplay({ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: true }));

  const handleWhatsApp = () => {
    try {
      trackEvent("cta_whatsapp_click", {
        location: "transformacoes_reais_vendas",
        path: window.location.pathname,
      });
    } catch {}
    window.open(CONTACT.WHATSAPP_URL, "_blank");
  };

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-muted/30 to-background overflow-hidden">
      <GrafismoDecor variant="background" position="top-left" size="lg" opacity={0.1} />
      <GrafismoDecor variant="background" position="bottom-right" size="lg" opacity={0.1} />

      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-sm font-semibold">Resultados reais</span>
          </div>

          <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold mb-4 text-foreground">
            Transformações que <span className="text-primary">inspiram</span>
          </h2>

          <p className="text-lg text-muted-foreground leading-relaxed">
            Mais de <span className="text-primary font-bold">3000 vidas transformadas</span> com o Programa LevSer.
            Veja histórias reais de quem conquistou uma nova vida com o balão intragástrico.
          </p>
        </div>

        <div className="relative">
          <Carousel
            opts={{ align: "start", loop: true, slidesToScroll: 1 }}
            plugins={[autoplay.current]}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {transformations.map((transformation, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="group relative bg-card rounded-2xl overflow-hidden shadow-elegant hover:shadow-hover transition-all duration-300 hover:-translate-y-1">
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <img
                        src={transformation.image}
                        alt={`Transformação ${transformation.name}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <p className="text-lg font-bold mb-3">{transformation.name}</p>
                        <p className="text-sm leading-relaxed opacity-90">
                          "{transformation.testimonial}"
                        </p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="hidden md:block">
              <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2" />
              <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2" />
            </div>
          </Carousel>
        </div>

        <div className="text-center mt-12 md:mt-16 animate-fade-in">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
              Sua transformação começa agora!
            </h3>
            <p className="text-lg text-muted-foreground mb-6">
              Junte-se a mais de 3000 pessoas que transformaram suas vidas com o Programa LevSer.
            </p>
            <Button
              size="lg"
              onClick={handleWhatsApp}
              className="gap-2 shadow-elegant hover:shadow-hover text-lg px-8 py-6 h-auto"
            >
              <MessageCircle className="w-5 h-5" />
              Quero minha avaliação gratuita
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

