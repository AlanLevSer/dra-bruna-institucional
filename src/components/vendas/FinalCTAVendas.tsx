import { Button } from "@/components/ui/button";
import { CONTACT } from "@/lib/constants";
import { Phone, MapPin, Clock, Mail } from "lucide-react";

export const FinalCTAVendas = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: "Telefone",
      value: CONTACT.PHONE_DISPLAY,
    },
    {
      icon: MapPin,
      title: "Endereço",
      value: CONTACT.ADDRESS.street + " - " + CONTACT.ADDRESS.neighborhood,
    },
    {
      icon: Clock,
      title: "Horário",
      value: "Seg a Sex: 8h às 18h",
    },
    {
      icon: Mail,
      title: "Email",
      value: "contato@brunadurelli.com.br",
    },
  ];

  const handleWhatsApp = () => {
    window.open(CONTACT.WHATSAPP_BALAO_VENDAS, "_blank");
  };

  return (
    <section className="py-16 md:py-20 bg-gradient-premium text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* CTA Principal */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Pronta para Dar o Próximo Passo?
            </h2>
            <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Agende uma consulta de avaliação e descubra se o Balão Intragástrico 
              é o tratamento ideal para você.
            </p>

            <Button
              size="lg"
              onClick={handleWhatsApp}
              className="bg-card text-foreground hover:bg-card/90 shadow-elegant text-base md:text-lg px-8 py-6 h-auto"
            >
              Agendar Avaliação
            </Button>
          </div>

          {/* Cards de Contato */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 flex items-start gap-4 text-left"
              >
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <info.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-medium mb-1 opacity-90">{info.title}</p>
                  <p className="text-sm font-semibold">{info.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Mensagem Final */}
          <div className="text-center opacity-90">
            <p className="text-base">
              Estamos aqui para te acompanhar em cada etapa.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
