import { Button } from "@/components/ui/button";
import { AlertCircle, Check } from "lucide-react";
import { CONTACT } from "@/lib/constants";
import { openLeadChat } from "@/lib/leadChat";

const problems = [
  "Vive no efeito sanfona e não consegue manter o peso?",
  "Sente fome constante e falta de controle ao comer?",
  "Já tentou de tudo: dietas, medicamentos, jejum e nada resolveu?",
  "Perde peso e logo ganha tudo de volta?",
];

export const ProblemIdentificationB = () => {
  const handleWhatsApp = () => {
    openLeadChat('problem_identification_b', CONTACT.WHATSAPP_BALAO_VENDAS);
  };

  return (
    <section className="py-16 md:py-24 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Você se identifica com algum desses sinais?
            </h2>
          </div>

          {/* Problem Cards */}
          <div className="grid md:grid-cols-2 gap-4 mb-12">
            {problems.map((problem, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-6 shadow-elegant hover:shadow-hover transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-primary/20 transition-colors">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-base font-medium leading-relaxed">
                    {problem}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message */}
          <div className="bg-primary/5 backdrop-blur-sm rounded-xl p-8 border border-primary/10 text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-primary" />
              </div>
            </div>
            <p className="text-lg md:text-xl font-semibold">
              Esses são sinais de que seu corpo precisa de um tratamento completo, 
              e não de mais uma dieta temporária.
            </p>
            <p className="text-base text-muted-foreground">
              O balão intragástrico, aliado ao acompanhamento interdisciplinar, pode ser o divisor de águas que você busca.
            </p>
            <Button
              size="lg"
              onClick={handleWhatsApp}
              className="text-base px-8 py-6 h-auto shadow-elegant hover:shadow-hover"
            >
              Comece agora o seu processo de transformação
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
