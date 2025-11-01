import { Users, PartyPopper, Zap, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GrafismoDecor } from "@/components/GrafismoDecor";
import { CONTACT } from "@/lib/constants";
import { openLeadChat } from "@/lib/leadChat";

export const Comunidade = () => {
  const handleWhatsApp = () => {
    const message = "Olá, Dra. Bruna! Quero saber mais sobre a comunidade LevSer e como posso fazer parte.";
    openLeadChat("comunidade", `${CONTACT.WHATSAPP_URL.split('?')[0]}?text=${encodeURIComponent(message)}`);
  };

  const beneficios = [
    {
      icon: Users,
      title: "Apoio Real, Não Virtual",
      description:
        "Grupo exclusivo com pessoas que entendem seus desafios, sem julgamentos — só acolhimento e troca de experiências verdadeiras.",
    },
    {
      icon: PartyPopper,
      title: "Cada Vitória é Nossa",
      description:
        "Perdeu 2kg? Conseguiu subir escadas sem cansaço? Aqui, cada conquista sua é motivo de celebração para toda a comunidade.",
    },
    {
      icon: Zap,
      title: "Motivação que Não Para",
      description:
        "Dias difíceis vão acontecer. Mas aqui você encontra inspiração diária, histórias reais e o lembrete de que você não está só.",
    },
    {
      icon: Heart,
      title: "Amizades que Ficam",
      description:
        "Mais do que colegas de programa, você vai criar vínculos com pessoas que entendem sua jornada e vibram com seu sucesso.",
    },
  ];

  return (
    <section id="comunidade" className="relative py-16 md:py-24 bg-gradient-to-b from-background to-muted/30 overflow-hidden">
      <GrafismoDecor variant="background" position="top-left" size="xl" opacity={0.06} rotate={25} color="gray" />
      <GrafismoDecor variant="floating" position="bottom-right" size="lg" opacity={0.08} rotate={-15} color="gray" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <Badge variant="secondary" className="text-sm px-4 py-2 bg-primary/10 text-primary border-primary/20">
            Juntos somos mais fortes
          </Badge>
        </div>

        {/* Título e Subtítulo */}
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
            Você Não Está Sozinho(a) Nessa Jornada
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Na LevSer, somos uma comunidade que inspira, apoia e celebra cada vitória — individual ou coletiva
          </p>
        </div>

        {/* Parágrafo Principal */}
        <div className="max-w-4xl mx-auto mb-12">
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed text-center">
            Aqui, você não é só mais um número. Somos uma força contagiante que inspira e motiva cada pessoa a alcançar
            suas metas. Compartilhamos estratégias, celebramos vitórias uns dos outros e, principalmente, estamos lado a
            lado nos momentos difíceis. Cada conquista individual fortalece o grupo inteiro. Esse espírito de apoio mútuo
            cria um ambiente onde você se sente incentivado(a) a superar desafios, persistir e celebrar cada passo rumo a
            uma vida mais saudável. <strong className="text-foreground">Estamos juntos nessa jornada — porque, juntos, somos mais fortes e capazes de
            alcançar grandes feitos.</strong>
          </p>
        </div>

        {/* Grid de Benefícios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {beneficios.map((beneficio, index) => (
            <div key={index} className="relative group animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              {/* Glow background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Card */}
              <div className="relative bg-card/80 backdrop-blur-sm border border-primary/20 rounded-2xl p-6 shadow-elegant hover:shadow-hover hover:-translate-y-2 transition-all duration-500 h-full flex flex-col">
                {/* Icon circle */}
                <div className="relative w-14 h-14 mb-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full blur-md animate-glow-pulse" />
                  <div className="relative w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm border-2 border-primary/30 rounded-full flex items-center justify-center shadow-elegant">
                    <beneficio.icon className="w-7 h-7 text-primary" strokeWidth={1.5} />
                  </div>
                </div>

                <h3 className="text-lg font-serif font-bold text-foreground mb-2">{beneficio.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-grow">{beneficio.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button size="lg" onClick={handleWhatsApp} className="group shadow-elegant hover:shadow-hover transition-all">
            Fazer Parte da Comunidade LevSer
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

