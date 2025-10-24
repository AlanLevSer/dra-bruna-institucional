import { Button } from "@/components/ui/button";
import { CONTACT } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import { GrafismoDecor } from "@/components/GrafismoDecor";
import { Heart, Scale, Zap, Activity } from "lucide-react";

export const TargetAudienceVendas = () => {
  const profiles = [
    {
      icon: Heart,
      title: "Compulsão Alimentar",
      description: "Dificuldade em controlar a quantidade de comida",
    },
    {
      icon: Scale,
      title: "Efeito Sanfona",
      description: "Perde peso mas sempre volta tudo",
    },
    {
      icon: Zap,
      title: "Tentativas Frustradas",
      description: "Já tentou várias dietas sem sucesso",
    },
    {
      icon: Activity,
      title: "Fome Constante",
      description: "Sensação de fome o tempo todo",
    },
  ];

  const handleWhatsApp = () => {
    try {
      trackEvent('cta_whatsapp_click', {
        location: 'target_audience_vendas',
        path: window.location.pathname,
      });
    } catch {}
    window.open(CONTACT.WHATSAPP_BALAO_VENDAS, "_blank");
  };

  return (
    <section className="relative py-16 md:py-20 bg-background overflow-hidden">
      <GrafismoDecor variant="background" position="top-left" size="md" opacity={0.18} />
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Este Tratamento é Para Você?
          </h2>
          <p className="text-lg text-muted-foreground">
            Milhares de pessoas como você já transformaram suas vidas. Identifique-se com algum destes perfis:
          </p>
        </div>

        {/* Grid de Perfis */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {profiles.map((profile, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-6 shadow-elegant hover:shadow-hover hover:-translate-y-1 transition-all border border-border/50"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <profile.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-base font-semibold mb-2">{profile.title}</h3>
              <p className="text-sm text-muted-foreground">
                {profile.description}
              </p>
            </div>
          ))}
        </div>

        {/* Seção de Conexão Emocional */}
        <div className="bg-gradient-to-br from-primary/5 to-muted/30 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4">
            Você Não Está Sozinha Nessa Jornada
          </h3>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Sabemos como é difícil lutar contra o peso sozinha. Nossa equipe multidisciplinar 
            está preparada para te acompanhar em cada etapa da sua transformação, 
            com empatia, ciência e resultados comprovados.
          </p>
          <Button
            size="lg"
            onClick={handleWhatsApp}
            className="bg-gradient-premium hover:opacity-90 text-white shadow-elegant"
          >
            Falar com Nossa Equipe
          </Button>
        </div>
      </div>
    </section>
  );
};
