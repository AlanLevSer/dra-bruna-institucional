import { Button } from "@/components/ui/button";
import { GrafismoDecor } from "@/components/GrafismoDecor";
import { Heart, Sparkles, MapPin, Phone, Mail, Clock, Instagram } from "lucide-react";
import { CONTACT } from "@/lib/constants";
import { openLeadChat } from "@/lib/leadChat";
import { trackPricingCTAClick } from "@/lib/analytics";

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
              
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium">WhatsApp</p>
                  <p className="text-sm text-white/80">(11) 99702-3024</p>
                </div>
              </div>
              
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
