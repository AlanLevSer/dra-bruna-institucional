import { useEffect, useRef, useState } from "react";
import { CONTACT } from "@/lib/constants";
import { Glp1Cta } from "@/components/glp1/Glp1Cta";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const VIDEO_SRC = "/media/levser-estrutura.mp4";
const POSTER_SRC = "/media/levser-estrutura-poster.webp";
const CTA_LABEL = "Quero avaliar se o balão faz sentido para mim";

export const BalaoLocEspaco = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !inView) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.src = VIDEO_SRC;
    el.load();
    if (!reduced) {
      void el.play().catch(() => {});
    }
  }, [inView]);

  return (
    <section id="estrutura-levser" className="bg-background">
      <div className="mx-auto w-full max-w-3xl px-5 py-12 md:py-16">
        <ScrollReveal>
          <p className="text-xs font-medium tracking-[0.08em] text-primary mb-3">
            LevSer · Jardim Paulista
          </p>
          <h2 className="text-2xl md:text-3xl font-normal text-foreground leading-snug">
            Conheça a estrutura da LevSer em São Paulo
          </h2>
          <p className="mt-3 text-base text-muted-foreground leading-relaxed">
            Veja o espaço onde acontecem diferentes etapas do cuidado LevSer.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={100} className="mt-7 flex justify-center">
          <video
            ref={videoRef}
            poster={POSTER_SRC}
            preload="none"
            muted
            loop
            playsInline
            controls
            width={1080}
            height={1920}
            aria-label="Vídeo do espaço físico da LevSer no Jardim Paulista"
            className="w-full max-w-[460px] md:max-w-[520px] rounded-xl border border-border/60 bg-background object-cover aspect-[9/16]"
          />
        </ScrollReveal>

        <p className="mt-4 text-center text-sm text-muted-foreground leading-relaxed">
          {CONTACT.ADDRESS.street} · {CONTACT.ADDRESS.neighborhood},{" "}
          {CONTACT.ADDRESS.city} - {CONTACT.ADDRESS.state}
        </p>

        <ScrollReveal delay={80} className="mt-8">
          <Glp1Cta
            ctaSource="espaco_section"
            label={CTA_LABEL}
          />
        </ScrollReveal>
      </div>
    </section>
  );
};
