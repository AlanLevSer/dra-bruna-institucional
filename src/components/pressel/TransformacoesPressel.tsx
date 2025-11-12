import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { GrafismoDecor } from "@/components/GrafismoDecor";
import { Sparkles } from "lucide-react";

import transformation01 from "@/assets/transformations/before-after-01.avif";
import transformation02 from "@/assets/transformations/before-after-02.avif";
import transformation03 from "@/assets/transformations/before-after-03.avif";
import transformation04 from "@/assets/transformations/before-after-04.avif";
import transformation05 from "@/assets/transformations/before-after-05.avif";

const transformations = [
  {
    image: transformation01,
    label: "Mariana - 34 anos",
    text: "Perdeu 18kg e voltou a sentir confiança para viver o dia a dia.",
  },
  {
    image: transformation02,
    label: "Amanda - 41 anos",
    text: "Conseguiu estabilizar o metabolismo e manter o peso pela primeira vez.",
  },
  {
    image: transformation03,
    label: "Carla - 29 anos",
    text: "Energia para treinar novamente e autoestima nas alturas.",
  },
  {
    image: transformation04,
    label: "Fernanda - 38 anos",
    text: "Inflamação reduzida, exames regulados e corpo em movimento.",
  },
  {
    image: transformation05,
    label: "Letícia - 45 anos",
    text: "Mudou hábitos com o LevSer e mantém o peso há mais de 1 ano.",
  },
];

export const TransformacoesPressel = () => {
  const autoplay = useRef(Autoplay({ delay: 3500, stopOnInteraction: true }));

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-muted/40 via-background to-background overflow-hidden">
      <GrafismoDecor variant="background" position="top-left" size="lg" opacity={0.08} />
      <GrafismoDecor variant="background" position="bottom-right" size="lg" opacity={0.08} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">Antes e depois reais</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Quando o metabolismo responde, tudo muda.
          </h2>
          <p className="text-muted-foreground text-lg">
            Histórias de pacientes que chegaram exatamente como você está agora e viram o corpo reagir com o Programa LevSer.
          </p>
        </div>

        <Carousel
          opts={{ align: "start", loop: true }}
          plugins={[autoplay.current]}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {transformations.map((item) => (
              <CarouselItem key={item.label} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="bg-card rounded-2xl shadow-elegant overflow-hidden border border-border/50">
                  <div className="relative aspect-[3/4]">
                    <img
                      src={item.image}
                      alt={`Transformação de ${item.label}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="p-5 space-y-2">
                    <p className="text-sm font-semibold text-primary">{item.label}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-10" />
          <CarouselNext className="hidden md:flex -right-10" />
        </Carousel>
      </div>
    </section>
  );
};
