import draBrunaFoto from "@/assets/dra-bruna-professional.avif";

const ATUACAO = [
  "Tratamento clínico da obesidade",
  "Endoscopia Digestiva",
  "Nutrologia",
  "Direção clínica da LevSer",
];

export const BalaoLocDraBruna = () => (
  <section id="direcao-medica" className="bg-muted/40">
    <div className="mx-auto w-full max-w-3xl px-5 py-12 md:py-16">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary mb-3">
        Direção Médica
      </p>
      <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground leading-snug">
        A decisão vem antes do procedimento
      </h2>

      <div className="mt-6 grid gap-6 sm:grid-cols-[160px_1fr] sm:items-start">
        <img
          src={draBrunaFoto}
          alt="Dra. Bruna Durelli, responsável pela direção médica da LevSer"
          loading="lazy"
          className="w-full max-w-[160px] rounded-2xl object-cover aspect-[4/5] border border-border"
        />
        <div className="space-y-4">
          <div className="space-y-3 text-base text-muted-foreground leading-relaxed">
            <p>
              A Dra. Bruna Durelli conduz a direção médica da LevSer e participa da avaliação que
              orienta a definição da rota terapêutica.
            </p>
            <p>
              Você pode chegar procurando especificamente pelo balão. O objetivo da avaliação é
              entender se essa ferramenta faz sentido para o seu momento e como ela se integra ao
              restante do cuidado.
            </p>
          </div>
          <ul className="flex flex-wrap gap-2">
            {ATUACAO.map((item) => (
              <li
                key={item}
                className="rounded-full border border-primary/40 bg-primary/5 px-3 py-1 text-sm font-medium text-foreground"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground">
            Membro titular SOBED · Membro titular ABESO
          </p>
          <p className="text-sm text-muted-foreground">CRM 124809 · RQE 57361</p>
        </div>
      </div>
    </div>
  </section>
);
