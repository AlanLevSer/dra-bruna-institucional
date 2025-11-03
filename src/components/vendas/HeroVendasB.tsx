import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/components/OptimizedImage";
import { GrafismoDecor } from "@/components/GrafismoDecor";
import draBrunaHero from "@/assets/dra-bruna-hero.avif";
import { CONTACT } from "@/lib/constants";
import { openLeadChat } from "@/lib/leadChat";
import { Users, Heart } from "lucide-react";

export const HeroVendasB = () => {
  const handleWhatsApp = () => {
    openLeadChat('hero_vendas_b', CONTACT.WHATSAPP_BALAO_VENDAS);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-muted/30 to-background py-20">
      <GrafismoDecor variant="background" position="top-right" size="xl" opacity={0.1} />
      <GrafismoDecor variant="background" position="bottom-left" size="lg" opacity={0.08} />
      
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8 text-center lg:text-left animate-fade-in">
            <div className="space-y-4">
              <p className="text-sm font-medium text-primary uppercase tracking-wider">
                Dra. Bruna Durelli - CRM 124809 / RQE 57361
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight">
                Perca de 10 a 35kg em até 6 meses com o{" "}
                <span className="text-primary">Balão Intragástrico</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                Um tratamento completo, com acompanhamento médico, nutricional e psicológico 
                para você controlar a fome, emagrecer com segurança e transformar sua autoestima.
              </p>
            </div>

            {/* Highlight Stats */}
            <div className="bg-primary/5 backdrop-blur-sm rounded-xl p-6 border border-primary/10">
              <p className="text-lg font-semibold mb-4">
                O Programa LevSer já ajudou mais de 3.000 pessoas a conquistarem resultados reais e sustentáveis.
              </p>
              <p className="text-2xl font-bold text-primary">
                Agora é a sua vez!
              </p>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                onClick={handleWhatsApp}
                className="text-lg px-8 py-6 h-auto shadow-elegant hover:shadow-hover"
              >
                Agendar Avaliação
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start pt-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-2xl font-bold">3.000+</p>
                  <p className="text-xs text-muted-foreground">Vidas Transformadas</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-2xl font-bold">98%</p>
                  <p className="text-xs text-muted-foreground">Satisfação</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="relative z-10">
              <OptimizedImage
                src={draBrunaHero}
                alt="Dra. Bruna Durelli - Especialista em Balão Intragástrico"
                width={800}
                height={800}
                className="rounded-2xl shadow-2xl w-full max-w-lg mx-auto"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
};
