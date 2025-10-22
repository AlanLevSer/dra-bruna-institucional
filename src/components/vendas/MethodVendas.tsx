import { GrafismoDecor } from "@/components/GrafismoDecor";
import { Utensils, Activity, Heart, Brain } from "lucide-react";

export const MethodVendas = () => {
  const pillars = [
    {
      icon: Utensils,
      title: "Nutricional",
      description: "Reeducação alimentar completa e personalizada",
    },
    {
      icon: Activity,
      title: "Hormonal",
      description: "Equilíbrio metabólico e hormonal",
    },
    {
      icon: Heart,
      title: "Fisiológico",
      description: "Balão como ferramenta de saciedade",
    },
    {
      icon: Brain,
      title: "Comportamental",
      description: "Suporte psicológico contínuo",
    },
  ];

  const phases = [
    {
      title: "Avaliação Completa",
      duration: "Semana 1-2",
      description: "Exames, consulta médica e montagem do plano personalizado",
    },
    {
      title: "Colocação do Balão",
      duration: "Semana 3",
      description: "Procedimento endoscópico, sem cirurgia, com alta no mesmo dia",
    },
    {
      title: "Adaptação",
      duration: "Mês 1",
      description: "Acompanhamento intensivo para adaptação ao balão",
    },
    {
      title: "Perda Ativa",
      duration: "Mês 2-6",
      description: "Período de maior perda de peso com acompanhamento multidisciplinar",
    },
    {
      title: "Retirada do Balão",
      duration: "Mês 6",
      description: "Procedimento simples de retirada, sem internação",
    },
    {
      title: "Manutenção",
      duration: "Mês 7-12",
      description: "Consolidação dos hábitos e manutenção do peso alcançado",
    },
  ];

  return (
    <section className="relative py-16 md:py-20 bg-gradient-to-b from-muted/20 to-background overflow-hidden">
      <GrafismoDecor variant="background" position="center" size="xl" opacity={0.08} />
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            O Método LevSer Adaptado para o Balão
          </h2>
          <p className="text-lg text-muted-foreground">
            Um tratamento completo que vai além do balão intragástrico
          </p>
        </div>

        {/* 4 Pilares */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-6 text-center shadow-elegant hover:shadow-hover hover:-translate-y-1 transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <pillar.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{pillar.title}</h3>
              <p className="text-sm text-muted-foreground">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        {/* Timeline das 6 Fases */}
        <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-border/50">
          <h3 className="text-2xl font-serif font-bold text-center mb-8">
            As 6 Fases do Seu Tratamento
          </h3>
          <div className="space-y-4 max-w-3xl mx-auto relative">
            {/* Linha connecting */}
            <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-primary/20 hidden md:block" />
            
            {phases.map((phase, index) => (
              <div
                key={index}
                className="flex gap-4 bg-card rounded-xl p-6 shadow-elegant hover:shadow-hover transition-all relative"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg z-10">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                    <h4 className="text-base font-semibold">{phase.title}</h4>
                    <span className="inline-block bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-medium">
                      {phase.duration}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {phase.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Badge de Duração */}
          <div className="text-center mt-8">
            <div className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold">
              Programa de 6 a 12 meses
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
