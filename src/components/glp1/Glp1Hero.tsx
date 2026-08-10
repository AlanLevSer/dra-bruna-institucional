import { Stethoscope, Users, LineChart, MapPin } from "lucide-react";
import { Glp1Cta } from "./Glp1Cta";

const TRUST_ITEMS = [
  { icon: Stethoscope, label: "Tratamento médico" },
  { icon: Users, label: "Equipe interdisciplinar" },
  { icon: LineChart, label: "Acompanhamento contínuo" },
  { icon: MapPin, label: "São Paulo · Jardim Paulista" },
];

export const Glp1Hero = () => (
  <header className="bg-background border-b border-border/60">
    <div className="mx-auto w-full max-w-3xl px-5 pt-12 pb-10 md:pt-20 md:pb-16">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary mb-5">
        LevSer · Tratamento médico do emagrecimento
      </p>

      <h1 className="font-serif text-3xl md:text-5xl font-bold leading-[1.15] text-foreground">
        Seu tratamento para emagrecer começa antes da escolha da ferramenta.
      </h1>

      <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">
        Na LevSer, o primeiro passo é entender seu histórico, seus objetivos e seu momento para
        definir uma estratégia de tratamento com direção médica, acompanhamento e cuidado
        interdisciplinar.
      </p>

      <Glp1Cta
        ctaSource="hero_primary"
        className="mt-8"
        microcopy="Comece deixando seus dados. Nossa conversa continua pelo WhatsApp."
      />

      <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-border/60 pt-6">
        {TRUST_ITEMS.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
            <span>{label}</span>
          </li>
        ))}
      </ul>
    </div>
  </header>
);
