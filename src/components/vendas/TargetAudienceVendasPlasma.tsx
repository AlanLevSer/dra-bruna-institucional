import { Button } from "@/components/ui/button";
import { GrafismoDecor } from "@/components/GrafismoDecor";
import { RefreshCcw, Maximize2, Scale, Shield } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { openLeadChat } from "@/lib/leadChat";
import { CONTACT } from "@/lib/constants";

export const TargetAudienceVendasPlasma = () => {
  const profiles = [
    { 
      icon: RefreshCcw, 
      title: "Reganho após bariátrica", 
      description: "Recuperou parte do peso perdido após bypass gástrico." 
    },
    { 
      icon: Maximize2, 
      title: "Dilatação da anastomose", 
      description: "Emenda entre estômago e intestino dilatou, aumentando a capacidade gástrica." 
    },
    { 
      icon: Scale, 
      title: "Expansão gástrica pós-balão", 
      description: "Estômago voltou a dilatar após retirada do balão intragástrico." 
    },
    { 
      icon: Shield, 
      title: "Quer evitar nova cirurgia", 
      description: "Busca alternativa menos invasiva do que revisão bariátrica." 
    },
  ];

  const handleWhatsApp = () => {
    trackEvent("cta_clicked", { source: "target_audience_plasma" });
    openLeadChat("target_audience_plasma", CONTACT.WHATSAPP_PLASMA_VENDAS);
  };

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <GrafismoDecor variant="background" position="top-left" size="lg" opacity={0.1} />
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Este tratamento é para você?
          </h2>
          <p className="text-lg text-muted-foreground">
            O Plasma de Argônio é indicado especialmente para quem passou por cirurgia bariátrica e enfrentou reganho de peso.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
          {profiles.map((profile, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-6 shadow-elegant hover:shadow-hover transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <profile.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">{profile.title}</h3>
                  <p className="text-sm text-muted-foreground">{profile.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-primary/5 to-muted rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4">
            Se identificou com algum desses perfis?
          </h3>
          <p className="text-lg text-muted-foreground mb-6">
            Nossa equipe especializada está pronta para ajudar você a recuperar o controle do seu peso de forma segura e eficaz.
          </p>
          <Button 
            size="lg" 
            className="text-lg h-14 px-8 bg-gradient-premium shadow-elegant hover:shadow-hover"
            onClick={handleWhatsApp}
          >
            Falar com Nossa Equipe
          </Button>
        </div>
      </div>
    </section>
  );
};
