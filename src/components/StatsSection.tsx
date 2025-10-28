import { Button } from "@/components/ui/button";
import { CONTACT } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

const StatsSection = () => {
  const stats = [
    {
      number: "+500",
      label: "Vidas Transformadas",
      description: "Só neste ano! 🔥",
      highlight: true
    },
    {
      number: "98%",
      label: "Recomendam o Tratamento",
      description: "Satisfação comprovada",
      highlight: false
    },
    {
      number: "56kg",
      label: "Maior Perda Registrada",
      description: "Em apenas 48 semanas",
      highlight: false
    },
    {
      number: "100 mil",
      label: "Meta até 2030",
      description: "100 mil kg a serem eliminados",
      highlight: true
    }
  ];

  const handleTransformationClick = () => {
    trackEvent('balão_vendas_stats_cta', { timestamp: new Date().toISOString() });
    window.open(CONTACT.WHATSAPP_BALAO_VENDAS, "_blank");
  };

  return (
    <section className="py-20 bg-wellness-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Números que inspiram confiança
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Nossa abordagem interdisciplinar já transformou centenas de vidas. 
            Veja os resultados que comprovam a eficácia do nosso programa.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className={`text-center bg-white rounded-2xl p-4 sm:p-6 shadow-soft hover:shadow-warm transition-smooth hover:scale-105 ${
                stat.highlight ? 'ring-2 ring-wellness-warm/50 bg-wellness-warm/5' : ''
              }`}
            >
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-wellness-warm mb-2">
                {stat.number}
              </div>
              <div className="font-semibold text-foreground mb-2 text-sm sm:text-base">
                {stat.label}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
        
        {/* Guarantee Badge */}
        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center mb-12 max-w-2xl mx-auto">
          <div className="text-green-700 font-bold text-lg mb-2">
            🛡️ COMPROMISSO COM SUA SATISFAÇÃO
          </div>
          <p className="text-green-600">
            Nosso foco é no seu bem-estar e resultado sustentável
          </p>
        </div>

        <div className="text-center px-4">
          <Button 
            variant="hero" 
            size="xl"
            onClick={handleTransformationClick}
            className="animate-pulse hover:animate-none w-full sm:w-auto text-sm sm:text-base"
          >
            ⚡ SIM! QUERO MINHA TRANSFORMAÇÃO AGORA
          </Button>
          <p className="text-center text-sm text-muted-foreground mt-4">
            ⏰ Últimas vagas disponíveis para este mês
          </p>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

