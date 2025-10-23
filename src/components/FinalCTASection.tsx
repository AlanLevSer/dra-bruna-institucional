import { Button } from "@/components/ui/button";
import { Phone, MapPin, Clock, Mail } from "lucide-react";
import { CONTACT } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

const FinalCTASection = () => {
  const handleWhatsAppClick = (button: string) => {
    trackEvent('balao_vendas_final_cta', { button, timestamp: new Date().toISOString() });
    window.open(CONTACT.WHATSAPP_BALAO_VENDAS, "_blank");
  };

  return (
    <section className="py-20 bg-wellness-warm/5">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Main CTA */}
          <div className="text-center mb-16">
            <div className="bg-red-500 text-white px-6 py-3 rounded-full text-lg font-bold w-fit mx-auto mb-6 animate-pulse">
              🚨 ÚLTIMAS 3 VAGAS DESTA SEMANA!
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Sua Nova Vida Está a Um Clique de Distância
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto">
              Primeira consulta por <strong className="text-green-600">apenas R$ 97</strong> (valor normal R$ 700) + 
              Plano personalizado incluso. Abordagem humanizada e eficaz.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 px-4">
              <Button 
                size="xl" 
                variant="hero" 
                className="w-full sm:w-auto relative text-sm sm:text-base" 
                onClick={() => handleWhatsAppClick('agendar')}
              >
                🎯 AGENDAR MINHA CONSULTA
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full animate-bounce">
                  R$ 97
                </span>
              </Button>
              <Button 
                size="xl" 
                variant="whatsapp" 
                className="w-full sm:w-auto text-sm sm:text-base" 
                onClick={() => handleWhatsAppClick('whatsapp')}
              >
                💬 Falar Agora no WhatsApp
              </Button>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-green-700 font-semibold">
                ✓ Primeira consulta R$ 97 (72% desconto)  ✓ Avaliação completa inclusa  ✓ Plano sob medida para você
              </p>
            </div>
            
            <p className="text-sm text-red-600 font-semibold">
              ⏰ Oferta válida apenas até 23:59 de hoje
            </p>
          </div>
          
          {/* Contact Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 px-4">
            <div className="text-center p-6 bg-background rounded-xl shadow-sm">
              <div className="bg-wellness-soft p-3 rounded-full w-fit mx-auto mb-4">
                <Phone className="w-6 h-6 text-wellness-warm" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Telefone</h3>
              <p className="text-muted-foreground">{CONTACT.PHONE_DISPLAY}</p>
              <p className="text-sm text-muted-foreground">WhatsApp disponível</p>
            </div>
            
            <div className="text-center p-6 bg-background rounded-xl shadow-sm">
              <div className="bg-wellness-soft p-3 rounded-full w-fit mx-auto mb-4">
                <MapPin className="w-6 h-6 text-wellness-warm" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Localização</h3>
              <p className="text-muted-foreground">{CONTACT.ADDRESS.street}</p>
              <p className="text-sm text-muted-foreground">{CONTACT.ADDRESS.neighborhood} - {CONTACT.ADDRESS.city}</p>
            </div>
            
            <div className="text-center p-6 bg-background rounded-xl shadow-sm">
              <div className="bg-wellness-soft p-3 rounded-full w-fit mx-auto mb-4">
                <Clock className="w-6 h-6 text-wellness-warm" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Horário</h3>
              <p className="text-muted-foreground">{CONTACT.HORARIO.weekdays}</p>
              <p className="text-sm text-muted-foreground">{CONTACT.HORARIO.saturday}</p>
            </div>
            
            <div className="text-center p-6 bg-background rounded-xl shadow-sm">
              <div className="bg-wellness-soft p-3 rounded-full w-fit mx-auto mb-4">
                <Mail className="w-6 h-6 text-wellness-warm" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">E-mail</h3>
              <p className="text-muted-foreground">{CONTACT.EMAIL}</p>
              <p className="text-sm text-muted-foreground">Resposta em 24h</p>
            </div>
          </div>
          
          {/* Final Message */}
          <div className="text-center mt-16">
            <div className="bg-wellness-warm p-8 rounded-2xl text-white">
              <h3 className="text-2xl font-bold mb-4">
                Sua Nova Vida Começa Hoje
              </h3>
              <p className="text-lg opacity-90 max-w-3xl mx-auto">
                Milhares de pessoas já transformaram suas vidas com nosso método. 
                Você merece viver com saúde, energia e autoestima. 
                Não deixe para amanhã a decisão que pode mudar tudo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
