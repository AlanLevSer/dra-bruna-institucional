import { Button } from "@/components/ui/button";
import { Phone, MapPin, Clock, Mail } from "lucide-react";
import { CONTACT } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import { openLeadChat } from "@/lib/leadChat";

export const FinalCTAVendasPlasma = () => {
  const contactInfo = [
    { icon: Phone, title: "Telefone", value: CONTACT.PHONE_DISPLAY },
    { icon: MapPin, title: "Endereço", value: CONTACT.ADDRESS.full },
    { icon: Clock, title: "Horário", value: `${CONTACT.HORARIO.weekdays} • ${CONTACT.HORARIO.saturday}` },
    { icon: Mail, title: "E-mail", value: CONTACT.EMAIL },
  ];

  const handleWhatsApp = () => {
    trackEvent("cta_clicked", { source: "final_cta_plasma" });
    openLeadChat("final_cta_plasma", CONTACT.WHATSAPP_PLASMA_VENDAS);
  };

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-br from-primary/5 to-muted overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Recupere o controle do seu peso sem nova cirurgia
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Agende sua pré-consulta e descubra se o Plasma de Argônio é a solução ideal para você.
          </p>
          <Button 
            size="lg" 
            className="text-lg h-14 px-8 bg-gradient-premium shadow-elegant hover:shadow-hover"
            onClick={handleWhatsApp}
          >
            Agendar Pré-Consulta
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-4 flex items-start gap-4 shadow-sm"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <info.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-foreground mb-1">{info.title}</div>
                <div className="text-sm text-muted-foreground">{info.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
