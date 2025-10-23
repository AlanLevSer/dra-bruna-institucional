import { Users, Microscope, Heart, Smartphone } from "lucide-react";

const DifferentialsSection = () => {
  const differentials = [
    {
      icon: Users,
      title: "Atendimento Interdisciplinar Coordenado",
      description: "Equipe completa trabalhando em sinergia: endocrinologista, nutricionista, psicólogo e educador físico, todos alinhados ao seu caso específico."
    },
    {
      icon: Microscope,
      title: "Tecnologia de Ponta",
      description: "Bioimpedância avançada, testes genéticos personalizados, análises hormonais completas e monitoramento contínuo dos seus resultados."
    },
    {
      icon: Heart,
      title: "Acompanhamento Humanizado",
      description: "Consultas regulares, grupo de apoio, canal direto com a equipe e suporte emocional durante toda sua jornada de transformação."
    },
    {
      icon: Smartphone,
      title: "App Exclusivo de Monitoramento (Em breve...)",
      description: "Aplicativo próprio para acompanhamento diário, receitas personalizadas, lembretes de medicação e comunicação direta com a equipe."
    }
  ];

  return (
    <section className="py-20 bg-wellness-soft/10">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Diferenciais Exclusivos
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              O que torna nosso tratamento único e eficaz para resultados sustentáveis
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {differentials.map((differential, index) => (
              <div key={index} className="bg-background p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="bg-wellness-warm p-3 rounded-full flex-shrink-0">
                    <differential.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {differential.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {differential.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <div className="bg-wellness-warm/5 p-8 rounded-2xl border border-wellness-warm/20">
              <h3 className="text-2xl font-bold text-wellness-warm mb-4">
                Comprometimento Total com Seus Resultados
              </h3>
              <p className="text-lg text-muted-foreground">
                Nossa equipe está disponível não apenas durante as consultas, mas ao longo de toda sua jornada. 
                Porque sabemos que transformação real acontece no dia a dia, e você nunca estará sozinho nesse processo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DifferentialsSection;
