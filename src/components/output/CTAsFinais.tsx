import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MessageCircle, RotateCcw } from "lucide-react";
import { CONTACT } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import { openLeadChat } from "@/lib/leadChat";

interface CTAsFinaisProps {
  onResetQuiz?: () => void;
  notaGlobal: number;
  conceito: string;
  tratamentoRecomendado: string;
  metaKg: number;
  semanasPlano: number;
}

export const CTAsFinais = ({ 
  onResetQuiz,
  notaGlobal,
  conceito,
  tratamentoRecomendado,
  metaKg,
  semanasPlano
}: CTAsFinaisProps) => {
  const message = encodeURIComponent(
    "Olá! Acabei de receber meu Plano de Transformação Pessoal e gostaria de agendar uma avaliação."
  );
  
  return (
    <div className="py-16 px-4">
      {/* NOVO: Resumo do resultado */}
      <div className="max-w-4xl mx-auto mb-12">
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 shadow-elegant">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">
              Resumo do Seu Plano Personalizado
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Perfil de Saúde Atual</p>
                <p className="text-4xl font-bold text-primary mb-1">{notaGlobal}/100</p>
                <Badge variant={conceito === 'Crítico' ? 'destructive' : 'secondary'}>
                  {conceito}
                </Badge>
              </div>
              <div className="border-x border-border/50">
                <p className="text-sm text-muted-foreground mb-2">Tratamento Recomendado</p>
                <p className="text-lg font-semibold mt-2 leading-tight">{tratamentoRecomendado}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Meta de Emagrecimento</p>
                <p className="text-4xl font-bold text-primary mb-1">-{metaKg}kg</p>
                <p className="text-xs text-muted-foreground">em {Math.round(semanasPlano / 4.33)} meses</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Pronto para dar o primeiro passo?
          </h2>
          <p className="text-lg text-muted-foreground">
            Agende sua consulta inicial e comece sua transformação hoje mesmo
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          <Button 
            size="lg" 
            className="h-auto py-6 flex flex-col gap-2"
            onClick={() => {
              trackEvent('quiz_final_cta_clicked', { cta_type: 'presencial' });
              const whatsappUrl = `${CONTACT.WHATSAPP_URL.split('?')[0]}?text=${message}`;
              openLeadChat('quiz_final_presencial', whatsappUrl);
            }}
          >
            <Calendar className="w-6 h-6" />
            <span className="font-semibold">Agendar Avaliação Presencial</span>
            <span className="text-xs opacity-90">São Paulo - Itaim Bibi</span>
          </Button>
          
          <Button 
            size="lg" 
            variant="outline"
            className="h-auto py-6 flex flex-col gap-2"
            onClick={() => {
              trackEvent('quiz_final_cta_clicked', { cta_type: 'teleconsulta' });
              const teleconsultaMsg = "Olá! Gostaria de agendar uma teleconsulta.";
              const whatsappUrl = `${CONTACT.WHATSAPP_URL.split('?')[0]}?text=${encodeURIComponent(teleconsultaMsg)}`;
              openLeadChat('quiz_final_teleconsulta', whatsappUrl);
            }}
          >
            <MessageCircle className="w-6 h-6" />
            <span className="font-semibold">Agendar Teleconsulta</span>
            <span className="text-xs opacity-90">Online de qualquer lugar</span>
          </Button>
          
          <Button 
            size="lg" 
            variant="outline"
            className="h-auto py-6 flex flex-col gap-2"
            onClick={() => {
              trackEvent('quiz_final_cta_clicked', { cta_type: 'duvidas' });
              const duvidasMsg = "Olá! Tenho algumas dúvidas sobre o tratamento.";
              const whatsappUrl = `${CONTACT.WHATSAPP_URL.split('?')[0]}?text=${encodeURIComponent(duvidasMsg)}`;
              openLeadChat('quiz_final_duvidas', whatsappUrl);
            }}
          >
            <MessageCircle className="w-6 h-6" />
            <span className="font-semibold">Tirar Dúvidas</span>
            <span className="text-xs opacity-90">Fale direto com a equipe</span>
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
