import { Glp1Cta } from "@/components/glp1/Glp1Cta";

const CTA_LABEL = "Quero avaliar se o balão faz sentido para mim";

const PERGUNTAS = [
  {
    num: "01",
    title: "Como é colocado?",
    body: "A colocação é endoscópica. Antes do procedimento, a avaliação médica confirma a indicação e organiza a preparação necessária.",
  },
  {
    num: "02",
    title: "Qual opção faz sentido para mim?",
    body: "Você não precisa escolher sozinho. Existem modalidades com diferentes características e tempos de permanência. A definição depende da avaliação do seu caso e da estratégia terapêutica indicada.",
  },
  {
    num: "03",
    title: "E depois que o balão é colocado?",
    body: "O procedimento é apenas uma etapa. Adaptação, alimentação, composição corporal, movimento, comportamento e preparação para a retirada também entram na condução da rota.",
  },
];

export const BalaoLocEntenda = () => (
  <section id="entenda-o-balao" className="bg-background">
    <div className="mx-auto w-full max-w-3xl px-5 py-12 md:py-16">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary mb-3">
        Entenda o Balão
      </p>
      <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground leading-snug">
        Está pensando em colocar um balão? Comece por estas três respostas.
      </h2>

      <div className="mt-8 space-y-5">
        {PERGUNTAS.map(({ num, title, body }) => (
          <div
            key={num}
            className="flex gap-4 rounded-xl border border-border bg-background p-5"
          >
            <span
              className="flex-shrink-0 text-2xl font-serif font-bold text-primary/30 leading-none select-none"
              aria-hidden="true"
            >
              {num}
            </span>
            <div>
              <h3 className="font-semibold text-foreground leading-snug">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{body}</p>
            </div>
          </div>
        ))}
      </div>

      <Glp1Cta
        ctaSource="entenda_section"
        label={CTA_LABEL}
        className="mt-8"
      />
    </div>
  </section>
);
