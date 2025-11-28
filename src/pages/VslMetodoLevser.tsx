import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Award, Brain, PlayCircle, Sparkles, Utensils, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { LeadChatWidgetVSL } from "@/components/LeadChatWidgetVSL";
import { SEOHead } from "@/components/SEOHead";
import { TestimonialsGoogle } from "@/components/TestimonialsGoogle";
import { trackEvent } from "@/lib/analytics";
import { initTracking, trackCustomEvent } from "@/lib/tracking";

const VIDEO_ID = "e3c81653-5d55-4c76-b63f-2af5546db4f6";
const CTA_UNLOCK_SECONDS = 370;
const VIDEO_PROGRESS_CHECKPOINTS = [30, 60, 120, 180, 240, 300, 360];

const pillars = [
  {
    title: "1. Nutrição Inteligente",
    description: "Alimentação possível, com saciedade e foco em longevidade.",
    icon: Utensils,
  },
  {
    title: "2. Corpo em Movimento",
    description: "Exercício pra acelerar metabolismo, não te exaurir.",
    icon: PlayCircle,
  },
  {
    title: "3. Saúde Metabólica & Regenerativa",
    description: "O segredo: nutrir e regenerar enquanto emagrece, pra não envelhecer.",
    icon: Sparkles,
  },
  {
    title: "4. Mente & Comportamento",
    description: "Trabalha gatilhos, ansiedade e fome emocional.",
    icon: Brain,
  },
];

const benefits = [
  "Pré-consulta médica completa com a Dra. Bruna Durelli",
  "Plano integrado LevSer (4 pilares) personalizado",
  "Acesso à equipe multidisciplinar (nutricionista, psicóloga, educador físico) em sincronia",
  "Acompanhamento e suporte para manter o resultado",
  "Comunidade de apoio no WhatsApp – incluso",
  "Tira-dúvidas com nutricionista pelo WhatsApp – incluso",
  "Bônus para as primeiras 15 pessoas da semana: sessão de Nutrição Celular",
];

export default function VslMetodoLevser() {
  const [showCTA, setShowCTA] = useState(false);
  const [showLeadChat, setShowLeadChat] = useState(false);
  const hasUnlockedRef = useRef(false);
  const videoProgressRef = useRef<{ lastSeconds: number; sentCheckpoints: Set<number> }>({
    lastSeconds: 0,
    sentCheckpoints: new Set<number>(),
  });

  useEffect(() => {
    // Initialize tracking
    initTracking();
    
    trackEvent("page_view", {
      page_type: "vsl",
      page_path: "/vsl-metodo-levser",
      page_title: "Vídeo: Método LevSer",
    });

    try {
      window.fbq?.("track", "PageView");
    } catch (error) {
      void error;
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
                trackCustomEvent("video_checkpoint", {
                  checkpoint_seconds: checkpoint,
                  page: "vsl_metodo_levser",
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
              trackCustomEvent("video_cta_unlocked", {
                time_seconds: time,
                page: "vsl_metodo_levser",
              });
            }
          });

          player.onEvent("play", () => {
            trackEvent("video_play", { source: "vsl_metodo_levser" });
            trackCustomEvent("video_play", { page: "vsl_metodo_levser" });
          });
          player.onEvent("complete", () => {
            trackEvent("video_complete", { source: "vsl_metodo_levser" });
            trackCustomEvent("video_complete", { page: "vsl_metodo_levser" });
          });
        }
      });
    };

    const timer = window.setTimeout(initPandaPlayer, 1000);
    return () => window.clearTimeout(timer);
  }, []);

  const handleCTAClick = () => {
    const scrollDepth = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100,
    );

    trackEvent("cta_clicked", {
      source: "vsl_metodo_levser",
      cta_type: "agendar_pre_consulta",
      position: "cta_section",
      scroll_depth: scrollDepth,
      video_watched_seconds: Math.round(videoProgressRef.current.lastSeconds),
    });
    
    trackCustomEvent("cta_click", {
      cta_type: "agendar_pre_consulta",
      scroll_depth: scrollDepth,
      video_watched_seconds: Math.round(videoProgressRef.current.lastSeconds),
      page: "vsl_metodo_levser",
    });

    setShowLeadChat(true);
  };

  return (
    <>
      <SEOHead
        data={{
          title: "Vídeo: Descubra o Método LevSer | Dra. Bruna Durelli",
          description:
            "Assista ao vídeo e entenda por que o seu corpo não está respondendo. Descubra o Programa LevSer: tratamento integrado para emagrecer com saúde e manter.",
          canonical: "https://www.brunadurelli.com.br/vsl-metodo-levser",
          keywords: "método LevSer, vídeo Dra. Bruna Durelli, emagrecimento integrado, pré-consulta",
        }}
      />

      <div className="min-h-screen bg-background">
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto space-y-6 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mx-auto">
                <Award className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium text-primary">CRM 124809 / RQE 57361</span>
              </div>
              <h1 className="font-serif font-bold text-3xl md:text-5xl text-foreground">
                Assista ao vídeo e entenda por que o seu corpo não está respondendo como deveria.
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                A Dra. Bruna vai mostrar que o verdadeiro inimigo não é falta de força de vontade, e sim metabolismo quebrado +
                tratamentos isolados — e como o Programa LevSer integra tudo em um só lugar.
              </p>
            </div>

            <div className="max-w-4xl mx-auto mt-10 mb-6">
              <div className="relative rounded-2xl overflow-hidden shadow-elegant border border-border/50 bg-black aspect-video">
                <iframe
                  id={`panda-${VIDEO_ID}`}
                  src={`https://player-vz-591feda4-ef7.tv.pandavideo.com.br/embed/?v=${VIDEO_ID}`}
                  width="720"
                  height="360"
                  style={{ border: "none" }}
                  allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture"
                  allowFullScreen
                  title="Vídeo Método LevSer"
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              {!showCTA && (
                <p className="text-sm text-muted-foreground text-center mt-3">
                  O botão <strong>"Quero agendar minha pré-consulta"</strong> aparece automaticamente após 06:10 de vídeo.
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="py-12 bg-background border-t border-border/50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <p className="font-serif font-semibold text-lg text-foreground">
                Dra. Bruna Durelli – CRM 124809 / RQE 57361
              </p>
              <p className="text-muted-foreground">
                Médica especialista em Obesidade, Nutrologia, Medicina Regenerativa e Endoscopia Digestiva. Criadora do Programa LevSer
                e sócia responsável pela clínica na Av. Brasil (SP).
              </p>
              <p className="text-sm font-semibold text-primary">+3.000 pacientes transformados.</p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif font-bold">Por que o LevSer funciona</h2>
              <p className="text-muted-foreground">
                O mercado entrega peças soltas. O LevSer entrega transformação integrada em 4 pilares:
              </p>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                {pillars.map((pillar) => (
                  <div key={pillar.title} className="bg-card rounded-2xl border border-border/60 shadow-elegant p-6 space-y-3">
                    <pillar.icon className="w-6 h-6 text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">{pillar.title}</h3>
                    <p className="text-sm text-muted-foreground">{pillar.description}</p>
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground">Assim você não só perde peso — você consegue manter.</p>
            </div>
          </div>
        </section>

        {showCTA && (
          <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto space-y-8 text-center">
                <div className="space-y-4">
                  <h3 className="text-3xl font-serif font-bold text-foreground">O que você recebe ao agendar</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-left">
                    {benefits.map((item) => (
                      <div key={item} className="bg-card border border-border/40 rounded-2xl p-4 shadow-elegant text-sm text-muted-foreground">
                        <span className="text-primary mr-2">✅</span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <Button
                  size="lg"
                  className="px-8 py-6 text-base shadow-elegant hover:shadow-hover"
                  onClick={handleCTAClick}
                >
                  Quero agendar minha pré-consulta
                </Button>
              </div>
            </div>
          </section>
        )}

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="bg-card rounded-2xl border border-border/60 shadow-elegant">
              <TestimonialsGoogle
                title="Avaliações 5 estrelas no Google"
                subtitle="Pacientes contam como foi passar pelo LevSer e trabalhar com a Dra. Bruna."
              />
            </div>
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
