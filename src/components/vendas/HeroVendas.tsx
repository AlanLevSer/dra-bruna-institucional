import { Button } from "@/components/ui/button";
import { CONTACT } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import { OptimizedImage } from "@/components/OptimizedImage";
import { GrafismoDecor } from "@/components/GrafismoDecor";
import heroImage from "@/assets/dra-bruna-hero.avif";

export const HeroVendas = () => {
  const handleWhatsApp = () => {
    try {
      trackEvent("cta_whatsapp_click", {
        location: "hero_vendas",
        path: window.location.pathname,
      });
    } catch {}
    window.open(CONTACT.WHATSAPP_BALAO_VENDAS, "_blank");
  };

  const scrollToProgram = () => {
    const programSection = document.querySelector("#programa-levser");
    if (programSection) {
      try { trackEvent("hero_program_scroll", { path: window.location.pathname }); } catch {}
      programSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-muted/20 to-background overflow-hidden">
      <GrafismoDecor variant="background" position="top-right" size="lg" opacity={0.15} />
      <GrafismoDecor variant="background" position="bottom-left" size="md" opacity={0.12} rotate={45} />

      <div className="container mx-auto px-4 py-20 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              Consulta de Avaliação Personalizada
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight">
              Balão Intragástrico: <span className="text-primary">controle real da fome</span> com acompanhamento multidisciplinar
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Emagreça de 10 a 35 kg em 6 meses com o programa completo da LevSer.
            </p>

            <p className="text-base text-muted-foreground">
              Um tratamento que vai além do balão: equipe médica, nutricional e psicológica ao seu lado em cada etapa.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                onClick={handleWhatsApp}
                className="bg-gradient-premium hover:opacity-90 text-white shadow-elegant hover:shadow-hover transition-all"
              >
                Agendar avaliação
              </Button>
              <Button variant="outline" size="lg" onClick={scrollToProgram}>
                Conhecer o programa
              </Button>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-3 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-primary/20 border-2 border-background"
                  />
                ))}
              </div>
              <p className="text-sm font-medium text-muted-foreground">
                <span className="text-primary font-bold">3000+ vidas</span> transformadas
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-elegant">
              <OptimizedImage
                src={heroImage}
                alt="Dra. Bruna Durelli - Especialista em Balão Intragástrico"
                width={800}
                height={1000}
                className="w-full h-auto"
                priority
              />

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-card rounded-full px-6 py-3 shadow-elegant border border-border/50">
                <p className="text-sm font-bold text-center">
                  <span className="text-primary text-2xl">98%</span>
                  <br />
                  <span className="text-muted-foreground">satisfação</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

