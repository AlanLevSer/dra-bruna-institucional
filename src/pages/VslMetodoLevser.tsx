import { useEffect, useState } from "react";
import { Utensils, Activity, Sparkles, Brain, CheckCircle2, Award, Gift, PlayCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { LeadChatWidgetVSL } from "@/components/LeadChatWidgetVSL";
import { trackEvent } from "@/lib/analytics";
import { TestimonialsGoogle } from "@/components/TestimonialsGoogle";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const videoHighlights = [
  {
    title: "Por que seu corpo não responde",
    description: "A Dra. Bruna mostra sinais de metabolismo quebrado e como identificar se é o seu caso.",
  },
  {
    title: "Os 4 pilares do LevSer",
    description: "Nutrição, movimento, regeneração e mente trabalhando juntos para manter o peso.",
  },
  {
    title: "Quando liberar o CTA",
    description: "Aos 6:10 ela abre o caminho para falar com a equipe e receber seu protocolo integrado.",
  },
];

const faqItems = [
  {
    question: "Eu preciso já saber qual tratamento quero fazer?",
    answer:
      "Não. A pré-consulta serve justamente para entender seu momento, exames e rotina antes de indicar qualquer procedimento.",
  },
  {
    question: "Funciona mesmo se eu já tentei de tudo?",
    answer:
      "O Programa LevSer combina medicina metabólica, nutrição e comportamento. Muitos pacientes chegam após tentativas isoladas e conseguem manter o resultado quando combinam os 4 pilares.",
  },
  {
    question: "A equipe atende online ou presencial?",
    answer:
      "A avaliação médica é feita pela Dra. Bruna e pode ser iniciada online. Quando necessário, os procedimentos são realizados na clínica da Av. Brasil (SP).",
  },
];

export default function VslMetodoLevser() {
  const [showCTA, setShowCTA] = useState(false);
  const [showLeadChat, setShowLeadChat] = useState(false);

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
        const player = window.pandaplayer?.("panda-e3c81653-5d55-4c76-b63f-2af5546db4f6");

        if (player) {
          player.onEvent("timeupdate", (time: number) => {
            if (time >= 370 && !showCTA) {
              setShowCTA(true);
              trackEvent("video_cta_unlocked", {
                source: "vsl_metodo_levser",
                time_seconds: time,
              });
            }
          });

          player.onEvent("play", () => {
            trackEvent("video_play", { source: "vsl_metodo_levser" });
          });

          player.onEvent("25", () => {
            trackEvent("video_25", { source: "vsl_metodo_levser" });
          });

          player.onEvent("50", () => {
            trackEvent("video_50", { source: "vsl_metodo_levser" });
          });

          player.onEvent("75", () => {
            trackEvent("video_75", { source: "vsl_metodo_levser" });
          });

          player.onEvent("complete", () => {
            trackEvent("video_complete", { source: "vsl_metodo_levser" });
          });
        }
      });
    };

    const timer = setTimeout(initPandaPlayer, 1000);

    return () => clearTimeout(timer);
  }, [showCTA]);

  const handleCTAClick = () => {
    const scrollDepth = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );

    trackEvent("cta_clicked", {
      source: "vsl_metodo_levser",
      cta_type: "agendar_pre_consulta",
      position: "bottom",
      scroll_depth: scrollDepth,
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
            "metodo levser, programa levser, emagrecimento saudavel, tratamento integrado, dra bruna durelli",
        }}
      />

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
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
                  Assista ao video e entenda por que o seu corpo nao esta respondendo como deveria.
                </h1>

                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                  A Dra. Bruna vai mostrar que o verdadeiro inimigo nao e falta de forca de vontade, e sim
                  <strong className="text-foreground"> metabolismo quebrado + tratamentos isolados</strong> - e como o
                  <strong className="text-primary"> Programa LevSer</strong> integra tudo em um so lugar.
                </p>

                <div className="mt-6 flex flex-col items-center gap-3">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                    <PlayCircle className="w-4 h-4" />
                    Assista ate 6:10 para liberar o acesso
                  </span>
                  {!showCTA && (
                    <Button
                      variant="outline"
                      disabled
                      className="bg-muted/60 text-muted-foreground border-dashed"
                    >
                      CTA disponivel apos 06:10
                    </Button>
                  )}
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden shadow-elegant border border-border/50 bg-black aspect-video mb-8">
                <iframe
                  id="panda-e3c81653-5d55-4c76-b63f-2af5546db4f6"
                  src="https://player-vz-591feda4-ef7.tv.pandavideo.com.br/embed/?v=e3c81653-5d55-4c76-b63f-2af5546db4f6"
                  style={{ border: "none" }}
                  allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture"
                  allowFullScreen
                  fetchpriority="high"
                  title="VSL Metodo LevSer"
                  className="absolute inset-0 w-full h-full"
                />
              </div>

              <div className="bg-gradient-to-br from-muted/50 to-muted/30 rounded-xl p-6 border border-border/50 text-center">
                <p className="font-semibold text-foreground mb-2">Dra. Bruna Durelli - CRM 124809 / RQE 57361</p>
                <p className="text-sm text-muted-foreground">
                  Medica especialista em Obesidade, Nutrologia, Medicina Regenerativa e Endoscopia Digestiva. Criadora do Programa
                  LevSer e socia responsavel pela clinica na Av. Brasil (SP).
                </p>
                <p className="text-sm font-semibold text-primary mt-2">+3.000 pacientes transformados</p>
              </div>

              <div className="bg-card/70 border border-border/60 rounded-2xl p-6 md:p-8 shadow-elegant">
                <h3 className="text-xl md:text-2xl font-serif font-semibold text-foreground mb-4 text-center">
                  No video voce vai ver:
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {videoHighlights.map((item) => (
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
                O mercado entrega pecas soltas. O LevSer entrega transformacao integrada em
                <strong className="text-foreground"> 4 pilares:</strong>
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-background rounded-xl p-6 border border-border/50 shadow-sm hover:shadow-elegant transition-all">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-primary/10">
                      <Utensils className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">1. Nutricao Inteligente</h3>
                      <p className="text-muted-foreground">Alimentacao possivel, com saciedade e foco em longevidade.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-background rounded-xl p-6 border border-border/50 shadow-sm hover:shadow-elegant transition-all">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-primary/10">
                      <Activity className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">2. Corpo em Movimento</h3>
                      <p className="text-muted-foreground">Exercicio pra acelerar metabolismo, nao te exaurir.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-background rounded-xl p-6 border border-border/50 shadow-sm hover:shadow-elegant transition-all">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-primary/10">
                      <Sparkles className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">3. Saude Metabolica & Regenerativa</h3>
                      <p className="text-muted-foreground">O "segredo": nutrir e regenerar enquanto emagrece, pra nao envelhecer.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-background rounded-xl p-6 border border-border/50 shadow-sm hover:shadow-elegant transition-all">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-primary/10">
                      <Brain className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">4. Mente & Comportamento</h3>
                      <p className="text-muted-foreground">Trabalha gatilhos, ansiedade e fome emocional.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-6 border border-primary/20">
                <p className="text-lg font-semibold text-foreground">
                  Assim voce nao so perde peso - <span className="text-primary">voce consegue manter</span>.
                </p>
              </div>
            </div>
          </div>
        </section>

        <TestimonialsGoogle
          title="Avaliacoes 5 estrelas no Google"
          subtitle="Pacientes contam como foi passar pelo LevSer e trabalhar com a Dra. Bruna."
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
                    {[
                      "Pre-consulta medica completa com a Dra. Bruna Durelli",
                      "Plano integrado LevSer (4 pilares) personalizado",
                      "Acesso a equipe multidisciplinar (nutricionista, psicologa, educador fisico) em sincronia",
                      "Acompanhamento e suporte para manter o resultado",
                      "Comunidade de apoio no WhatsApp - incluso",
                      "Tira-duvidas com nutricionista pelo WhatsApp - incluso",
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                        <p className="text-foreground text-lg">{item}</p>
                      </div>
                    ))}

                    <div className="flex items-start gap-3 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-4 border border-primary/20">
                      <Gift className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <p className="text-foreground text-lg">
                        <strong>Bonus para as primeiras 15 pessoas da semana:</strong> sessao de Nutricao Celular
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <Button size="lg" onClick={handleCTAClick} className="text-lg px-8 py-6 shadow-elegant hover:shadow-hover transition-all">
                      Quero agendar minha pre-consulta
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
              <p className="text-muted-foreground mt-3">
                Respondemos as duvidas que mais seguram quem esta assistindo a VSL antes de liberar o chat.
              </p>
            </div>

            <Accordion type="single" collapsible className="max-w-3xl mx-auto">
              {faqItems.map((item, index) => (
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
