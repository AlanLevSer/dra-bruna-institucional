import { Button } from "@/components/ui/button";
import { CONTACT } from "@/lib/constants";
import { Heart, Scale, Zap, Activity } from "lucide-react";

export const TargetAudienceVendas = () => {
  const profiles = [
    {
      icon: Heart,
      title: "Compulsão Alimentar",
      description: "Dificuldade em controlar a quantidade de comida",
      color: "bg-red-50 text-red-600",
    },
    {
      icon: Scale,
      title: "Efeito Sanfona",
      description: "Perde peso mas sempre volta tudo",
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: Zap,
      title: "Tentativas Frustradas",
      description: "Já tentou várias dietas sem sucesso",
      color: "bg-yellow-50 text-yellow-600",
    },
    {
      icon: Activity,
      title: "Fome Constante",
      description: "Sensação de fome o tempo todo",
      color: "bg-green-50 text-green-600",
    },
  ];

  const handleWhatsApp = () => {
    window.open(CONTACT.WHATSAPP_BALAO_VENDAS, "_blank");
  };

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
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
              className="bg-white rounded-2xl p-6 hover-lift shadow-md border border-border"
            >
              <div className={`w-12 h-12 rounded-full ${profile.color} flex items-center justify-center mb-4`}>
                <profile.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">{profile.title}</h3>
              <p className="text-sm text-muted-foreground">
                {profile.description}
              </p>
            </div>
          ))}
        </div>

        {/* Seção de Conexão Emocional */}
        <div className="bg-gradient-to-br from-primary/5 to-wellness-soft/30 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Você <span className="text-primary">Não Está Sozinha</span>
          </h3>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Sabemos como é difícil lutar contra o peso sozinha. Nossa equipe multidisciplinar 
            está preparada para te acompanhar em cada etapa da sua transformação, 
            com empatia, ciência e resultados comprovados.
          </p>
          <Button
            variant="hero"
            size="xl"
            onClick={handleWhatsApp}
          >
            Descobrir Como Posso Te Ajudar
          </Button>
        </div>
      </div>
    </section>
  );
};
