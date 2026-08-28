import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/components/OptimizedImage";
import { GrafismoDecor } from "@/components/GrafismoDecor";
import { Users, Heart } from "lucide-react";
import draBrunaHero from "@/assets/dra-bruna-hero.avif";
import { CONTACT } from "@/lib/constants";
import { openLeadChat } from "@/lib/leadChat";
import { trackPricingCTAClick } from "@/lib/analytics";

const HeroVendasPreco = () => {
  const handleCTA = () => {
    const scrollDepth = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );

    trackPricingCTAClick({
      source: "hero_price_primary",
      section: "hero",
      position: "hero",
      scroll_depth: scrollDepth,
    });

    openLeadChat("hero_price_primary", CONTACT.WHATSAPP_BALAO_VENDAS, {
      section: "hero",
      position: "hero",
      scroll_depth: scrollDepth,
    });
  };

  return (
    <section className="relative flex items-start md:items-center bg-gradient-to-br from-background via-muted/30 to-background pt-10 pb-8 md:py-20 md:min-h-[90vh] overflow-hidden">
      <GrafismoDecor variant="background" position="top-right" size="xl" opacity={0.08} />
      <GrafismoDecor variant="background" position="bottom-left" size="lg" opacity={0.06} rotate={180} />

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 items-center max-w-7xl mx-auto">
          {/* Texto — sempre primeiro na ordem do DOM */}
          <div className="space-y-5 md:space-y-8">
            {/* Badge CRM */}
            <div className="inline-block">
              <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs md:text-sm font-medium border border-primary/20">
                CRM 124809 | RQE 57361 – Especialista em Obesidade
              </span>
            </div>

            {/* H1 */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight text-foreground">
              Quanto custa mudar de vida?
            </h1>

            {/* Subtítulo */}
            <p className="text-base md:text-xl text-muted-foreground leading-relaxed">
              O balão gástrico não é um gasto, é o investimento mais inteligente que você pode fazer na sua saúde, na sua autoestima e na sua longevidade. Com acompanhamento completo e tecnologia de ponta, é possível eliminar até 35 kg em apenas 6 meses, com segurança, conforto e suporte integral.
            </p>

            {/* CTA principal + microtexto */}
            <div className="flex flex-col gap-3" id="hero-price-cta-area">
              <Button
                id="hero-price-cta"
                size="lg"
                onClick={handleCTA}
                className="w-full sm:w-auto text-base px-8 py-6 h-auto shadow-elegant hover:shadow-hover"
              >
                Consultar Valores
              </Button>
              <p className="text-xs md:text-sm text-muted-foreground">
                Resposta imediata · Sem compromisso · Indicação definida após Avaliação Estratégica
              </p>
            </div>

            {/* Card de credenciais */}
            <div className="bg-primary/5 backdrop-blur-sm rounded-xl p-6 border border-primary/10 space-y-4">
              <p className="text-base md:text-lg font-medium text-foreground">
                Quer entender o valor real de um tratamento que funciona?
              </p>
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-medium">3.000+ vidas transformadas</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-medium">98% de satisfação</span>
                </div>
              </div>
            </div>
          </div>

          {/* Imagem — oculta em mobile para garantir CTA above-the-fold */}
          <div className="hidden lg:block relative">
            <div className="relative rounded-2xl overflow-hidden shadow-elegant hover:shadow-hover transition-all">
              <OptimizedImage
                src={draBrunaHero}
                alt="Dra. Bruna Durelli - Especialista em Obesidade e Balão Intragástrico"
                width={600}
                height={700}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroVendasPreco;
