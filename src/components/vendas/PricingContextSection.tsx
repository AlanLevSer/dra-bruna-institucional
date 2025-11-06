import { Button } from "@/components/ui/button";
import { Calendar, CalendarRange, Sparkles } from "lucide-react";
import { CONTACT } from "@/lib/constants";
import { openLeadChat } from "@/lib/leadChat";
import { trackPricingCTAClick } from "@/lib/analytics";

const plans = [
  {
    icon: Calendar,
    title: "Balão 6 Meses",
    subtitle: "Opção Inicial",
    description: "Para quem quer começar leve e testar o tratamento",
    highlighted: false,
  },
  {
    icon: CalendarRange,
    title: "Balão 12 Meses",
    subtitle: "Resultado Consolidado",
    description: "Manutenção prolongada para perda de peso sustentável",
    highlighted: false,
  },
  {
    icon: Sparkles,
    title: "Balão Ajustável",
    subtitle: "Controle Total",
    description: "Ajuste de volume conforme evolução. Perda potencial até 35kg",
    highlighted: true,
    badge: "Mais Recomendado",
  },
];

const PricingContextSection = () => {
  const handleWhatsApp = () => {
    const scrollDepth = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );
    
    trackPricingCTAClick({
      source: 'pricing_context',
      section: 'pricing_plans',
      position: 'middle',
      scroll_depth: scrollDepth,
    });
    
    openLeadChat('pricing_context', CONTACT.WHATSAPP_BALAO_VENDAS, {
      section: 'pricing_plans',
      position: 'middle',
      scroll_depth: scrollDepth,
    });
  };

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-serif font-bold">
              Por que o preço varia?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Cada corpo é único, e o plano ideal depende da sua meta, IMC e perfil metabólico. Durante a pré-consulta, nossa equipe avalia sua necessidade e indica o protocolo ideal.
            </p>
          </div>

          {/* Grid de planos */}
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-card rounded-xl p-6 shadow-elegant hover:shadow-hover hover:-translate-y-1 transition-all ${
                  plan.highlighted ? 'border-2 border-primary' : ''
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium whitespace-nowrap">
                    {plan.badge}
                  </div>
                )}
                <div className="space-y-4 text-center">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${
                    plan.highlighted ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'
                  }`}>
                    <plan.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-1">
                      {plan.title}
                    </h3>
                    <p className="text-sm font-medium text-primary">
                      {plan.subtitle}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Nota de rodapé */}
          <div className="text-center space-y-6">
            <p className="text-base text-muted-foreground">
              Todos os planos incluem acompanhamento médico e suporte completo
            </p>
            <p className="text-lg font-medium text-foreground max-w-2xl mx-auto">
              O investimento varia conforme o plano, mas todos incluem acompanhamento médico e suporte completo. Preencha o formulário, e nossa equipe te mostra o valor exato do tratamento que se encaixa na sua realidade.
            </p>
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

export default PricingContextSection;
