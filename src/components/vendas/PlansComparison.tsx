import { Button } from "@/components/ui/button";
import { CONTACT } from "@/lib/constants";
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
    window.open(CONTACT.WHATSAPP_BALAO_VENDAS, "_blank");
  };

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-wellness-cream to-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
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
              className={`relative bg-white rounded-2xl p-8 shadow-lg hover-lift ${
                plan.recommended
                  ? "border-4 border-primary scale-105 md:scale-110"
                  : "border border-border"
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-6 py-1 rounded-full text-sm font-bold animate-pulse">
                  MAIS ESCOLHIDO
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground">{plan.duration}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.recommended ? "hero" : "outline"}
                size="lg"
                onClick={handleWhatsApp}
                className="w-full"
              >
                Escolher Este Programa
              </Button>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          💬 Fale conosco para conhecer os valores e condições de parcelamento em até 12x
        </p>
      </div>
    </section>
  );
};
