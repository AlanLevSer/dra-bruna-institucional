import { useEffect, useRef, useState } from "react";
import { CONTACT } from "@/lib/constants";
import { Glp1Cta } from "@/components/glp1/Glp1Cta";

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
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary mb-3">
          LevSer · Jardim Paulista
        </p>
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground leading-snug">
          Conheça a estrutura da LevSer em São Paulo
        </h2>
        <p className="mt-3 text-base text-muted-foreground leading-relaxed">
          Veja o espaço onde acontecem diferentes etapas do cuidado LevSer.
        </p>

        <div className="mt-7 flex justify-center">
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
            className="w-full max-w-[380px] rounded-2xl border border-border bg-background object-cover aspect-[9/16]"
          />
        </div>

        <p className="mt-4 text-center text-sm text-muted-foreground leading-relaxed">
          {CONTACT.ADDRESS.street} · {CONTACT.ADDRESS.neighborhood},{" "}
          {CONTACT.ADDRESS.city} - {CONTACT.ADDRESS.state}
        </p>

        <Glp1Cta
          ctaSource="espaco_section"
          label={CTA_LABEL}
          className="mt-8"
        />
      </div>
    </section>
  );
};
