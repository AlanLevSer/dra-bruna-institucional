const ETAPAS = [
  {
    num: "01",
    title: "Avaliação Estratégica",
    body: "Entendemos seu caso e verificamos se a Rota com Balão é adequada para o seu momento.",
  },
  {
    num: "02",
    title: "Preparação",
    body: "Organizamos orientações e próximos passos necessários para iniciar a rota.",
  },
  {
    num: "03",
    title: "Implante e adaptação",
    body: "O balão entra como ferramenta temporária e começa a fase de adaptação.",
  },
  {
    num: "04",
    title: "Evolução",
    body: "Indicadores e pontos de cuidado orientam a evolução da estratégia ao longo da rota.",
  },
  {
    num: "05",
    title: "Retirada e continuidade",
    body: "A retirada é preparada antes de acontecer, junto com a definição dos próximos passos.",
  },
];

export const BalaoLocCaminho = () => (
  <section id="seu-caminho" className="bg-muted/40">
    <div className="mx-auto w-full max-w-3xl px-5 py-12 md:py-16">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary mb-3">
        Seu Caminho
      </p>
      <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground leading-snug">
        Do primeiro passo à continuidade
      </h2>

      <ol className="mt-8 relative space-y-4 border-l-2 border-border pl-6">
        {ETAPAS.map(({ num, title, body }) => (
          <li key={num} className="relative">
            <span
              className="absolute -left-[1.625rem] top-3.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-primary bg-background"
              aria-hidden="true"
            />
            <div className="rounded-xl border border-border bg-background p-4">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-xs font-semibold text-primary">{num}</span>
                <h3 className="font-semibold text-foreground text-sm leading-snug">{title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
            </div>
          </li>
        ))}
      </ol>

      <p className="mt-7 rounded-xl border border-primary/40 bg-primary/5 px-5 py-4 font-serif text-base font-semibold text-foreground leading-snug">
        O balão é temporário. A estratégia não termina com ele.
      </p>
    </div>
  </section>
);
