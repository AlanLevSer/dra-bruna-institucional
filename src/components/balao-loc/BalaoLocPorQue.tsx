import { ScrollReveal } from "@/components/ui/ScrollReveal";

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
      <ScrollReveal>
        <p className="text-xs font-medium tracking-[0.08em] text-primary mb-3">
          Por que LevSer
        </p>
        <h2 className="text-2xl md:text-3xl font-normal text-foreground leading-snug">
          O diferencial está em como organizamos o que acontece antes, durante e depois da ferramenta
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={100} className="mt-8 border-t border-border">
        {BLOCOS.map(({ title, body }) => (
          <div key={title} className="py-6 border-b border-border">
            <h3 className="font-semibold text-foreground leading-snug mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
          </div>
        ))}
      </ScrollReveal>
    </div>
  </section>
);
