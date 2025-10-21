import { Check, TrendingDown, Heart, Sparkles } from "lucide-react";
import { AnimatedCounter } from "./AnimatedCounter";

const phases = [
  {
    number: "1",
    title: "Avaliação & Estratégia",
    duration: "Semanas 1-2",
    icon: Heart,
    outcomes: [
      "Exames completos",
      "Definição de metas",
      "Escolha do tratamento"
    ]
  },
  {
    number: "2",
    title: "Reset & Ritmo",
    duration: "Meses 1-3",
    icon: TrendingDown,
    outcomes: [
      "Perda inicial de peso",
      "Adaptação metabólica",
      "Controle de fome"
    ]
  },
  {
    number: "3",
    title: "Consolidação",
    duration: "Meses 4-9",
    icon: Sparkles,
    outcomes: [
      "Recomposição corporal",
      "Autonomia alimentar",
      "Energia otimizada"
    ]
  },
  {
    number: "4",
    title: "Longevidade",
    duration: "Vida toda",
    icon: Check,
    outcomes: [
      "Manutenção de peso",
      "Qualidade de vida",
      "Hábitos consolidados"
    ]
  }
];

export const WeightLossJourneyVisual = () => {
  return (
    <section className="py-16 xl:py-20 bg-muted/30 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl xl:text-4xl font-serif font-bold mb-4">
            Sua Jornada de Transformação
          </h2>
          <p className="text-lg text-muted-foreground">
            Um processo estruturado em 4 fases para resultados sustentáveis
          </p>
        </div>

        {/* Stats banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-card rounded-xl p-6 text-center shadow-elegant border border-primary/20">
            <AnimatedCounter 
              end={87} 
              suffix="%" 
              className="text-4xl font-bold text-primary mb-2"
            />
            <p className="text-sm text-muted-foreground">Taxa de sucesso</p>
          </div>
          <div className="bg-card rounded-xl p-6 text-center shadow-elegant border border-primary/20">
            <AnimatedCounter 
              end={15} 
              suffix="kg" 
              className="text-4xl font-bold text-primary mb-2"
            />
            <p className="text-sm text-muted-foreground">Perda média</p>
          </div>
          <div className="bg-card rounded-xl p-6 text-center shadow-elegant border border-primary/20">
            <AnimatedCounter 
              end={12} 
              suffix=" meses" 
              className="text-4xl font-bold text-primary mb-2"
            />
            <p className="text-sm text-muted-foreground">Duração programa</p>
          </div>
          <div className="bg-card rounded-xl p-6 text-center shadow-elegant border border-primary/20">
            <AnimatedCounter 
              end={92} 
              suffix="%" 
              className="text-4xl font-bold text-primary mb-2"
            />
            <p className="text-sm text-muted-foreground">Manutenção 2+ anos</p>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-16 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />

          <div className="grid md:grid-cols-4 gap-8">
            {phases.map((phase, index) => {
              const Icon = phase.icon;
              return (
                <div 
                  key={phase.number}
                  className="relative animate-fade-in"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {/* Phase card */}
                  <div className="bg-card rounded-2xl p-6 shadow-elegant border border-border/50 hover:shadow-hover hover:-translate-y-2 transition-all duration-500">
                    {/* Icon badge */}
                    <div className="relative w-16 h-16 mx-auto mb-4">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full blur-lg" />
                      <div className="relative w-full h-full bg-card border-2 border-primary rounded-full flex items-center justify-center">
                        <Icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
                      </div>
                    </div>

                    {/* Phase number */}
                    <div className="text-center mb-4">
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold mb-2">
                        FASE {phase.number}
                      </span>
                      <h3 className="text-xl font-serif font-bold text-foreground mb-1">
                        {phase.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {phase.duration}
                      </p>
                    </div>

                    {/* Outcomes */}
                    <ul className="space-y-2">
                      {phase.outcomes.map((outcome) => (
                        <li key={outcome} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
