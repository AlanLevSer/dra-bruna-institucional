import { Heart, Zap, Scale, Activity } from "lucide-react";

const TargetAudienceSection = () => {
  const profiles = [
    {
      icon: Heart,
      title: "Compulsão Alimentar",
      description: "Dificuldade em controlar episódios de compulsão e relação emocional com a comida"
    },
    {
      icon: Zap,
      title: "Metabolismo Lento",
      description: "Sensação de que o metabolismo não funciona como deveria, mesmo com dietas"
    },
    {
      icon: Scale,
      title: "Baixa Saciedade",
      description: "Fome constante e dificuldade em se sentir satisfeito após as refeições"
    },
    {
      icon: Activity,
      title: "Desequilíbrio Hormonal",
      description: "Alterações hormonais que impactam o peso e a distribuição de gordura corporal"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Para quem é o programa?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Nosso programa é especialmente desenvolvido para pessoas que enfrentam 
            desafios específicos na jornada de emagrecimento sustentável.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {profiles.map((profile, index) => {
            const IconComponent = profile.icon;
            return (
              <div 
                key={index}
                className="text-center p-6 rounded-2xl bg-wellness-cream hover:bg-wellness-soft transition-smooth hover:scale-105 group"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-wellness-warm rounded-full flex items-center justify-center group-hover:bg-wellness-sage transition-smooth">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {profile.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {profile.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-sage rounded-3xl p-8 md:p-12 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Cada paciente recebe avaliação interdisciplinar
          </h3>
          <p className="text-xl opacity-90 mb-6">
            para tratamento 100% personalizado às suas necessidades específicas
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-white/20 px-4 py-2 rounded-full">Avaliação Nutricional</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">Análise Hormonal</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">Perfil Comportamental</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">Exames Complementares</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TargetAudienceSection;
