import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/components/OptimizedImage";
import { GrafismoDecor } from "@/components/GrafismoDecor";
import { Users, Heart } from "lucide-react";
import draBrunaHero from "@/assets/dra-bruna-hero.avif";
import { CONTACT } from "@/lib/constants";
import { openLeadChat } from "@/lib/leadChat";

const HeroVendasPreco = () => {
  const handleWhatsApp = () => {
    openLeadChat('hero_vendas_preco', CONTACT.WHATSAPP_BALAO_VENDAS);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-background via-muted/30 to-background py-20 overflow-hidden">
      <GrafismoDecor variant="background" position="top-right" size="xl" opacity={0.08} />
      <GrafismoDecor variant="background" position="bottom-left" size="lg" opacity={0.06} rotate={180} />
      
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Texto */}
          <div className="space-y-8">
            {/* Badge CRM */}
            <div className="inline-block">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
                CRM 124809 | RQE 57361 – Especialista em Obesidade
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight text-foreground">
              Quanto custa mudar de vida?
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              O balão gástrico não é um gasto, é o investimento mais inteligente que você pode fazer na sua saúde, na sua autoestima e na sua longevidade. Com acompanhamento completo e tecnologia de ponta, é possível eliminar até 35 kg em apenas 6 meses, com segurança, conforto e suporte integral.
            </p>

            {/* Card de destaque */}
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

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={handleWhatsApp}
                className="text-base px-8 py-6 h-auto shadow-elegant hover:shadow-hover"
              >
                Consultar Valores
              </Button>
            </div>
          </div>

          {/* Imagem */}
          <div className="relative lg:block">
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
