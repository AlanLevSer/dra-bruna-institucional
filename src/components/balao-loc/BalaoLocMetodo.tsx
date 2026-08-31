import { Salad, HeartPulse, Dumbbell, Brain } from "lucide-react";

const PILARES = [
  { icon: HeartPulse, title: "Saúde Metabólica & Regenerativa" },
  { icon: Salad, title: "Nutrição Inteligente" },
  { icon: Dumbbell, title: "Corpo em Movimento" },
  { icon: Brain, title: "Mente & Comportamento" },
];

export const BalaoLocMetodo = () => (
  <section id="metodo-levser" className="bg-muted/40">
    <div className="mx-auto w-full max-w-3xl px-5 py-12 md:py-16">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary mb-3">
        Método LevSer
      </p>
      <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground leading-snug">
        Mais do que colocar um balão
      </h2>

      <div className="mt-5 space-y-4 text-base text-muted-foreground leading-relaxed">
        <p>
          Na LevSer, o balão é uma ferramenta dentro do tratamento — não o tratamento inteiro.
        </p>
        <p>
          Quando essa rota é indicada, a intervenção é integrada ao Método LevSer, conectando
          direção clínica e indicadores aos quatro pilares do cuidado.
        </p>
      </div>

      <ul className="mt-7 grid grid-cols-2 gap-3">
        {PILARES.map(({ icon: Icon, title }) => (
          <li
            key={title}
            className="flex items-center gap-3 rounded-xl border border-border bg-background p-4"
          >
            <Icon className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
            <span className="text-sm font-medium text-foreground leading-snug">{title}</span>
          </li>
        ))}
      </ul>

      <p className="mt-7 rounded-xl border border-primary/40 bg-primary/5 px-5 py-4 font-serif text-lg font-semibold text-foreground leading-snug">
        A intervenção é ferramenta. A jornada é o tratamento.
      </p>

      <p className="mt-5 text-base text-muted-foreground leading-relaxed">
        O objetivo não é apenas chegar ao implante. É usar essa fase de forma estruturada e
        preparar o que vem depois.
      </p>
    </div>
  </section>
);
