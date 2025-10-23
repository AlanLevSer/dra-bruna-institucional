import { TrendingDown, Clock, Shield, Target } from "lucide-react";

const ResultsSection = () => {
  const results = [
    {
      icon: TrendingDown,
      result: "-22kg em 24 semanas",
      method: "com controle de insulina",
      description: "Redução significativa do peso corporal através da regulação hormonal"
    },
    {
      icon: Clock,
      result: "85% mantém o peso",
      method: "após 2 anos",
      description: "Resultados sustentáveis que permanecem a longo prazo"
    },
    {
      icon: Shield,
      result: "Zero efeito sanfona",
      method: "com nosso método",
      description: "Abordagem interdisciplinar previne o reganho de peso"
    },
    {
      icon: Target,
      result: "Melhora de 90%",
      method: "nos exames laboratoriais",
      description: "Benefícios que vão além da estética, impactando a saúde geral"
    }
  ];

  return (
    <section className="py-20 bg-wellness-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Resultados concretos e duradouros
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Nossos pacientes não apenas perdem peso, eles transformam completamente 
            sua saúde e qualidade de vida de forma sustentável.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {results.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-warm transition-smooth hover:scale-105 group"
              >
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-gradient-warm rounded-xl flex items-center justify-center group-hover:scale-110 transition-bounce flex-shrink-0">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-wellness-warm mb-1">
                      {item.result}
                    </h3>
                    <p className="text-lg font-medium text-foreground mb-3">
                      {item.method}
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Scientific Backing */}
        <div className="bg-gradient-sage rounded-3xl p-8 md:p-12 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-6">
            Resultados sustentáveis, baseados em ciência
          </h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div>
              <div className="text-3xl font-bold mb-2">95%</div>
              <div className="text-lg opacity-90">Taxa de sucesso no programa</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">24 meses</div>
              <div className="text-lg opacity-90">Acompanhamento pós-programa</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">100%</div>
              <div className="text-lg opacity-90">Baseado em evidências científicas</div>
            </div>
          </div>
          <p className="text-lg opacity-90 mt-8 max-w-2xl mx-auto">
            Todos os nossos protocolos são fundamentados em pesquisas 
            internacionais e adaptados para a realidade brasileira.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
