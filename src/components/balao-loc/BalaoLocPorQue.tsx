const BLOCOS = [
  {
    title: "Direção antes da ferramenta",
    body: "Você pode chegar procurando o balão. A decisão sobre a rota começa pela avaliação do seu caso.",
  },
  {
    title: "Método durante a rota",
    body: "Quando indicado, o balão é integrado a uma estratégia que conecta os pilares LevSer, indicadores e pontos de cuidado.",
  },
  {
    title: "Continuidade antes da retirada",
    body: "O próximo passo começa a ser construído antes de o balão sair, preservando a história e a evolução ao longo da rota.",
  },
];

export const BalaoLocPorQue = () => (
  <section id="por-que-levser" className="bg-background">
    <div className="mx-auto w-full max-w-3xl px-5 py-12 md:py-16">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary mb-3">
        Por que LevSer
      </p>
      <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground leading-snug">
        O diferencial está em como organizamos o que acontece antes, durante e depois da ferramenta
      </h2>

      <div className="mt-8 space-y-4">
        {BLOCOS.map(({ title, body }, i) => (
          <div
            key={title}
            className="grid grid-cols-[2rem_1fr] gap-3 rounded-xl border border-border bg-background p-5"
          >
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground"
              aria-hidden="true"
            >
              {i + 1}
            </span>
            <div>
              <h3 className="font-semibold text-foreground leading-snug">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
