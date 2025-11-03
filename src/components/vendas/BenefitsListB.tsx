import { Button } from "@/components/ui/button";
import { Scale, Utensils, Moon, Heart, Sparkles, TrendingUp } from "lucide-react";
import { CONTACT } from "@/lib/constants";
import { openLeadChat } from "@/lib/leadChat";

const benefits = [
  {
    icon: Scale,
    title: "Perda média de 10 a 35kg em até 6 meses",
  },
  {
    icon: Utensils,
    title: "Redução da fome e do impulso alimentar",
  },
  {
    icon: Moon,
    title: "Melhora do sono e da disposição",
  },
  {
    icon: Heart,
    title: "Controle de diabetes, colesterol e pressão",
  },
  {
    icon: Sparkles,
    title: "Autoestima e confiança restauradas",
  },
  {
    icon: TrendingUp,
    title: "Resultados sustentáveis a longo prazo",
  },
];

const BenefitsListB = () => {
  const handleWhatsApp = () => {
    openLeadChat('benefits_list_b', CONTACT.WHATSAPP_BALAO_VENDAS);
  };

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Benefícios que vão além da balança
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Emagrecer é só o começo. O programa completo da Dra. Bruna transforma corpo, mente e metabolismo.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="bg-card rounded-xl p-6 shadow-elegant hover:shadow-hover hover:-translate-y-1 transition-all animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold leading-snug">
                    {benefit.title}
                  </h3>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-lg text-muted-foreground mb-6">
              Cuide do seu corpo e da sua mente com acompanhamento completo.
            </p>
            <Button
              size="lg"
              onClick={handleWhatsApp}
              className="text-base px-8 py-6 h-auto shadow-elegant hover:shadow-hover"
            >
              Agendar Avaliação
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsListB;
