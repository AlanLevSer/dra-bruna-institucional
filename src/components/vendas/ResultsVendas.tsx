import { GrafismoDecor } from "@/components/GrafismoDecor";
import { Heart, Zap, Star, Moon } from "lucide-react";

export const ResultsVendas = () => {
  const benefits = [
    {
      icon: Heart,
      title: "Saúde Melhorada",
      description: "Redução de diabetes, hipertensão e colesterol alto",
    },
    {
      icon: Zap,
      title: "Mais Energia",
      description: "Disposição para atividades diárias e exercícios",
    },
    {
      icon: Star,
      title: "Autoestima Elevada",
      description: "Confiança e bem-estar emocional restaurados",
    },
    {
      icon: Moon,
      title: "Melhor Sono",
      description: "Qualidade de vida e descanso aprimorados",
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
    <section className="relative py-16 md:py-20 bg-gradient-to-b from-muted/20 to-background overflow-hidden">
      <GrafismoDecor variant="background" position="bottom-left" size="lg" opacity={0.12} />
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
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
              className="bg-card rounded-xl p-6 text-center shadow-elegant hover:shadow-hover hover:-translate-y-1 transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-base font-semibold mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Comprovação Científica */}
        <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-border/50">
          <h3 className="text-2xl font-serif font-bold text-center mb-8">
            Comprovação Científica
          </h3>
          <div className="space-y-4 max-w-2xl mx-auto mb-6">
            {scientificData.map((data, index) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-card rounded-xl p-6 shadow-elegant"
              >
                <p className="text-3xl font-bold text-primary flex-shrink-0">
                  {data.stat}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {data.description}
                </p>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-muted-foreground">
            Fonte: Estudos clínicos publicados em periódicos internacionais
          </p>
        </div>
      </div>
    </section>
  );
};
