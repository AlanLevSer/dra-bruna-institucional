import { TrendingDown, ShieldAlert, Target } from "lucide-react";
import { GrafismoDecor } from "@/components/GrafismoDecor";

export const ProblemasSolucoesGastro = () => {
  const problems = [
    {
      icon: TrendingDown,
      title: "Dietas não funcionam mais",
      description: "Já tentou todas as dietas, perdeu peso, mas sempre voltou com juros?",
    },
    {
      icon: ShieldAlert,
      title: "Medo de cirurgia bariátrica",
      description: "Preocupado com os riscos, cortes, irreversibilidade e internação prolongada?",
    },
    {
      icon: Target,
      title: "Precisa de resultados duradouros",
      description: "Quer uma solução eficaz, mas menos invasiva e com recuperação rápida?",
    },
  ];

  return (
    <section className="relative py-16 bg-gradient-to-b from-muted/50 to-background overflow-hidden">
      <GrafismoDecor variant="background" position="top-right" size="xl" opacity={0.08} rotate={-15} color="gray" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Você já tentou de tudo?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Se você se identifica com algum desses desafios, a gastroplastia endoscópica pode ser a solução que você procura.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="relative group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Glow background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Card */}
              <div className="relative bg-card/80 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 shadow-elegant hover:shadow-hover hover:-translate-y-2 transition-all duration-500">
                {/* Icon circle */}
                <div className="relative w-16 h-16 mx-auto mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full blur-md animate-glow-pulse" />
                  <div className="relative w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm border-2 border-primary/30 rounded-full flex items-center justify-center shadow-elegant">
                    <problem.icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
                  </div>
                </div>

                <h3 className="text-xl font-serif font-bold text-foreground mb-3 text-center">
                  {problem.title}
                </h3>
                <p className="text-muted-foreground text-center leading-relaxed">
                  {problem.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="max-w-3xl mx-auto mt-12 bg-primary/5 border border-primary/20 rounded-2xl p-8">
          <p className="text-lg text-foreground text-center leading-relaxed">
            A Gastroplastia Endoscópica é uma <strong>ferramenta poderosa</strong>, mas precisa estar 
            integrada a um <strong>programa completo</strong> que trabalhe nutrição, metabolismo, comportamento e movimento. 
            Na LevSer, você não faz apenas o procedimento — você recebe <strong>acompanhamento interdisciplinar</strong> 
            em todas as fases, promovendo longevidade e qualidade de vida sustentável.
          </p>
        </div>
      </div>
    </section>
  );
};
