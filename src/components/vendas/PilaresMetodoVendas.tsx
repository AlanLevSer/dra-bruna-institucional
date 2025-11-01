import { ArrowRight, Brain, CheckCircle2, Dumbbell, Activity, UtensilsCrossed } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CONTACT } from "@/lib/constants";
import { trackEvent, trackWhatsAppClick } from "@/lib/analytics";

const pilares = [
  {
    icon: UtensilsCrossed,
    title: "Nutrição Inteligente",
    subtitle: "Alimentação que cabe na sua rotina, sem sofrimento",
    features: [
      "Plano por fases (não restritivo)",
      "Estratégias de saciedade e prazer",
      "Educação alimentar para autonomia",
    ],
  },
  {
    icon: Activity,
    title: "Saúde Metabólica & Regenerativa",
    subtitle: "Vou ajudar seu corpo a responder: hormônios, energia e metabolismo equilibrados",
    features: [
      "Otimização de insulina, glicemia e marcadores inflamatórios",
      "Nutrição celular para mitocôndrias “eficientes”",
      "Programas regenerativos para preservar massa magra e queimar gordura",
    ],
  },
  {
    icon: Dumbbell,
    title: "Corpo em Movimento",
    subtitle: "Seu corpo vai ficar forte, funcional e com disposição de verdade",
    features: [
      "Rotina progressiva (sem exageros)",
      "Força + mobilidade + condicionamento",
      "Prevenção de dores e lesões",
    ],
  },
  {
    icon: Brain,
    title: "Mente & Comportamento",
    subtitle: "Você vai conseguir manter a constância, sem culpa, com apoio real",
    features: [
      "Ferramentas de escolha consciente",
      "Organização alimentar & ambiente",
      "Estratégias para recaídas e gatilhos",
    ],
  },
];

export const PilaresMetodoVendas = () => {
  return (
    <section className="relative overflow-hidden py-10 md:py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-serif font-bold text-foreground md:text-4xl xl:text-5xl">
              Os 4 Pilares do Programa
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
              Desenvolvi um programa com menos fricção, mais ciência. Você no centro de tudo.
            </p>
          </div>

          <div className="mb-8 grid gap-6 md:grid-cols-2 xl:gap-8">
            {pilares.map((pilar, index) => {
              const IconComponent = pilar.icon;
              return (
                <div
                  key={pilar.title}
                  className="animate-fade-in rounded-xl border border-border/50 bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-elegant xl:p-8"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                      <IconComponent className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="mb-2 text-xl font-semibold text-foreground">{pilar.title}</h3>
                      <p className="mb-4 text-sm text-muted-foreground">{pilar.subtitle}</p>
                      <div className="space-y-2">
                        {pilar.features.map((feature) => (
                          <div key={feature} className="flex items-start gap-2">
                            <CheckCircle2 className="mt-0.5 flex-shrink-0 text-primary" size={16} />
                            <p className="text-sm text-foreground/90">{feature}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              onClick={() => {
                const message =
                  "Olá! Quero conhecer meu plano personalizado pelos 4 pilares do Programa LevSer.";
                const targetUrl = `${CONTACT.WHATSAPP_URL.split("?")[0]}?text=${encodeURIComponent(
                  message,
                )}`;

                try {
                  trackEvent("cta_whatsapp_click", {
                    location: "pilares_metodo_vendas",
                    path: window.location.pathname,
                  });
                } catch (error) {
                  void error;
                }

                try {
                  trackWhatsAppClick("pilares_metodo_vendas", { message });
                } catch (error) {
                  void error;
                }

                window.open(targetUrl, "_blank");
              }}
              className="group bg-gradient-premium transition-opacity hover:opacity-90"
            >
              Quero meu plano pelos 4 pilares
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

