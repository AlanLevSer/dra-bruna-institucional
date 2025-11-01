import { Button } from "@/components/ui/button";
import { CONTACT } from "@/lib/constants";
import { trackEvent, trackWhatsAppClick } from "@/lib/analytics";
import { Phone, MapPin, Clock, Mail } from "lucide-react";

const contactInfo = [
  { icon: Phone, title: "Telefone", value: CONTACT.PHONE_DISPLAY },
  { icon: MapPin, title: "Endereço", value: `${CONTACT.ADDRESS.street} - ${CONTACT.ADDRESS.neighborhood}` },
  { icon: Clock, title: "Horário", value: CONTACT.HORARIO.weekdays },
  { icon: Mail, title: "E-mail", value: CONTACT.EMAIL },
];

export const FinalCTAVendas = () => {
  const handleWhatsApp = () => {
    try {
      trackEvent("cta_clicked", { source: "final_cta_vendas", action: "open_widget" });
    } catch (e) { void e; }
    if (window.LeadChat) {
      window.LeadChat.open();
    }
  };

  return (
    <section className="py-10 md:py-12 bg-gradient-premium text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Pronta para dar o próximo passo?
            </h2>
            <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Agende uma consulta de avaliação e descubra se o balão intragástrico é o tratamento ideal para você.
            </p>

            <Button
              size="lg"
              onClick={handleWhatsApp}
              className="bg-card text-foreground hover:bg-card/90 shadow-elegant text-base md:text-lg px-8 py-6 h-auto"
            >
              Agendar avaliação
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {contactInfo.map((info) => {
              const Icon = info.icon;
              return (
                <div key={info.title} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 flex items-start gap-4 text-left">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium mb-1 opacity-90">{info.title}</p>
                    <p className="text-sm font-semibold">{info.value}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-base opacity-90">Estamos aqui para te acompanhar em cada etapa.</p>
        </div>
      </div>
    </section>
  );
};



