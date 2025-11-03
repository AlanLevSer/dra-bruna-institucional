import { Button } from "@/components/ui/button";
import { GrafismoDecor } from "@/components/GrafismoDecor";
import { Heart, Sparkles } from "lucide-react";
import { CONTACT } from "@/lib/constants";
import { openLeadChat } from "@/lib/leadChat";

const FinalCTAVendasB = () => {
  const handleWhatsApp = () => {
    openLeadChat('final_cta_vendas_b', CONTACT.WHATSAPP_BALAO_VENDAS);
  };

  return (
    <section className="relative py-16 md:py-24 bg-gradient-premium text-white overflow-hidden">
      <GrafismoDecor variant="background" position="top-left" size="lg" opacity={0.1} />
      <GrafismoDecor variant="background" position="bottom-right" size="xl" opacity={0.1} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <Heart className="w-10 h-10" />
              </div>
              <div className="absolute -top-2 -right-2">
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center animate-pulse">
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Headline */}
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-tight">
              A mudança que você quer começa com um passo...
            </h2>
            <div className="w-24 h-1 bg-white/30 mx-auto rounded-full" />
          </div>

          {/* Message */}
          <div className="space-y-6">
            <p className="text-lg md:text-xl opacity-95 leading-relaxed max-w-3xl mx-auto">
              Você não precisa enfrentar isso sozinha e nem tentar mais uma dieta que não funciona.
            </p>
            <p className="text-lg md:text-xl opacity-95 leading-relaxed max-w-3xl mx-auto">
              Com o Balão Intragástrico e o acompanhamento completo da Dra. Bruna Durelli, 
              é possível <strong>emagrecer com segurança, confiança e resultados que duram</strong>.
            </p>
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <Button
              size="lg"
              onClick={handleWhatsApp}
              className="bg-card text-foreground hover:bg-card/90 shadow-elegant hover:shadow-hover text-lg px-10 py-7 h-auto hover:scale-105 transition-all"
            >
              Agendar Avaliação
            </Button>
          </div>

          {/* Supporting Text */}
          <div className="pt-6">
            <p className="text-base opacity-90">
              ✨ Transforme sua vida agora. Você merece!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTAVendasB;
