import { FileSearch, Activity, Utensils, TrendingDown, Heart, CheckCircle2 } from "lucide-react";
import { GrafismoDecor } from "@/components/GrafismoDecor";

export const TimelineGastro = () => {
  const timelineItems = [
    {
      phase: "Mês 0",
      icon: FileSearch,
      title: "Avaliação completa",
      description: "Consulta inicial, exames pré-operatórios e planejamento individualizado com equipe multidisciplinar",
    },
    {
      phase: "Dia 1",
      icon: Activity,
      title: "Procedimento",
      description: "Gastroplastia endoscópica realizada em 1-2 horas, com sedação leve e alta no mesmo dia",
    },
    {
      phase: "Semanas 1-2",
      icon: Utensils,
      title: "Adaptação alimentar",
      description: "Dieta líquida progredindo para pastosa, com acompanhamento nutricional frequente",
    },
    {
      phase: "Meses 1-6",
      icon: TrendingDown,
      title: "Perda progressiva",
      description: "Redução de 5-15kg com reeducação alimentar, atividade física orientada e consultas mensais",
    },
    {
      phase: "Meses 6-12",
      icon: Heart,
      title: "Consolidação",
      description: "Fortalecimento dos novos hábitos, estabilização do peso e melhora dos marcadores de saúde",
    },
    {
      phase: "Pós 12 meses",
      icon: CheckCircle2,
      title: "Manutenção",
      description: "Acompanhamento trimestral para garantir resultados duradouros e qualidade de vida",
    },
  ];

  return (
    <section className="relative py-16 bg-background overflow-hidden">
      <GrafismoDecor variant="background" position="center" size="xl" opacity={0.06} rotate={0} color="gray" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Sua jornada de transformação
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Do primeiro passo até a consolidação dos resultados: um caminho estruturado e acompanhado
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Linha vertical com gradiente e shimmer */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/50 to-primary/10 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white/40 to-transparent animate-shimmer-down" />
          </div>

          <div className="space-y-12">
            {timelineItems.map((item, index) => (
              <div
                key={index}
                className={`flex gap-8 items-start ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Icon */}
                <div className="flex-shrink-0 relative z-10">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-md animate-glow-pulse scale-150" />
                  <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-primary/50 flex items-center justify-center shadow-elegant backdrop-blur-sm group-hover:scale-110 transition-transform duration-500">
                    <item.icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Content card */}
                <div className="flex-1 bg-gradient-to-br from-card via-card to-primary/5 backdrop-blur-sm p-6 rounded-xl border border-primary/20 shadow-elegant hover:shadow-hover hover:-translate-y-1 transition-all duration-500 group">
                  <span className="inline-block px-3 py-1 bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 rounded-full text-sm font-bold text-primary mb-2 backdrop-blur-sm">
                    {item.phase}
                  </span>
                  <h3 className="text-xl font-serif font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
