import terraLogo from "@/assets/media/terra-logo.avif";
import crescerLogo from "@/assets/media/crescer-logo.avif";
import jovemPanLogo from "@/assets/media/jovem-pan-logo.avif";
import boaFormaLogo from "@/assets/media/boa-forma-logo.avif";
import bandNewsLogo from "@/assets/media/bandnews-logo.avif";
import anaMariaLogo from "@/assets/media/ana-maria-logo.avif";

/**
 * LP C1 — prova de autoridade apenas.
 * Os logos NÃO são clicáveis (sem href, onClick, target) para não retirar o
 * usuário da jornada de conversão. Os componentes institucionais de mídia
 * seguem inalterados nas demais páginas.
 */
const VEICULOS = [
  { name: "Terra", logo: terraLogo },
  { name: "Revista Crescer", logo: crescerLogo },
  { name: "Jovem Pan News", logo: jovemPanLogo },
  { name: "Boa Forma", logo: boaFormaLogo },
  { name: "BandNews FM", logo: bandNewsLogo },
  { name: "Revista Ana Maria", logo: anaMariaLogo },
];

export const Glp1Midia = () => (
  <section id="midia" className="bg-background">
    <div className="mx-auto w-full max-w-4xl px-5 py-10 md:py-14">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary mb-3">
        Dra. Bruna na mídia
      </p>
      <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground leading-snug">
        Conhecimento médico que também ganha espaço na mídia.
      </h2>
      <p className="mt-3 text-base text-muted-foreground leading-relaxed">
        Participações sobre obesidade, emagrecimento e saúde em veículos nacionais.
      </p>

      <ul className="mt-7 grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
        {VEICULOS.map((veiculo) => (
          <li
            key={veiculo.name}
            className="flex h-16 items-center justify-center rounded-xl border border-border bg-card px-3"
          >
            <img
              src={veiculo.logo}
              alt={`Logo ${veiculo.name}`}
              width={120}
              height={32}
              loading="lazy"
              decoding="async"
              className="max-h-7 w-auto max-w-full object-contain opacity-80"
            />
          </li>
        ))}
      </ul>
    </div>
  </section>
);
