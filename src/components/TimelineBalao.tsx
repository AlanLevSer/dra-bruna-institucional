import { Calendar, Droplet, TrendingUp, Target, Heart } from "lucide-react";

interface TimelineItem {
  phase: string;
  title: string;
  description: string;
  icon: typeof Calendar;
  delay: string;
}

const timelineItems: TimelineItem[] = [
  {
    phase: "Mês 0",
    title: "Avaliação e Preparação",
    description: "Consulta completa + exames + preparação nutricional personalizada",
    icon: Calendar,
    delay: "0.1s"
  },
  {
    phase: "Dia 1",
    title: "Colocação do Balão",
    description: "Procedimento por endoscopia (15-20 min), sedação leve, sem cortes",
    icon: Droplet,
    delay: "0.2s"
  },
  {
    phase: "Mês 1-3",
    title: "Adaptação e Primeiros Resultados",
    description: "Acompanhamento semanal, ajuste alimentar, primeiros 5-10kg perdidos",
    icon: TrendingUp,
    delay: "0.3s"
  },
  {
    phase: "Mês 3-6",
    title: "Resultados Expressivos",
    description: "Rotina consolidada, energia aumentada, 10-15% do peso perdido",
    icon: Target,
    delay: "0.4s"
  },
  {
    phase: "Mês 6-12",
    title: "Manutenção e Consolidação",
    description: "Hábitos enraizados, retirada do balão (se 6 meses) ou continuidade",
    icon: Heart,
    delay: "0.5s"
  }
];

export const TimelineBalão = () => {
  return (
    <section className="py-16 xl:py-20 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Sua Jornada
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Como será sua transformação
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Do primeiro dia até a consolidação dos resultados — você não estará sozinha em nenhuma fase
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Linha vertical premium com shimmer */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/50 to-primary/10 animate-fade-in overflow-hidden" 
               style={{ animationDelay: "0.2s" }}>
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white/40 to-transparent animate-shimmer-down" />
          </div>

          <div className="space-y-8">
            {timelineItems.map((item, index) => (
              <div
                key={index}
                className="relative animate-fade-in opacity-0"
                style={{ animationDelay: item.delay, animationFillMode: "forwards" }}
              >
                <div className={`flex items-start gap-6 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Ícone central premium com glow */}
                  <div className="flex-shrink-0 relative z-10 group">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-md animate-pulse-soft scale-150" />
                    <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-primary/50 flex items-center justify-center shadow-elegant backdrop-blur-sm group-hover:scale-110 transition-transform duration-500">
                      <item.icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Conteúdo premium */}
                  <div className={`flex-1 bg-gradient-to-br from-card via-card to-primary/5 backdrop-blur-sm p-6 rounded-xl border border-primary/20 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_32px_rgba(202,124,95,0.1)] hover:-translate-y-1 transition-all duration-500 group ${index % 2 === 0 ? 'md:mr-auto md:ml-0' : 'md:ml-auto md:mr-0'} md:w-[calc(50%-3rem)]`}>
                    <span className="inline-block px-3 py-1 bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 rounded-full text-sm font-bold text-primary mb-3 backdrop-blur-sm">
                      {item.phase}
                    </span>
                    <h3 className="text-xl font-serif font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
