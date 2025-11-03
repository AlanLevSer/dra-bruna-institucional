import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { CONTACT } from "@/lib/constants";
import { openLeadChat } from "@/lib/leadChat";

const TestimonialsGoogleB = () => {
  const handleWhatsApp = () => {
    openLeadChat('testimonials_google_b', CONTACT.WHATSAPP_BALAO_VENDAS);
  };

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              O Que Nossas Pacientes Dizem
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Nada gera mais confiança do que ver o resultado de quem já passou pela mesma jornada.
            </p>
          </div>

          {/* Google Reviews Placeholder */}
          <div className="bg-muted/20 rounded-2xl p-12 border-2 border-dashed border-muted-foreground/20 mb-12">
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="w-8 h-8 text-primary" />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-lg font-semibold text-muted-foreground">
                  Plugin do Google Meu Negócio será inserido aqui
                </p>
                <p className="text-sm text-muted-foreground/70">
                  Adicione o código embed do Google Reviews para exibir avaliações reais das pacientes
                </p>
              </div>
              
              {/* Instructions for adding Google Reviews */}
              <div className="bg-card rounded-lg p-6 text-left max-w-2xl mx-auto">
                <p className="text-sm text-muted-foreground mb-4">
                  <strong>Como adicionar o Google Reviews:</strong>
                </p>
                <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                  <li>Acesse o Google Meu Negócio e obtenha o código embed das avaliações</li>
                  <li>Abra o arquivo <code className="bg-muted px-2 py-1 rounded">TestimonialsGoogleB.tsx</code></li>
                  <li>Substitua este placeholder pelo código HTML do widget do Google</li>
                </ol>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-lg text-muted-foreground mb-6">
              Agende sua avaliação e comece a escrever sua própria história de sucesso.
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

export default TestimonialsGoogleB;
