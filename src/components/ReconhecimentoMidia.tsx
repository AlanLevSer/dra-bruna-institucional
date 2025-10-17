import { GrafismoDecor } from "./GrafismoDecor";
import terraLogo from "@/assets/media/terra-logo.png";
import crescerLogo from "@/assets/media/crescer-logo.png";
import jovemPanLogo from "@/assets/media/jovem-pan-logo.png";
import boaFormaLogo from "@/assets/media/boa-forma-logo.webp";
import bandnewsLogo from "@/assets/media/bandnews-logo.webp";
import anaMariaLogo from "@/assets/media/ana-maria-logo.jpeg";

const mediaAppearances = [
  {
    name: "Terra",
    logo: terraLogo,
    url: "https://www.terra.com.br/vida-e-estilo/saude/7-sinais-de-que-a-obesidade-esta-afetando-a-sua-saude,21f8581eeb5cc9e3ac0e7c68691fe551smecd7g5.html",
    title: "7 sinais de que a obesidade está afetando a sua saúde"
  },
  {
    name: "Revista Crescer",
    logo: crescerLogo,
    url: "https://revistacrescer.globo.com/criancas/saude/noticia/2025/06/um-terco-das-criancas-estara-acima-do-peso-ate-2050-como-prevenir-a-obesidade-infantil.ghtml",
    title: "Como prevenir a obesidade infantil"
  },
  {
    name: "Jovem Pan",
    logo: jovemPanLogo,
    url: "https://jovempan.com.br/edicase/8-mitos-e-verdades-sobre-obesidade-e-sobrepeso.html",
    title: "8 mitos e verdades sobre obesidade e sobrepeso"
  },
  {
    name: "Boa Forma",
    logo: boaFormaLogo,
    url: "https://boaforma.abril.com.br/alimentacao/habitos-alimentares-parecem-saudaveis-nao-sao/#google_vignette",
    title: "Hábitos alimentares que parecem saudáveis"
  },
  {
    name: "BandNews FM",
    logo: bandnewsLogo,
    url: "https://open.spotify.com/episode/1YYkeDdwVcU1sBFW3GbnJm?si=MUWuUl_rQcq1LGpxSujEXQ&nd=1&dlsi=db62467fbc874a60",
    title: "Entrevista sobre obesidade - Podcast"
  },
  {
    name: "Revista Ana Maria",
    logo: anaMariaLogo,
    url: "https://revistaanamaria.com.br/bem-estar-e-saude/o-impacto-velado-da-semaglutida/",
    title: "O impacto velado da Semaglutida"
  }
];

export const ReconhecimentoMidia = () => {
  return (
    <section className="py-10 md:py-12 relative bg-gradient-to-br from-background via-background to-background/95">
      <GrafismoDecor position="top-right" />
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-10 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Reconhecimento na Mídia
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Dra. Bruna é reconhecida como autoridade no tratamento da obesidade
            <br />
            <span className="text-sm md:text-base opacity-80 font-medium">
              (clique nas imagens para ler ou ouvir as reportagens na íntegra)
            </span>
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 max-w-6xl mx-auto">
          {mediaAppearances.map((media, index) => (
            <a
              key={media.name}
              href={media.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-primary/10 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
              title={media.title}
            >
              <img
                src={media.logo}
                alt={`Logo ${media.name}`}
                className="w-full h-auto max-h-8 object-contain transition-all duration-300 opacity-100 group-hover:opacity-100 group-active:opacity-50 active:opacity-50"
                width="120"
                height="32"
                loading="lazy"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
