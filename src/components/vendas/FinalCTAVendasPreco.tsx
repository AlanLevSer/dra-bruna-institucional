import { Button } from "@/components/ui/button";
import { GrafismoDecor } from "@/components/GrafismoDecor";
import { Heart, Sparkles, MapPin, Mail, Clock, Instagram } from "lucide-react";
import { CONTACT } from "@/lib/constants";
import { openLeadChat } from "@/lib/leadChat";
import { trackEvent, trackPricingCTAClick } from "@/lib/analytics";

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0 mt-1 fill-current" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const FinalCTAVendasPreco = () => {
  const handleWhatsApp = () => {
    const scrollDepth = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );

    trackPricingCTAClick({
      source: 'final_cta_preco',
      section: 'final_cta',
      position: 'bottom',
      scroll_depth: scrollDepth,
    });

    openLeadChat('final_cta_preco', CONTACT.WHATSAPP_BALAO_VENDAS, {
      section: 'final_cta',
      position: 'bottom',
      scroll_depth: scrollDepth,
    });
  };

  const handleWhatsAppPhoneRow = () => {
    trackEvent("whatsapp_phone_row", {
      cta_source: "whatsapp_phone_row",
      section: "final_cta",
      page_path: window.location.pathname,
    });
    openLeadChat("whatsapp_phone_row", CONTACT.WHATSAPP_BALAO_VENDAS);
  };

  return (
    <section className="relative py-16 md:py-24 bg-gradient-premium text-white overflow-hidden">
      <GrafismoDecor variant="floating" position="top-right" size="xl" opacity={0.15} color="accent" />
      <GrafismoDecor variant="floating" position="bottom-left" size="lg" opacity={0.1} color="secondary" rotate={180} />
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          {/* Ícones decorativos */}
          <div className="flex justify-center gap-6">
            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <Heart className="w-10 h-10" />
            </div>
            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <Sparkles className="w-10 h-10" />
            </div>
          </div>

          {/* Título */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold">
            O preço passa... O resultado fica!
          </h2>

          {/* Mensagem principal */}
          <p className="text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto">
            Em 6 meses, você pode olhar no espelho e ver uma nova versão de si mesma. A decisão está nas suas mãos, e ela cabe no seu bolso.
          </p>

          {/* CTA principal */}
          <div className="space-y-4">
            <Button
              size="lg"
              onClick={handleWhatsApp}
              className="bg-card text-foreground hover:bg-card/90 shadow-elegant hover:shadow-hover hover:scale-105 transition-all text-base px-8 py-6 h-auto"
            >
              Consultar Valores
            </Button>
            <p className="text-sm text-white/80">
              Fale com a equipe e descubra como investir na sua transformação com segurança e condições especiais.
            </p>
          </div>

          {/* Seção de contato */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 space-y-6">
            <h3 className="text-2xl font-serif font-bold">
              Localização e Contato
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium">Localização</p>
                  <p className="text-sm text-white/80">Av. Brasil, 173 – Jardim Paulista, São Paulo (SP)</p>
                </div>
              </div>
              
              <button
                type="button"
                onClick={handleWhatsAppPhoneRow}
                className="flex items-start gap-3 text-left w-full hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded"
                aria-label="Falar pelo WhatsApp"
              >
                <WhatsAppIcon />
                <div>
                  <p className="font-medium">Falar pelo WhatsApp</p>
                  <p className="text-sm text-white/60">(11) 99702-3024</p>
                </div>
              </button>
              
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium">E-mail</p>
                  <p className="text-sm text-white/80">contato@brunadurelli.com.br</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium">Horário</p>
                  <p className="text-sm text-white/80">Segunda a Sexta, das 8h às 18h</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 pt-4">
              <Instagram className="w-5 h-5" />
              <a 
                href="https://instagram.com/dra.brunadurelli" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:underline"
              >
                @dra.brunadurelli
              </a>
            </div>
          </div>

          {/* Texto de apoio final */}
          <p className="text-lg font-medium">
            Transforme sua vida agora. Você merece e pode!
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalCTAVendasPreco;
