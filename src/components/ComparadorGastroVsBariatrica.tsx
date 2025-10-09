import { Check, X, Sparkles } from "lucide-react";
import { GrafismoDecor } from "@/components/GrafismoDecor";

export const ComparadorGastroVsBariatrica = () => {
  const comparison = [
    {
      feature: "Invasividade",
      gastroplastia: { value: "Sem cortes externos", positive: true },
      bariatrica: { value: "Com cortes cirúrgicos", positive: false },
    },
    {
      feature: "Tempo de recuperação",
      gastroplastia: { value: "1-2 dias", positive: true },
      bariatrica: { value: "2-4 semanas", positive: false },
    },
    {
      feature: "Reversibilidade",
      gastroplastia: { value: "Reversível", positive: true },
      bariatrica: { value: "Irreversível", positive: false },
    },
    {
      feature: "Perda de peso esperada",
      gastroplastia: { value: "Até 20%", positive: true },
      bariatrica: { value: "50-80%", positive: true },
    },
    {
      feature: "Indicação IMC",
      gastroplastia: { value: "30-40", positive: true },
      bariatrica: { value: "35-40+", positive: true },
    },
    {
      feature: "Risco de complicações",
      gastroplastia: { value: "Muito baixo (<1%)", positive: true },
      bariatrica: { value: "Moderado (5-10%)", positive: false },
    },
  ];

  return (
    <section className="relative py-16 bg-muted/30 overflow-hidden">
      <GrafismoDecor variant="background" position="top-left" size="lg" opacity={0.1} rotate={-20} color="gray" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Gastroplastia vs Cirurgia Bariátrica
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Entenda as diferenças e escolha a opção mais adequada para você
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Card Gastroplastia (destaque) */}
          <div className="relative group">
            {/* Border gradient animado */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-secondary to-primary rounded-2xl opacity-75 blur-sm animate-border-glow" />
            
            {/* Badge premium */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-full text-sm font-bold flex items-center gap-2 shadow-lg backdrop-blur-sm z-20">
              <Sparkles className="w-4 h-4 animate-pulse" />
              Recomendado
            </div>

            {/* Card content */}
            <div className="relative bg-card/95 backdrop-blur-sm rounded-2xl p-8 shadow-elegant">
              <h3 className="text-2xl font-serif font-bold text-primary mb-6 text-center">
                Gastroplastia Endoscópica
              </h3>
              
              <div className="space-y-4">
                {comparison.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                      {item.gastroplastia.positive ? (
                        <Check className="w-4 h-4 text-green-600" strokeWidth={2.5} />
                      ) : (
                        <X className="w-4 h-4 text-red-600" strokeWidth={2.5} />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-muted-foreground mb-1">
                        {item.feature}
                      </p>
                      <p className="text-foreground font-medium">
                        {item.gastroplastia.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card Cirurgia Bariátrica */}
          <div className="relative group">
            <div className="relative bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-2xl font-serif font-bold text-foreground mb-6 text-center">
                Cirurgia Bariátrica
              </h3>
              
              <div className="space-y-4">
                {comparison.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center">
                      {item.bariatrica.positive ? (
                        <Check className="w-4 h-4 text-green-600" strokeWidth={2.5} />
                      ) : (
                        <X className="w-4 h-4 text-red-600" strokeWidth={2.5} />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-muted-foreground mb-1">
                        {item.feature}
                      </p>
                      <p className="text-foreground font-medium">
                        {item.bariatrica.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
