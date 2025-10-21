import { Users, Smartphone, Heart, Target } from "lucide-react";

export const DifferentialsVendas = () => {
  const differentials = [
    {
      icon: Users,
      title: "Equipe Interdisciplinar",
      items: [
        "Médico endoscopista",
        "Nutricionista",
        "Psicólogo",
        "Educador físico",
      ],
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: Smartphone,
      title: "Tecnologia de Ponta",
      items: [
        "Balões de última geração",
        "App de acompanhamento",
        "Teleatendimento",
      ],
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      icon: Heart,
      title: "Atendimento Humanizado",
      items: [
        "Suporte 24/7",
        "Consultas individualizadas",
        "Escuta ativa e empática",
      ],
      color: "text-red-600",
      bg: "bg-red-50",
    },
    {
      icon: Target,
      title: "Resultados Duradouros",
      items: [
        "Foco na manutenção",
        "Reeducação alimentar",
        "Mudança de hábitos",
      ],
      color: "text-green-600",
      bg: "bg-green-50",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-wellness-cream to-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Por Que Fazer o Balão Intragástrico na LevSer?
          </h2>
          <p className="text-lg text-muted-foreground">
            Diferenciais que fazem toda a diferença na sua transformação
          </p>
        </div>

        {/* Grid de Diferenciais */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {differentials.map((differential, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 hover-lift shadow-md"
            >
              <div className={`w-16 h-16 rounded-full ${differential.bg} flex items-center justify-center mb-6`}>
                <differential.icon className={`w-8 h-8 ${differential.color}`} />
              </div>
              <h3 className="text-xl font-bold mb-4">{differential.title}</h3>
              <ul className="space-y-2">
                {differential.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-primary font-bold">✓</span>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Banner de Comprometimento */}
        <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-center text-white shadow-xl">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Nosso Compromisso é com Sua Transformação Sustentável
          </h3>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Não vendemos apenas o balão. Entregamos um programa completo 
            de mudança de vida, com suporte integral antes, durante e depois do tratamento.
          </p>
        </div>
      </div>
    </section>
  );
};
