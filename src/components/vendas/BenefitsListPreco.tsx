import { Button } from "@/components/ui/button";
import { DollarSign, Zap, TrendingDown, Shield, Target, CreditCard, Star, Building2 } from "lucide-react";
import { CONTACT } from "@/lib/constants";
import { openLeadChat } from "@/lib/leadChat";
import { trackPricingCTAClick } from "@/lib/analytics";

const benefits = [
  {
    icon: DollarSign,
    title: "Economia Real",
    description: "Economiza tempo e dinheiro a longo prazo",
  },
  {
    icon: Zap,
    title: "Procedimento Rápido",
    description: "Apenas 20 minutos de procedimento",
  },
  {
    icon: TrendingDown,
    title: "Resultados Efetivos",
    description: "Até 35kg eliminados em 6 meses",
  },
  {
    icon: Shield,
    title: "Tudo Incluído",
    description: "Acompanhamento completo no valor",
  },
  {
    icon: Target,
    title: "Resultados Duradouros",
    description: "Transformação real e sustentável",
  },
  {
    icon: CreditCard,
    title: "Parcelamento Facilitado",
    description: "Condições flexíveis de pagamento",
  },
  {
    icon: Star,
    title: "Alta Satisfação",
    description: "98% de taxa de satisfação",
  },
  {
    icon: Building2,
    title: "Clínica Premium",
    description: "Estrutura completa no Jardim Paulista",
  },
];

const BenefitsListPreco = () => {
  const handleWhatsApp = () => {
    const scrollDepth = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );
    
    trackPricingCTAClick({
      source: 'benefits_preco',
      section: 'benefits',
      position: 'middle',
      scroll_depth: scrollDepth,
    });
    
    openLeadChat('benefits_preco', CONTACT.WHATSAPP_BALAO_VENDAS, {
      section: 'benefits',
      position: 'middle',
      scroll_depth: scrollDepth,
    });
  };

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-serif font-bold">
              Por que vale a pena investir no balão intragástrico?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Compare o valor do investimento com os benefícios que você recebe
            </p>
          </div>

          {/* Grid de benefícios */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-6 shadow-elegant hover:shadow-hover hover:-translate-y-1 transition-all text-center"
              >
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <benefit.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button
              size="lg"
              onClick={handleWhatsApp}
              className="text-base px-8 py-6 h-auto shadow-elegant hover:shadow-hover"
            >
              Consultar Valores
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsListPreco;
