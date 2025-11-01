import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Users } from "lucide-react";
import { GrafismoDecor } from "@/components/GrafismoDecor";
import { trackEvent } from "@/lib/analytics";
import { openLeadChat } from "@/lib/leadChat";
import { CONTACT } from "@/lib/constants";
import draBrunaHero from "@/assets/dra-bruna-hero.avif";

export const HeroVendasPlasma = () => {
  const handlePrimaryClick = () => {
    trackEvent("cta_clicked", { source: "hero_plasma_primary" });
    openLeadChat("hero_plasma_primary", CONTACT.WHATSAPP_PLASMA_VENDAS);
  };

  const handleSecondaryClick = () => {
    trackEvent("cta_clicked", { source: "hero_plasma_secondary" });
    const programSection = document.getElementById("programas");
    if (programSection) {
      programSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-background via-muted/30 to-background">
      <GrafismoDecor variant="hero" position="top-right" size="xl" opacity={0.08} />
      
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-6 md:space-y-8">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
              Pré-Consulta Personalizada
            </Badge>
            
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-serif font-bold leading-tight">
              Plasma de Argônio
              <span className="block text-primary mt-2">
                Tratamento de reganho pós-bariátrica
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground font-medium">
              Recupere o controle do peso sem nova cirurgia
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Perca até <strong className="text-foreground">20% do peso atual</strong> com procedimento endoscópico minimamente invasivo, recuperação rápida e acompanhamento especializado.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                className="text-lg h-14 px-8 bg-gradient-premium shadow-elegant hover:shadow-hover"
                onClick={handlePrimaryClick}
              >
                Agendar Pré-Consulta
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg h-14 px-8"
                onClick={handleSecondaryClick}
              >
                Conhecer o Programa
              </Button>
            </div>

            <div className="flex items-center gap-4 pt-6 border-t border-border/50">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-background bg-gradient-to-br from-primary/20 to-primary/5"
                  />
                ))}
              </div>
              <div className="text-sm">
                <div className="font-semibold text-foreground">3000+ vidas transformadas</div>
                <div className="text-muted-foreground">Programa LevSer</div>
              </div>
            </div>
          </div>

          {/* Right Column - Image + Stats */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-elegant">
              <img
                src={draBrunaHero}
                alt="Dra. Bruna Durelli - Especialista em Plasma de Argônio"
                className="w-full h-auto object-cover"
              />
              
              {/* Floating stat card */}
              <div className="absolute bottom-6 right-6 bg-card/95 backdrop-blur-sm rounded-xl p-4 shadow-elegant border border-border/50">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">98%</div>
                    <div className="text-xs text-muted-foreground">Satisfação</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
