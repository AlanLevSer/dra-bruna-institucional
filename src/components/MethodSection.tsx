import { Utensils, Activity, Brain, Heart } from "lucide-react";

const MethodSection = () => {
  const pillars = [
    {
      icon: Utensils,
      title: "Pilar Nutricional",
      description: "Reeducação alimentar personalizada, sem restrições extremas e com foco na sustentabilidade."
    },
    {
      icon: Activity,
      title: "Pilar Hormonal",
      description: "Avaliação e otimização dos hormônios que influenciam o metabolismo e o controle do peso."
    },
    {
      icon: Heart,
      title: "Pilar Fisiológico",
      description: "Análise da composição corporal e adequação de exercícios físicos personalizados."
    },
    {
      icon: Brain,
      title: "Pilar Comportamental",
      description: "Trabalho psicológico para desenvolver uma relação saudável com a comida e o corpo."
    }
  ];

  const phases = [
    { phase: "1ª Fase", title: "Avaliação Inicial", duration: "Semana 1-2" },
    { phase: "2ª Fase", title: "Preparação", duration: "Semana 3-4" },
    { phase: "3ª Fase", title: "Intervenção Ativa", duration: "Semana 5-16" },
    { phase: "4ª Fase", title: "Consolidação", duration: "Semana 17-20" },
    { phase: "5ª Fase", title: "Manutenção", duration: "Semana 21-24" },
    { phase: "6ª Fase", title: "Acompanhamento", duration: "Pós 24 semanas" }
  ];

  return (
    <section className="py-20 bg-gradient-soft">
      <div className="container mx-auto px-4">
        {/* Method Introduction */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            O Programa <span className="text-wellness-warm">LevSer</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Muito além do balão intragástrico: um programa baseado em 4 pilares fundamentais 
            para uma transformação completa e duradoura.
          </p>
        </div>

        {/* Four Pillars */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {pillars.map((pillar, index) => {
            const IconComponent = pillar.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6 text-center shadow-soft hover:shadow-warm transition-smooth hover:scale-105 group"
              >
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-warm rounded-full flex items-center justify-center group-hover:scale-110 transition-bounce">
                  <IconComponent className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">
                  {pillar.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* 6 Phases Timeline */}
        <div className="bg-white rounded-3xl p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-12">
            As 6 fases do programa
          </h3>
          
          <div className="relative max-w-4xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 md:transform md:-translate-x-0.5 top-0 bottom-0 w-0.5 bg-wellness-warm"></div>
            
            {phases.map((item, index) => (
              <div 
                key={index}
                className={`relative flex items-center mb-12 last:mb-0 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-6 md:left-1/2 md:transform md:-translate-x-1/2 w-6 h-6 bg-wellness-warm rounded-full border-4 border-white shadow-soft z-10 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">{index + 1}</span>
                </div>
                
                {/* Content card */}
                <div className={`ml-16 md:ml-0 md:w-5/12 ${
                  index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                }`}>
                  <div className="bg-wellness-cream rounded-xl p-6 hover:bg-wellness-soft transition-smooth shadow-soft">
                    <div className="text-sm font-medium text-wellness-warm mb-1">
                      {item.phase}
                    </div>
                    <h4 className="text-lg font-bold text-foreground mb-2">
                      {item.title}
                    </h4>
                    <div className="text-sm text-muted-foreground">
                      {item.duration}
                    </div>
                  </div>
                </div>
                
                {/* Empty space for desktop alternating layout */}
                <div className="hidden md:block md:w-5/12"></div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="inline-block bg-gradient-warm text-white px-8 py-4 rounded-2xl shadow-warm">
              <div className="text-sm font-medium opacity-90">Duração Total</div>
              <div className="text-2xl font-bold">24 ou 48 semanas</div>
              <div className="text-sm opacity-90">Dependendo do seu perfil</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MethodSection;
