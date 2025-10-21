import { Button } from "@/components/ui/button";
import { CONTACT } from "@/lib/constants";
import { Phone, MapPin, Clock, Mail } from "lucide-react";

export const FinalCTAVendas = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: "Telefone",
      value: CONTACT.PHONE_DISPLAY,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: MapPin,
      title: "Endereço",
      value: CONTACT.ADDRESS.street + " - " + CONTACT.ADDRESS.neighborhood,
      color: "text-red-600",
      bg: "bg-red-50",
    },
    {
      icon: Clock,
      title: "Horário",
      value: "Seg a Sex: 8h às 18h",
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      icon: Mail,
      title: "Email",
      value: "contato@brunadurelli.com.br",
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  const handleWhatsApp = () => {
    window.open(CONTACT.WHATSAPP_BALAO_VENDAS, "_blank");
  };

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-primary/5 to-wellness-soft/30">
      <div className="container mx-auto px-4">
        {/* Badge de Urgência */}
        <div className="text-center mb-8">
          <div className="inline-block bg-destructive text-white px-6 py-3 rounded-full font-bold animate-pulse shadow-lg">
            🔥 ÚLTIMAS 3 VAGAS DISPONÍVEIS ESTE MÊS
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Oferta Especial */}
          <div className="bg-white rounded-2xl p-8 md:p-12 text-center shadow-xl mb-8">
            <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              Oferta Exclusiva
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Consulta de Avaliação Completa
            </h2>
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="text-5xl font-bold text-primary">R$ 97</span>
              <div>
                <span className="text-2xl text-muted-foreground line-through block">
                  R$ 700
                </span>
                <span className="text-sm text-destructive font-medium">
                  Economia de R$ 603
                </span>
              </div>
            </div>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Inclui avaliação médica completa, plano personalizado, orientação 
              nutricional inicial e sem compromisso de contratação.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button variant="hero" size="xl" onClick={handleWhatsApp}>
                🎯 AGENDAR MINHA CONSULTA
              </Button>
              <Button variant="whatsapp" size="xl" onClick={handleWhatsApp}>
                💬 Falar Agora no WhatsApp
              </Button>
            </div>

            <p className="text-sm text-muted-foreground">
              ⏰ Oferta válida por tempo limitado
            </p>
          </div>

          {/* Cards de Contato */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 flex items-start gap-4 shadow-md hover-lift"
              >
                <div className={`w-12 h-12 rounded-full ${info.bg} flex items-center justify-center flex-shrink-0`}>
                  <info.icon className={`w-6 h-6 ${info.color}`} />
                </div>
                <div>
                  <p className="font-bold mb-1">{info.title}</p>
                  <p className="text-sm text-muted-foreground">{info.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Mensagem Final */}
          <div className="text-center">
            <p className="text-xl font-medium text-foreground mb-2">
              Sua transformação começa com uma decisão.
            </p>
            <p className="text-lg text-muted-foreground">
              Dê o primeiro passo hoje! 💪
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
