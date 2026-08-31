import { Glp1Cta } from "@/components/glp1/Glp1Cta";

const CTA_LABEL = "Quero avaliar se o balão faz sentido para mim";

export const BalaoLocIndicacao = () => (
  <section id="indicacao" className="bg-muted/40">
    <div className="mx-auto w-full max-w-3xl px-5 py-12 md:py-16">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary mb-3">
        Indicação Individual
      </p>
      <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground leading-snug">
        O balão pode ser uma rota possível. A avaliação mostra se é a rota adequada para você.
      </h2>

      <div className="mt-5 space-y-4 text-base text-muted-foreground leading-relaxed">
        <p>
          Pessoas chegam à LevSer em momentos diferentes. Algumas estão considerando o balão pela
          primeira vez; outras já passaram por diferentes estratégias e estão procurando um novo
          caminho.
        </p>
        <p>
          Por isso, a intenção de colocar um balão é o ponto de partida — não a indicação final.
        </p>
      </div>

      <div className="mt-6 rounded-xl border border-primary/40 bg-primary/5 px-5 py-5">
        <p className="font-semibold text-foreground leading-snug">
          A Rota com Balão não é automática para todo mundo.
        </p>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          A avaliação existe justamente para entender se essa ferramenta faz sentido para o seu
          momento ou se outra estratégia deve ser considerada.
        </p>
      </div>

      <Glp1Cta
        ctaSource="indicacao_section"
        label={CTA_LABEL}
        className="mt-8"
      />
    </div>
  </section>
);
