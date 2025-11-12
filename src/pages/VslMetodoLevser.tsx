import { useEffect, useRef, useState } from "react";
import { Utensils, Activity, Sparkles, Brain, CheckCircle2, Award, Gift, PlayCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { LeadChatWidgetVSL } from "@/components/LeadChatWidgetVSL";
import { trackEvent } from "@/lib/analytics";
import { TestimonialsGoogle } from "@/components/TestimonialsGoogle";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const VIDEO_ID = "panda-e3c81653-5d55-4c76-b63f-2af5546db4f6";
const CTA_UNLOCK_SECONDS = 370;
const VIDEO_PROGRESS_CHECKPOINTS = [30, 60, 120, 180, 240, 300, 360];

const copy = {
  hero: {
    title:
      "Assista ao v\u00eddeo e entenda por que o seu corpo n\u00e3o est\u00e1 respondendo como deveria.",
    subtitle:
      "A Dra. Bruna vai mostrar que o verdadeiro inimigo n\u00e3o \u00e9 falta de for\u00e7a de vontade, e sim metabolismo quebrado + tratamentos isolados \u2014 e como o Programa LevSer integra tudo em um s\u00f3 lugar.",
  },
  highlights: [
    {
      title: "Por que seu corpo n\u00e3o responde",
      description:
        "A Dra. Bruna mostra os sinais de metabolismo quebrado e como saber se esse \u00e9 o seu caso.",
    },
    {
      title: "Os 4 pilares do LevSer",
      description:
        "Nutri\u00e7\u00e3o inteligente, movimento, sa\u00fade metab\u00f3lica e comportamento trabalhando juntos.",
    },
    {
      title: "Quando liberar o CTA",
      description:
        "Aos 6:10 ela abre o caminho para falar com a equipe e receber seu protocolo integrado.",
    },
  ],
  authority: {
    name: "Dra. Bruna Durelli \u2013 CRM 124809 / RQE 57361",
    description:
      "M\u00e9dica especialista em Obesidade, Nutrologia, Medicina Regenerativa e Endoscopia Digestiva. Criadora do Programa LevSer e s\u00f3cia respons\u00e1vel pela cl\u00ednica na Av. Brasil (SP).",
    stats: "+3.000 pacientes transformados",
  },
  pillarsIntro:
    "O mercado entrega pe\u00e7as soltas. O LevSer entrega transforma\u00e7\u00e3o integrada em 4 pilares:",
  pillars: [
    {
      title: "1. Nutri\u00e7\u00e3o Inteligente",
      description: "Alimenta\u00e7\u00e3o poss\u00edvel, com saciedade e foco em longevidade.",
      icon: Utensils,
    },
    {
      title: "2. Corpo em Movimento",
      description: "Exerc\u00edcio pra acelerar metabolismo, n\u00e3o te exaurir.",
      icon: Activity,
    },
    {
      title: "3. Sa\u00fade Metab\u00f3lica & Regenerativa",
      description: "O \"segredo\": nutrir e regenerar enquanto emagrece, pra n\u00e3o envelhecer.",
      icon: Sparkles,
    },
    {
      title: "4. Mente & Comportamento",
      description: "Trabalha gatilhos, ansiedade e fome emocional.",
      icon: Brain,
    },
  ],
  pillarsFooter: "Assim voc\u00ea n\u00e3o s\u00f3 perde peso \u2014 voc\u00ea consegue manter.",
  benefits: [
    "\u2705 Pr\u00e9-consulta m\u00e9dica completa com a Dra. Bruna Durelli",
    "\u2705 Plano integrado LevSer (4 pilares) personalizado",
    "\u2705 Acesso \u00e0 equipe multidisciplinar (nutricionista, psic\u00f3loga, educador f\u00edsico) em sincronia",
    "\u2705 Acompanhamento e suporte para manter o resultado",
    "\u2705 Comunidade de apoio no WhatsApp \u2013 incluso",
    "\u2705 Tira-d\u00favidas com nutricionista pelo WhatsApp \u2013 incluso",
  ],
  bonus: "\uD83C\uDF81 B\u00f4nus para as primeiras 15 pessoas da semana: sess\u00e3o de Nutri\u00e7\u00e3o Celular",
  testimonials: {
    title: "Avalia\u00e7\u00f5es 5 estrelas no Google",
    subtitle: "Pacientes contam como foi passar pelo LevSer e trabalhar com a Dra. Bruna.",
  },
  faqIntro:
    "Respondemos as duvidas que mais seguram quem esta assistindo ao video antes de liberar o chat.",
  faqItems: [
    {
      question: "Eu preciso j\u00e1 saber qual tratamento quero fazer?",
      answer:
        "N\u00e3o. A pr\u00e9-consulta serve justamente para entender seu momento, exames e rotina antes de indicar qualquer procedimento.",
    },
    {
      question: "Funciona mesmo se eu j\u00e1 tentei de tudo?",
      answer:
        "O Programa LevSer combina medicina metab\u00f3lica, nutri\u00e7\u00e3o e comportamento. Muitos pacientes chegam ap\u00f3s tentativas isoladas e s\u00f3 conseguem manter quando integram os 4 pilares.",
    },
    {
      question: "A equipe atende online ou presencial?",
      answer:
        "A avalia\u00e7\u00e3o m\u00e9dica \u00e9 feita pela Dra. Bruna e pode come\u00e7ar online. Procedimentos e exames acontecem na cl\u00ednica da Av. Brasil (SP) quando necess\u00e1rio.",
    },
  ],
  ctaLabel: "Quero agendar minha pr\u00e9-consulta",
};

export default function VslMetodoLevser() {
  const [showCTA, setShowCTA] = useState(false);
  const [showLeadChat, setShowLeadChat] = useState(false);
  const hasUnlockedRef = useRef(false);
  const videoProgressRef = useRef<{ lastSeconds: number; sentCheckpoints: Set<number> }>({
    lastSeconds: 0,
    sentCheckpoints: new Set<number>(),
  });

  useEffect(() => {
    trackEvent("page_view", {
      page_type: "vsl",
      page_path: "/vsl-metodo-levser",
      page_title: "Video: Metodo LevSer",
    });

    try {
      window.fbq?.("track", "PageView");
    } catch (e) {
      void e;
    }

    const initPandaPlayer = () => {
      if (!window.pandascripttag) {
        window.pandascripttag = [];
      }

      window.pandascripttag.push(() => {
        const player = window.pandaplayer?.(VIDEO_ID);

        if (player) {
          player.onEvent("timeupdate", (time: number) => {
            videoProgressRef.current.lastSeconds = time;

            for (const checkpoint of VIDEO_PROGRESS_CHECKPOINTS) {
              if (time >= checkpoint && !videoProgressRef.current.sentCheckpoints.has(checkpoint)) {
                videoProgressRef.current.sentCheckpoints.add(checkpoint);
                trackEvent("video_watch_checkpoint", {
                  source: "vsl_metodo_levser",
                  seconds: checkpoint,
                });
              }
            }

            if (!hasUnlockedRef.current && time >= CTA_UNLOCK_SECONDS) {
              hasUnlockedRef.current = true;
              setShowCTA(true);
              trackEvent("video_cta_unlocked", {
                source: "vsl_metodo_levser",
                time_seconds: time,
              });
            }
          });

          player.onEvent("play", () => trackEvent("video_play", { source: "vsl_metodo_levser" }));
          player.onEvent("25", () => trackEvent("video_25", { source: "vsl_metodo_levser" }));
          player.onEvent("50", () => trackEvent("video_50", { source: "vsl_metodo_levser" }));
          player.onEvent("75", () => trackEvent("video_75", { source: "vsl_metodo_levser" }));
          player.onEvent("complete", () => trackEvent("video_complete", { source: "vsl_metodo_levser" }));
        }
      });
    };

    const timer = setTimeout(initPandaPlayer, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleCTAClick = () => {
    const scrollDepth = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100,
    );

    trackEvent("cta_clicked", {
      source: "vsl_metodo_levser",
      cta_type: "agendar_pre_consulta",
      position: "bottom",
      scroll_depth: scrollDepth,
      video_watched_seconds: Math.round(videoProgressRef.current.lastSeconds),
    });

    setShowLeadChat(true);
  };

  return (
    <>
      <SEOHead
        data={{
          title: "Video: Descubra o Metodo LevSer | Dra. Bruna Durelli",
          description:
            "Assista ao video e entenda por que o seu corpo nao esta respondendo. Descubra o Programa LevSer: tratamento integrado para emagrecer com saude e manter.",
          canonical: "https://www.brunadurelli.com.br/vsl-metodo-levser",
          keywords:
            "metodo levser, programa levser, emagrecimento saudavel, tratamento integrado, Dra. Bruna Durelli",
        }}
      />

      <div className="min-h-screen bg-background">
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />

          <div className="container mx-auto px-4 relative">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                  <Award className="h-4 w-4 text-primary" />
                  <span className="text-xs font-medium text-primary">CRM 124809 / RQE 57361</span>
                </div>

                <h1 className="font-serif font-bold text-3xl md:text-5xl text-foreground mb-4 leading-tight">
                  {copy.hero.title}
                </h1>

                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                  {copy.hero.subtitle}
                </p>

                <div className="mt-6 flex flex-col items-center gap-3">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                    <PlayCircle className="w-4 h-4" />
                    Assista at\u00e9 6:10 para liberar o acesso
                  </span>
                  {!showCTA && (
                    <p className="text-sm text-muted-foreground">
                      O bot\u00e3o "{copy.ctaLabel}" aparece automaticamente ap\u00f3s 06:10 de v\u00eddeo.
                    </p>
                  )}
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden shadow-elegant border border-border/50 bg-black aspect-video mb-8">
                <iframe
                  id={VIDEO_ID}
                  src={`https://player-vz-591feda4-ef7.tv.pandavideo.com.br/embed/?v=${VIDEO_ID}`}
                  width="720"
                  height="360"
                  style={{ border: "none" }}
                  allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture"
                  allowFullScreen
                  fetchpriority="high"
                  title="Video Metodo LevSer"
                  className="absolute inset-0 w-full h-full"
                />
              </div>

              <div className="bg-gradient-to-br from-muted/50 to-muted/30 rounded-xl p-6 border border-border/50 text-center">
                <p className="font-semibold text-foreground mb-2">{copy.authority.name}</p>
                <p className="text-sm text-muted-foreground">{copy.authority.description}</p>
                <p className="text-sm font-semibold text-primary mt-2">{copy.authority.stats}</p>
              </div>

              <div className="bg-card/70 border border-border/60 rounded-2xl p-6 md:p-8 shadow-elegant mt-8">
                <h3 className="text-xl md:text-2xl font-serif font-semibold text-foreground mb-4 text-center">
                  No video voce vai ver:
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {copy.highlights.map((item) => (
                    <div key={item.title} className="p-4 rounded-xl bg-muted/30 h-full">
                      <p className="text-sm font-semibold text-primary mb-2">{item.title}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="font-serif font-bold text-2xl md:text-4xl text-foreground mb-4 text-center">
                Por que o LevSer funciona
              </h2>
              <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
                {copy.pillarsIntro}
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {copy.pillars.map((pillar) => {
                  const Icon = pillar.icon;
                  return (
                    <div
                      key={pillar.title}
                      className="bg-background rounded-xl p-6 border border-border/50 shadow-sm hover:shadow-elegant transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-full bg-primary/10">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-foreground mb-2">{pillar.title}</h3>
                          <p className="text-muted-foreground">{pillar.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 text-center bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-6 border border-primary/20">
                <p className="text-lg font-semibold text-foreground">{copy.pillarsFooter}</p>
              </div>
            </div>
          </div>
        </section>

        <TestimonialsGoogle
          title={copy.testimonials.title}
          subtitle={copy.testimonials.subtitle}
          reviewCount={6}
          cardVariant="minimal"
          autoplayDelay={4500}
          backgroundColor="bg-gradient-to-b from-background via-muted/20 to-background"
        />

        {showCTA && (
          <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-muted/30 animate-fade-in">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="bg-background rounded-2xl p-8 md:p-12 border border-border/50 shadow-elegant">
                  <h2 className="font-serif font-bold text-2xl md:text-4xl text-foreground mb-8 text-center">
                    O que voce recebe ao agendar
                  </h2>

                  <div className="space-y-4 mb-8">
                    {copy.benefits.map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                        <p className="text-foreground text-lg">{item}</p>
                      </div>
                    ))}

                    <div className="flex items-start gap-3 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-4 border border-primary/20">
                      <Gift className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <p className="text-foreground text-lg">{copy.bonus}</p>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <Button size="lg" onClick={handleCTAClick} className="text-lg px-8 py-6 shadow-elegant hover:shadow-hover transition-all">
                      {copy.ctaLabel}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-sm font-semibold">Perguntas frequentes</span>
              </div>
              <h3 className="text-3xl font-serif font-bold text-foreground">Antes de falar com a equipe</h3>
              <p className="text-muted-foreground mt-3">{copy.faqIntro}</p>
            </div>

            <Accordion type="single" collapsible className="max-w-3xl mx-auto">
              {copy.faqItems.map((item, index) => (
                <AccordionItem key={item.question} value={`faq-${index}`}>
                  <AccordionTrigger className="text-left text-base font-semibold text-foreground">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <Footer />
      </div>

      {showLeadChat && (
        <LeadChatWidgetVSL origin="vsl_metodo_levser" showFloatingButton={false} autoOpen />
      )}
    </>
  );
}




