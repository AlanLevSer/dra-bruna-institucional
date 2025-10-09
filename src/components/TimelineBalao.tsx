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

export const TimelineBalao = () => {
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
          {/* Linha vertical animada */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary/20 animate-fade-in" 
               style={{ animationDelay: "0.2s" }} />

          <div className="space-y-8">
            {timelineItems.map((item, index) => (
              <div
                key={index}
                className="relative animate-fade-in opacity-0"
                style={{ animationDelay: item.delay, animationFillMode: "forwards" }}
              >
                <div className={`flex items-start gap-6 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Ícone central */}
                  <div className="flex-shrink-0 relative z-10">
                    <div className="w-12 h-12 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center animate-pulse-soft">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>

                  {/* Conteúdo */}
                  <div className={`flex-1 bg-card p-6 rounded-xl shadow-elegant hover:shadow-hover transition-all duration-300 hover-lift ${index % 2 === 0 ? 'md:mr-auto md:ml-0' : 'md:ml-auto md:mr-0'} md:w-[calc(50%-3rem)]`}>
                    <span className="text-sm font-bold text-primary mb-2 block">
                      {item.phase}
                    </span>
                    <h3 className="text-xl font-serif font-bold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground">
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
