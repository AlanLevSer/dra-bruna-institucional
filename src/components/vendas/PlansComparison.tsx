import { Button } from "@/components/ui/button";
import { CONTACT } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import { Check } from "lucide-react";

export const PlansComparison = () => {
  const plans = [
    {
      name: "Plano Essencial",
      duration: "6 meses",
      recommended: false,
      features: [
        "Balão intragástrico (6 meses)",
        "Consultas mensais com médico",
        "Nutricionista 2x/mês",
        "Suporte via WhatsApp",
        "Material educativo",
      ],
    },
    {
      name: "Plano Completo",
      duration: "12 meses",
      recommended: true,
      features: [
        "Tudo do Plano Essencial",
        "Consultas quinzenais",
        "Psicólogo 2x/mês",
        "Exames laboratoriais inclusos",
        "6 meses de manutenção pós-balão",
        "App de acompanhamento",
      ],
    },
    {
      name: "Plano Premium",
      duration: "18 meses",
      recommended: false,
      features: [
        "Tudo do Plano Completo",
        "Consultas semanais",
        "Nutrição celular (soros)",
        "Personal trainer online",
        "12 meses de manutenção",
        "Acesso vitalício ao app",
      ],
    },
  ];

  const handleWhatsApp = () => {
    try {
      trackEvent('cta_whatsapp_click', {
        location: 'plans_comparison',
        path: window.location.pathname,
      });
    } catch {}
    window.open(CONTACT.WHATSAPP_BALAO_VENDAS, "_blank");
  };

  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Escolha o Plano Ideal Para Sua Transformação
          </h2>
          <p className="text-lg text-muted-foreground">
            Investimento sob consulta. Entre em contato para conhecer as condições especiais e parcelamento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-card rounded-2xl p-8 shadow-elegant hover:shadow-hover transition-all border ${
                plan.recommended
                  ? "scale-105 border-primary/50"
                  : "border-border/50"
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary/10 text-primary px-4 py-1 rounded-full text-xs font-medium">
                  MAIS ESCOLHIDO
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-serif font-bold mb-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">{plan.duration}</p>
              </div>

              <div className="text-center mb-6">
                <p className="text-sm font-medium text-primary">Investimento sob consulta</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.recommended ? "default" : "outline"}
                size="lg"
                onClick={handleWhatsApp}
                className={plan.recommended ? "w-full bg-gradient-premium hover:opacity-90" : "w-full"}
              >
                {plan.recommended ? "Agendar Avaliação" : "Saber Mais"}
              </Button>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Fale conosco para conhecer os valores e condições de parcelamento em até 12x
        </p>
      </div>
    </section>
  );
};
