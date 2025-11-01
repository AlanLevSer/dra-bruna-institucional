import { Target, Users, TrendingUp, Heart } from "lucide-react";
import { GrafismoDecor } from "@/components/GrafismoDecor";

export const PilaresMetodoVendasPlasma = () => {
  const pilares = [
    {
      icon: Target,
      title: "Endoscopia de Precisão",
      description: "Aplicação controlada de plasma de argônio para reduzir dilatação da anastomose e recuperar saciedade.",
    },
    {
      icon: Users,
      title: "Equipe Multidisciplinar",
      description: "Acompanhamento com nutrologia, nutrição e apoio psicológico durante toda a jornada.",
    },
    {
      icon: TrendingUp,
      title: "Resultados Progressivos",
      description: "Perda de peso gradual e sustentável, com foco em reeducação alimentar e mudança de hábitos.",
    },
    {
      icon: Heart,
      title: "Manutenção de Longo Prazo",
      description: "Acompanhamento contínuo após o procedimento para evitar novo reganho de peso.",
    },
  ];

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <GrafismoDecor variant="background" position="bottom-left" size="lg" opacity={0.1} />
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Nossa Metodologia
          </h2>
          <p className="text-lg text-muted-foreground">
            Abordagem integrada que vai além do procedimento, garantindo resultados duradouros.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {pilares.map((pilar, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-6 shadow-elegant hover:shadow-hover transition-all text-center"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <pilar.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-3">{pilar.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {pilar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
