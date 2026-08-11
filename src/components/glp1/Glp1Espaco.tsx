import { useEffect, useRef, useState } from "react";
import { CONTACT } from "@/lib/constants";
import videoAsset from "@/assets/levser-estrutura.mp4.asset.json";
import posterAsset from "@/assets/levser-estrutura-poster.webp.asset.json";

export const Glp1Espaco = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
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
    el.src = videoAsset.url;
    el.load();
    if (!reduced) {
      void el.play().catch(() => {
        /* autoplay bloqueado: usuário usa os controles */
      });
    }
  }, [inView]);

  return (
    <section id="espaco" className="bg-muted/40">
      <div className="mx-auto w-full max-w-3xl px-5 py-12 md:py-16">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary mb-3">
          Nossa estrutura
        </p>
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground leading-snug">
          Conheça nosso espaço
        </h2>

        <div className="mt-6 flex justify-center">
          <video
            ref={videoRef}
            poster={posterAsset.url}
            preload="none"
            muted
            loop
            playsInline
            controls
            width={1080}
            height={1920}
            aria-label="Vídeo do espaço físico da LevSer no Jardim Paulista"
            className="w-full max-w-[420px] rounded-2xl border border-border bg-background object-cover aspect-[9/16]"
          />
        </div>

        <p className="mt-4 text-center text-sm text-muted-foreground leading-relaxed">
          {CONTACT.ADDRESS.street} · {CONTACT.ADDRESS.neighborhood},{" "}
          {CONTACT.ADDRESS.city} - {CONTACT.ADDRESS.state}
        </p>
      </div>
    </section>
  );
};
