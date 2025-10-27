import { OptimizedImage } from "@/components/OptimizedImage";
import terraLogo from "@/assets/media/terra-logo.avif";
import crescerLogo from "@/assets/media/crescer-logo.avif";
import jovemPanLogo from "@/assets/media/jovem-pan-logo.avif";
import boaFormaLogo from "@/assets/media/boa-forma-logo.avif";
import bandnewsLogo from "@/assets/media/bandnews-logo.avif";
import anaMariaLogo from "@/assets/media/ana-maria-logo.avif";

export const MediaRecognitionVendas = () => {
  const mediaLogos = [
    { src: terraLogo, alt: "Terra", url: "https://www.terra.com.br/vida-e-estilo/saude/7-sinais-de-que-a-obesidade-esta-afetando-a-sua-saude,21f8581eeb5cc9e3ac0e7c68691fe551smecd7g5.html#google_vignette" },
    { src: crescerLogo, alt: "Crescer", url: "https://revistacrescer.globo.com/criancas/saude/noticia/2025/06/um-terco-das-criancas-estara-acima-do-peso-ate-2050-como-prevenir-a-obesidade-infantil.ghtml" },
    { src: jovemPanLogo, alt: "Jovem Pan", url: "https://jovempan.com.br/edicase/8-mitos-e-verdades-sobre-obesidade-e-sobrepeso.html" },
    { src: boaFormaLogo, alt: "Boa Forma", url: "https://boaforma.abril.com.br/alimentacao/habitos-alimentares-parecem-saudaveis-nao-sao/#google_vignette" },
    { src: bandnewsLogo, alt: "BandNews", url: "https://open.spotify.com/episode/1YYkeDdwVcU1sBFW3GbnJm?si=MUWuUl_rQcq1LGpxSujEXQ&nd=1&dlsi=db62467fbc874a60" },
    { src: anaMariaLogo, alt: "Ana Maria Braga", url: "https://revistaanamaria.com.br/bem-estar-e-saude/o-impacto-velado-da-semaglutida/" },
  ];

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Reconhecida pela Mídia Nacional
          </h2>
          <p className="text-lg text-muted-foreground">
            Dra. Bruna Durelli é referência em emagrecimento sustentável e balão intragástrico
          </p>
        </div>

        {/* Grid de Logos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
          {mediaLogos.map((logo, index) => (
            <a
              key={index}
              href={logo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl p-4 flex items-center justify-center hover-lift shadow-md"
            >
              <OptimizedImage
                src={logo.src}
                alt={logo.alt}
                width={80}
                height={40}
                className="max-w-full h-auto opacity-70 hover:opacity-100 transition-opacity"
              />
            </a>
          ))}
        </div>

        {/* Quote */}
        <div className="text-center mt-12">
          <p className="text-xl font-medium italic text-muted-foreground">
            "Referência nacional em emagrecimento sustentável e balão intragástrico"
          </p>
        </div>
      </div>
    </section>
  );
};
