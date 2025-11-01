import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, MapPin } from "lucide-react";
import ctaImage from "@/assets/dra-bruna-elegant.avif";
import { CONTACT } from "@/lib/constants";
import { openLeadChat } from "@/lib/leadChat";

export const CTAFinal = () => {
  return <section id="agendar" className="py-12 xl:py-16 bg-gradient-premium text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img src={ctaImage} alt="Dra. Bruna Durelli" className="w-full h-full object-cover" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold mb-6">
            Pronta para Começar? Estou Te Esperando
          </h2>
          
          <p className="text-xl opacity-90 leading-relaxed max-w-2xl mx-auto">
            Agende sua consulta comigo e vamos juntas construir sua transformação. 
            Você pode alcançar uma vida mais leve, saudável e plena. Eu te ajudo.
          </p>
          
          <p className="text-sm opacity-80 italic">Vamos juntos, sem pressa. Cada passo importa, conte comigo.</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button size="lg" variant="secondary" className="shadow-elegant hover:shadow-hover transition-all" onClick={() => openLeadChat('cta_final_phone', CONTACT.WHATSAPP_PROGRAMA_URL)}>
              <Phone className="mr-2" size={20} />
              {CONTACT.PHONE_DISPLAY}
            </Button>
            
            <Button size="lg" className="bg-card text-foreground hover:bg-card/90 shadow-elegant hover:shadow-hover transition-all" onClick={() => openLeadChat('cta_final_whatsapp', CONTACT.WHATSAPP_PROGRAMA_URL)}>
              <MessageCircle className="mr-2" size={20} />
              WhatsApp
            </Button>
          </div>

          <div className="pt-12 border-t border-primary-foreground/20 mt-12">
            {/* Informações de Contato */}
            <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              <div className="flex flex-col items-center gap-2">
                <MapPin className="mb-2" size={24} />
                <p className="font-medium">Localização</p>
                <p className="text-sm opacity-80 text-center">
                  LevSer<br />
                  {CONTACT.ADDRESS.street} - {CONTACT.ADDRESS.neighborhood}<br />
                  {CONTACT.ADDRESS.city} - {CONTACT.ADDRESS.state}, {CONTACT.ADDRESS.zip}
                </p>
              </div>

              <div className="flex flex-col items-center gap-2">
                <Phone className="mb-2" size={24} />
                <p className="font-medium">Telefone</p>
                <a href={CONTACT.WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                  {CONTACT.PHONE_DISPLAY}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
