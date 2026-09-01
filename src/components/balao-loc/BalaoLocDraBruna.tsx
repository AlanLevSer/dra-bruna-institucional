import { ScrollReveal } from "@/components/ui/ScrollReveal";
import draBrunaFoto from "@/assets/dra-bruna-professional.avif";

const ESPECIALIDADES = [
  "Tratamento clínico da obesidade",
  "Endoscopia Digestiva",
  "Nutrologia",
  "Direção clínica da LevSer",
];

export const BalaoLocDraBruna = () => (
  <section id="direcao-medica" className="bg-muted/40">
    <div className="mx-auto w-full max-w-3xl px-5 py-12 md:py-16">
      <ScrollReveal>
        <p className="text-xs font-medium tracking-[0.08em] text-primary mb-3">
          Direção médica
        </p>
        <h2 className="font-kumbh text-2xl md:text-3xl font-normal text-foreground leading-snug">
          A decisão vem antes do procedimento
        </h2>
      </ScrollReveal>

      {/* Mobile: photo first (flex-col-reverse), Desktop: text left | photo right */}
      <ScrollReveal delay={80} className="mt-6">
        <div className="flex flex-col-reverse md:grid md:grid-cols-2 md:gap-10 md:items-start">

          {/* Text */}
          <div className="mt-6 md:mt-0">
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

            {/* Credentials — stacked hierarchy */}
            <ul className="mt-5 space-y-0.5">
              {ESPECIALIDADES.map((esp, i) => (
                <li
                  key={esp}
                  className={`text-sm leading-relaxed ${
                    i === ESPECIALIDADES.length - 1
                      ? "text-primary font-medium"
                      : "text-foreground"
                  }`}
                >
                  {esp}
                </li>
              ))}
            </ul>

            <div className="mt-4 pt-4 border-t border-border/40 space-y-0.5">
              <p className="text-xs text-muted-foreground">CRM 124809 · RQE 57361</p>
              <p className="text-xs text-muted-foreground">Membro titular SOBED · Membro titular ABESO</p>
            </div>
          </div>

          {/* Photo — larger presence */}
          <div>
            <img
              src={draBrunaFoto}
              alt="Dra. Bruna Durelli, responsável pela direção médica da LevSer"
              loading="lazy"
              className="w-full max-w-xs md:max-w-none rounded-xl object-cover aspect-[3/4] shadow-elegant"
            />
          </div>

        </div>
      </ScrollReveal>
    </div>
  </section>
);
