import { Stethoscope, Users, LineChart, MapPin } from "lucide-react";
import { Glp1Cta } from "./Glp1Cta";
import watermark from "@/assets/transformation-confidence.avif";

const TRUST_ITEMS = [
  { icon: Stethoscope, label: "Tratamento médico" },
  { icon: Users, label: "Equipe interdisciplinar" },
  { icon: LineChart, label: "Acompanhamento contínuo" },
  { icon: MapPin, label: "São Paulo · Jardim Paulista" },
];

export const Glp1Hero = () => (
  <header className="relative overflow-hidden bg-background border-b border-border/60 min-h-[560px] md:min-h-[640px] flex items-center">
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 select-none">
      <img
        src={watermark}
        alt=""
        loading="eager"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-[65%_center] md:object-[72%_center] opacity-60 md:opacity-40 saturate-[0.85]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/55 to-background/35 md:bg-gradient-to-r md:from-background md:via-background/85 md:to-background/25" />
    </div>

    <div className="relative z-10 mx-auto w-full max-w-3xl px-5 pt-12 pb-10 md:pt-20 md:pb-16">


      <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary mb-5">
        LevSer · Tratamento médico do emagrecimento
      </p>

      <h1 className="font-serif text-3xl md:text-5xl font-bold leading-[1.15] text-foreground">
        Tratamento médico para emagrecer com estratégia, acompanhamento e direção clínica.
      </h1>

      <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">
        Você não precisa chegar sabendo qual ferramenta usar. Na LevSer, começamos entendendo seu
        histórico, saúde metabólica, composição corporal, rotina e objetivos para definir uma
        estratégia e acompanhar sua evolução.
      </p>

      <p className="mt-6 border-l-2 border-primary pl-4 font-serif text-lg md:text-xl font-semibold leading-snug text-foreground">
        A medicação, quando indicada, é uma ferramenta.
        <br />
        A jornada é o tratamento.
      </p>

      <Glp1Cta
        ctaSource="hero_primary"
        label="Quero entender qual tratamento faz sentido para mim"
        className="mt-8"
        microcopy="Deixe seus dados e continue a conversa pelo WhatsApp."
      />

      <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-border/60 pt-6">
        {TRUST_ITEMS.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
            <span>{label}</span>
          </li>
        ))}
      </ul>

      <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
        Tratamentos com GLP-1/GIP podem fazer parte da estratégia quando indicados.
      </p>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        Direção médica: Dra. Bruna Durelli · Jardim Paulista, São Paulo
      </p>
    </div>
  </header>
);
