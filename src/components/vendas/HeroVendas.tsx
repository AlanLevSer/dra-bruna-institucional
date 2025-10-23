import { Button } from "@/components/ui/button";
import { CONTACT } from "@/lib/constants";
import { OptimizedImage } from "@/components/OptimizedImage";
import { GrafismoDecor } from "@/components/GrafismoDecor";
import heroImage from "@/assets/dra-bruna-hero.avif";

export const HeroVendas = () => {
  const handleWhatsApp = () => {
    window.open(CONTACT.WHATSAPP_BALAO_VENDAS, "_blank");
  };

  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-muted/20 to-background overflow-hidden">
      {/* Grafismo decorativo */}
      <GrafismoDecor variant="background" position="top-right" size="lg" opacity={0.15} />
      <GrafismoDecor variant="background" position="bottom-left" size="md" opacity={0.12} rotate={45} />

      <div className="container mx-auto px-4 py-20 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Conteúdo */}
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              Consulta de Avaliação Personalizada
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight">
              Balão Intragástrico: <span className="text-primary">Controle Real da Fome</span> + Acompanhamento Multidisciplinar
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Perca de 10 a 35kg em 6 meses com o programa completo da LevSer
            </p>

            <p className="text-base text-muted-foreground">
              Um tratamento completo que vai além do balão — com equipe médica, nutricional e psicológica ao seu lado em cada etapa.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                onClick={handleWhatsApp}
                className="bg-gradient-premium hover:opacity-90 text-white shadow-elegant hover:shadow-hover transition-all"
              >
                Agende sua Avaliação
              </Button>
              <Button
                variant="outline"
                size="lg"
              >
                Conhecer o Programa
              </Button>
            </div>

            {/* Badge de Autoridade */}
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

          {/* Imagem */}
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
              
              {/* Badge de Sucesso */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-card rounded-full px-6 py-3 shadow-elegant border border-border/50">
                <p className="text-sm font-bold text-center">
                  <span className="text-primary text-2xl">98%</span><br />
                  <span className="text-muted-foreground">Satisfação</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
