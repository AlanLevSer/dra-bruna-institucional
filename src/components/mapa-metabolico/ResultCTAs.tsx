import { Button } from '@/components/ui/button';
import { Calendar, Mail, MessageCircle } from 'lucide-react';
import { trackMapaCTAClick } from '@/lib/mapa-metabolico/analytics';
import { trackWhatsAppClick } from '@/lib/analytics';
import { CONTACT } from '@/lib/constants';

interface ResultCTAsProps {
  score: number;
  priorityPillar: string;
}

export const ResultCTAs = ({ score, priorityPillar }: ResultCTAsProps) => {
  const handleBooking = () => {
    trackMapaCTAClick('booking', score);
    const message = `Oi, fiz meu Mapa Metabólico LevSer (score ${score}/100; foco: ${priorityPillar}). Gostaria de orientação para os próximos passos.`;
    const whatsappUrl = `https://wa.me/${CONTACT.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    trackWhatsAppClick('mapa_metabolico_booking', { score, priority: priorityPillar });
    window.open(whatsappUrl, '_blank');
  };

  const handleWhatsApp = () => {
    trackMapaCTAClick('whatsapp', score);
    const message = `Oi, fiz meu Mapa Metabólico LevSer (score ${score}/100; foco: ${priorityPillar}). Gostaria de orientação para os próximos passos.`;
    const whatsappUrl = `https://wa.me/${CONTACT.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    trackWhatsAppClick('mapa_metabolico_direct', { score, priority: priorityPillar });
    window.open(whatsappUrl, '_blank');
  };

  const handleEmail = () => {
    trackMapaCTAClick('email_report', score);
    // TODO: Implementar envio de relatório por e-mail
    alert('Funcionalidade de envio por e-mail em breve!');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-serif text-2xl font-bold text-center text-foreground">Próximos passos</h3>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto">
          Agora que você conhece seu mapa metabólico, converse com nossa equipe para receber orientação
          personalizada sobre os melhores caminhos para sua transformação.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button
          onClick={handleBooking}
          className="w-full h-auto py-4 flex flex-col gap-2 shadow-elegant hover:shadow-hover transition-all"
        >
          <Calendar className="w-6 h-6" />
          <span className="font-semibold">Agendar Avaliação</span>
          <span className="text-xs opacity-90">Consulta personalizada</span>
        </Button>

        <Button
          onClick={handleWhatsApp}
          variant="outline"
          className="w-full h-auto py-4 flex flex-col gap-2 border-2 hover:bg-muted/50"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="font-semibold">Falar no WhatsApp</span>
          <span className="text-xs opacity-70">Tire suas dúvidas</span>
        </Button>

        <Button
          onClick={handleEmail}
          variant="ghost"
          className="w-full h-auto py-4 flex flex-col gap-2 hover:bg-muted/50"
        >
          <Mail className="w-6 h-6" />
          <span className="font-semibold">Receber por e-mail</span>
          <span className="text-xs opacity-70">Salve seu resultado</span>
        </Button>
      </div>

      <div className="bg-muted/30 border border-border rounded-xl p-6 space-y-3">
        <h4 className="font-semibold text-foreground">Benefícios inclusos na avaliação:</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-center gap-2">
            ✅ <span>Comunidade de apoio no WhatsApp — incluso</span>
          </li>
          <li className="flex items-center gap-2">
            ✅ <span>Tira-dúvidas com nutricionista pelo WhatsApp — incluso</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
