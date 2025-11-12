import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Award, Clock, PlayCircle, TrendingDown, XCircle, Zap } from "lucide-react";

import draBrunaHero from "@/assets/dra-bruna-hero.avif";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { TestimonialsGoogle } from "@/components/TestimonialsGoogle";
import { TransformacoesPressel } from "@/components/pressel/TransformacoesPressel";
import { trackEvent } from "@/lib/analytics";

const PAIN_SIGNALS = [
  { icon: XCircle, text: "fez dieta e o peso voltou;" },
  { icon: TrendingDown, text: "treinou e o corpo pareceu \"não responder\";" },
  { icon: Zap, text: "vive mais cansado(a) e inflamado(a);" },
  { icon: Clock, text: "sente que está envelhecendo mais rápido…" },
];

export default function MetabolismoQuebrado() {
  const [patientCount, setPatientCount] = useState(0);
  const [weightCount, setWeightCount] = useState(0);

  useEffect(() => {
    trackEvent("page_view", {
      page_type: "pressel",
      page_path: "/metabolismo-quebrado",
      page_title: "Por que você emagrece e volta a engordar",
    });

    try {
      window.fbq?.("track", "PageView");
    } catch (error) {
      void error;
    }
  }, []);

  useEffect(() => {
    const targetPatients = 3000;
    const targetWeight = 60000;
    const duration = 1500;
    const start = performance.now();
    let frame: number;

    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setPatientCount(Math.round(progress * targetPatients));
      setWeightCount(Math.round(progress * targetWeight));
      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  const handleCTAClick = () => {
    trackEvent("cta_clicked", {
      source: "metabolismo_quebrado",
      cta_type: "assistir_video",
      position: "hero",
    });
  };

  const formatNumber = (value: number) => value.toLocaleString("pt-BR");

  return (
    <>
      <SEOHead
        data={{
          title: "Por que você emagrece e volta a engordar? | Dra. Bruna Durelli",
          description:
            "Por que você emagrece e mesmo assim volta a engordar? A Dra. Bruna mostra como um programa integrado resolve dietas e treinos isolados.",
          canonical: "https://www.brunadurelli.com.br/metabolismo-quebrado",
          keywords: "metabolismo quebrado, efeito sanfona, perder peso, programa integrado, Dra. Bruna Durelli",
        }}
      />

      <div className="min-h-screen bg-background">
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[1.1fr,0.9fr] items-center">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                  <Award className="h-4 w-4 text-primary" />
                  <span className="text-xs font-medium text-primary">Especialista em redução da obesidade</span>
                </div>
                <h1 className="font-serif font-bold text-3xl md:text-5xl lg:text-6xl text-foreground mb-6 leading-tight">
                  Por que você emagrece… e mesmo assim volta a engordar?
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                  Não é falta de força de vontade — é falta de um <strong className="text-foreground">programa integrado</strong>.
                </p>
                <div className="bg-gradient-to-br from-muted/50 to-muted/30 rounded-2xl p-6 md:p-8 border border-border/50 shadow-elegant space-y-4 text-left">
                  <p className="text-base md:text-lg text-foreground leading-relaxed">
                    A <strong>Dra. Bruna Durelli</strong>, médica especialista em obesidade, metabolismo e longevidade, explica por que
                    dietas, treinos e até procedimentos cirúrgicos <strong>não duram quando são feitos de forma isolada</strong> — e como um
                    tratamento integrado resolve esse problema.
                  </p>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <figure className="relative w-full max-w-sm pb-16">
                  <div className="absolute inset-0 bg-primary/20 blur-3xl opacity-60 animate-pulse" aria-hidden="true" />
                  <img
                    src={draBrunaHero}
                    alt="Dra. Bruna Durelli na clínica"
                    className="relative w-full rounded-[32px] border border-border/60 shadow-elegant object-cover"
                    loading="lazy"
                  />
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[92%] sm:w-4/5">
                    <div className="bg-card border border-border/70 rounded-[28px] shadow-elegant p-5">
                      <div className="grid grid-cols-1 divide-y divide-border/60 sm:grid-cols-2 sm:divide-y-0 sm:divide-x">
                        <div className="py-4 px-3 text-center">
                          <p className="text-xs uppercase tracking-wide text-muted-foreground">Vidas transformadas</p>
                          <p className="text-2xl font-serif text-primary mt-1">+{formatNumber(patientCount)}</p>
                          <p className="text-sm text-muted-foreground">pacientes</p>
                        </div>
                        <div className="py-4 px-3 text-center">
                          <p className="text-xs uppercase tracking-wide text-muted-foreground">Quilos eliminados</p>
                          <p className="text-2xl font-serif text-primary mt-1">+{formatNumber(weightCount)} kg</p>
                          <p className="text-sm text-muted-foreground">
                            E hoje já se foram mais 15 kg. Você pode ser a próxima.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </figure>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-6">
              <h2 className="font-serif font-bold text-2xl md:text-4xl text-foreground text-center">
                Se alguma dessas coisas já aconteceu com você:
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {PAIN_SIGNALS.map((signal) => (
                  <div
                    key={signal.text}
                    className="flex items-start gap-3 bg-background rounded-xl p-4 border border-border/50 shadow-sm"
                  >
                    <signal.icon className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <p className="text-foreground">{signal.text}</p>
                  </div>
                ))}
              </div>
              <div className="bg-card/80 border border-border/60 rounded-2xl p-6 md:p-8 shadow-elegant text-center">
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  …isso não é “falta de disciplina”. Na maioria dos casos é <strong>metabolismo desregulado + cada profissional puxando pra um lado</strong>.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto space-y-6">
              <div className="bg-card border border-border/60 rounded-2xl p-6 md:p-8 shadow-elegant">
                <h3 className="text-2xl font-serif font-semibold text-foreground mb-3">O que o mercado entrega?</h3>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  Nutri de um lado, treino de outro, às vezes um procedimento cirúrgico… mas ninguém coordena toda a
                  estratégia. Você melhora um pedaço e perde no outro. E o corpo volta sempre ao peso que não te faz bem.
                </p>
              </div>
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 md:p-8 shadow-elegant space-y-4">
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  No vídeo a seguir, a Dra. Bruna mostra o Programa LevSer, o protocolo médico que ela desenvolveu e usa
                  na clínica da Av. Brasil para fazer pacientes emagrecerem com saúde, manterem o resultado e ainda recuperar energia e aparência.
                </p>
                <Button
                  size="lg"
                  className="w-full md:w-auto px-8 py-6 text-base shadow-elegant hover:shadow-hover inline-flex items-center gap-2"
                  onClick={handleCTAClick}
                  asChild
                >
                  <Link to="/vsl-metodo-levser">
                    <PlayCircle className="h-5 w-5" />
                    Quero assistir ao vídeo da Dra. Bruna
                  </Link>
                </Button>
                <p className="text-sm text-muted-foreground text-center">
                  +3.000 pacientes acompanhados · protocolo médico · clínica na Av. Brasil (SP)
                </p>
              </div>
            </div>
          </div>
        </section>

        <TransformacoesPressel />

        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <TestimonialsGoogle
              title="Antes e Depois"
              subtitle="Resultados reais de quem passou pelo Programa LevSer"
              className="bg-background rounded-2xl border border-border/60 shadow-elegant"
            />
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
