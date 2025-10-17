import { Button } from "@/components/ui/button";
import { Calendar, MessageCircle, RotateCcw } from "lucide-react";

interface CTAsFinaisProps {
  onResetQuiz?: () => void;
}

export const CTAsFinais = ({ onResetQuiz }: CTAsFinaisProps) => {
  const whatsappNumber = "5511997023024";
  const whatsappMessage = encodeURIComponent(
    "Olá! Acabei de receber meu Plano de Transformação Pessoal e gostaria de agendar uma avaliação."
  );
  
  return (
    <div className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Pronto para dar o primeiro passo?
          </h2>
          <p className="text-lg text-muted-foreground">
            Agende sua consulta inicial e comece sua transformação hoje mesmo
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Button
            size="lg"
            className="h-auto py-6 px-8 flex-col items-center gap-3 text-lg"
            onClick={() => window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank')}
          >
            <Calendar className="w-8 h-8" />
            <div>
              <div className="font-bold">Agendar Avaliação</div>
              <div className="text-xs opacity-90 font-normal mt-1">
                Consulta inicial com Dra. Bruna
              </div>
            </div>
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            className="h-auto py-6 px-8 flex-col items-center gap-3 text-lg"
            onClick={() => window.open(`https://wa.me/${whatsappNumber}`, '_blank')}
          >
            <MessageCircle className="w-8 h-8" />
            <div>
              <div className="font-bold">Tirar Dúvidas</div>
              <div className="text-xs opacity-90 font-normal mt-1">
                Fale conosco pelo WhatsApp
              </div>
            </div>
          </Button>
        </div>
        
        {onResetQuiz && (
          <div className="mt-6 flex justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={onResetQuiz}
              className="gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Refazer quiz com outras respostas
            </Button>
          </div>
        )}
        
        <div className="mt-12 p-6 rounded-lg bg-muted/30 border">
          <p className="text-center text-sm text-muted-foreground">
            📋 <strong>Próximos passos:</strong> Após a avaliação inicial, você receberá seu plano 
            completo personalizado, com cronograma detalhado, programas específicos e acesso à 
            Experiência Concierge.
          </p>
        </div>
      </div>
    </div>
  );
};
