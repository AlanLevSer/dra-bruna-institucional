import { Utensils, Activity, Heart, Brain } from "lucide-react";

export const MethodVendas = () => {
  const pillars = [
    {
      icon: Utensils,
      title: "Nutricional",
      description: "Reeducação alimentar completa e personalizada",
      color: "bg-orange-50 text-orange-600",
    },
    {
      icon: Activity,
      title: "Hormonal",
      description: "Equilíbrio metabólico e hormonal",
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: Heart,
      title: "Fisiológico",
      description: "Balão como ferramenta de saciedade",
      color: "bg-red-50 text-red-600",
    },
    {
      icon: Brain,
      title: "Comportamental",
      description: "Suporte psicológico contínuo",
      color: "bg-purple-50 text-purple-600",
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
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
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
              className="bg-white rounded-2xl p-6 text-center hover-lift shadow-md"
            >
              <div className={`w-16 h-16 rounded-full ${pillar.color} flex items-center justify-center mx-auto mb-4`}>
                <pillar.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">{pillar.title}</h3>
              <p className="text-sm text-muted-foreground">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        {/* Timeline das 6 Fases */}
        <div className="bg-gradient-to-br from-primary/5 to-wellness-soft/30 rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl font-bold text-center mb-8">
            As 6 Fases do Seu Tratamento
          </h3>
          <div className="space-y-6 max-w-3xl mx-auto">
            {phases.map((phase, index) => (
              <div
                key={index}
                className="flex gap-4 bg-white rounded-xl p-6 shadow-md hover-lift"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-bold">{phase.title}</h4>
                    <span className="text-sm text-primary font-medium">
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
            <div className="inline-block bg-primary text-white px-6 py-3 rounded-full font-bold">
              Programa de 6 a 12 meses
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
