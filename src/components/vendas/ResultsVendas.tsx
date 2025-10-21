import { Heart, Zap, Star, Moon } from "lucide-react";

export const ResultsVendas = () => {
  const benefits = [
    {
      icon: Heart,
      title: "Saúde Melhorada",
      description: "Redução de diabetes, hipertensão e colesterol alto",
      color: "text-red-600",
    },
    {
      icon: Zap,
      title: "Mais Energia",
      description: "Disposição para atividades diárias e exercícios",
      color: "text-yellow-600",
    },
    {
      icon: Star,
      title: "Autoestima Elevada",
      description: "Confiança e bem-estar emocional restaurados",
      color: "text-purple-600",
    },
    {
      icon: Moon,
      title: "Melhor Sono",
      description: "Qualidade de vida e descanso aprimorados",
      color: "text-blue-600",
    },
  ];

  const scientificData = [
    {
      stat: "85%",
      description: "dos pacientes mantêm pelo menos 50% da perda de peso após 2 anos",
    },
    {
      stat: "15%",
      description: "redução média no IMC nos primeiros 6 meses",
    },
    {
      stat: "90%",
      description: "melhora significativa em comorbidades",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-wellness-cream to-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Benefícios Além da Perda de Peso
          </h2>
          <p className="text-lg text-muted-foreground">
            Transformação completa na sua saúde e qualidade de vida
          </p>
        </div>

        {/* Grid de Benefícios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 text-center hover-lift shadow-md"
            >
              <benefit.icon className={`w-12 h-12 ${benefit.color} mx-auto mb-4`} />
              <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Comprovação Científica */}
        <div className="bg-gradient-to-br from-primary/5 to-wellness-soft/30 rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl font-bold text-center mb-8">
            Comprovação Científica
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {scientificData.map((data, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center shadow-md"
              >
                <p className="text-4xl font-bold text-primary mb-3">
                  {data.stat}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {data.description}
                </p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground">
            Fonte: Estudos clínicos publicados em periódicos internacionais
          </p>
        </div>
      </div>
    </section>
  );
};
