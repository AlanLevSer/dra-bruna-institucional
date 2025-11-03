import { Button } from "@/components/ui/button";
import { Check, Activity, Heart, TrendingUp, Users } from "lucide-react";
import { CONTACT } from "@/lib/constants";
import { openLeadChat } from "@/lib/leadChat";

const benefits = [
  { icon: Activity, text: "Avaliação médica completa" },
  { icon: Heart, text: "Acompanhamento nutricional e psicológico" },
  { icon: TrendingUp, text: "Monitoramento contínuo de resultados" },
  { icon: Users, text: "Suporte integral durante todo o processo" },
];

export const ComoFuncionaB = () => {
  const handleWhatsApp = () => {
    openLeadChat('como_funciona_b', CONTACT.WHATSAPP_BALAO_VENDAS);
  };

  return (
    <section className="py-16 md:py-24 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              O que é o Balão Intragástrico e como ele funciona
            </h2>
            <div className="max-w-3xl mx-auto space-y-4 text-lg text-muted-foreground">
              <p>
                O balão intragástrico é um <strong className="text-foreground">procedimento minimamente invasivo e reversível</strong>, 
                feito por endoscopia, que ocupa parte do estômago e reduz a capacidade alimentar.
              </p>
              <p>
                Com isso, o paciente sente <strong className="text-foreground">saciedade precoce, come menos e emagrece de forma natural e progressiva</strong>.
              </p>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="bg-card rounded-2xl p-8 md:p-12 shadow-elegant mb-8">
            <h3 className="text-2xl font-bold mb-8 text-center">
              Na LevSer, o tratamento vai muito além do procedimento:
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-base font-semibold leading-relaxed">
                        {benefit.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-lg text-muted-foreground mb-6">
              Descubra se o balão é o tratamento ideal para o seu caso.
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
