import { CheckCircle2, UtensilsCrossed, Activity, Dumbbell, Brain, ArrowRight } from "lucide-react";
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
      "Nutrição celular para mitocôndrias 'eficientes'",
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
    <section className="relative py-16 md:py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-serif font-bold text-foreground mb-4">
              Os 4 Pilares do Programa
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Desenvolvi um programa com menos fricção, mais ciência. Você no centro de tudo.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 xl:gap-8 mb-8">
            {pilares.map((pilar, index) => {
              const IconComponent = pilar.icon;
              return (
                <div 
                  key={index} 
                  className="bg-card p-6 xl:p-8 rounded-xl border border-border/50 shadow-sm hover:shadow-elegant transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col gap-4">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                      <IconComponent className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {pilar.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {pilar.subtitle}
                      </p>
                      <div className="space-y-2">
                        {pilar.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="text-primary flex-shrink-0 mt-0.5" size={16} />
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
                try { trackEvent('cta_whatsapp_click', { location: 'pilares_metodo_vendas', path: window.location.pathname }); } catch (e) { void e; }
                const message = "Olá! Quero conhecer meu plano personalizado pelos 4 pilares do Programa LevSer.";
                window.open(`${CONTACT.WHATSAPP_URL.split('?')[0]}?text=${encodeURIComponent(message)}`, '_blank');
              }}
              className="bg-gradient-premium hover:opacity-90 transition-opacity group"
            >
              Quero meu plano pelos 4 pilares
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

