import { ExternalLink } from "lucide-react";
import { OptimizedImage } from "@/components/OptimizedImage";
import terraLogo from "@/assets/media/terra-logo.png";
import crescerLogo from "@/assets/media/crescer-logo.png";
import jovemPanLogo from "@/assets/media/jovem-pan-logo.png";
import boaFormaLogo from "@/assets/media/boa-forma-logo.webp";
import bandnewsLogo from "@/assets/media/bandnews-logo.webp";
import anaMariaLogo from "@/assets/media/ana-maria-logo.jpeg";

export const MediaRecognitionVendas = () => {
  const mediaLogos = [
    { src: terraLogo, alt: "Terra" },
    { src: crescerLogo, alt: "Crescer" },
    { src: jovemPanLogo, alt: "Jovem Pan" },
    { src: boaFormaLogo, alt: "Boa Forma" },
    { src: bandnewsLogo, alt: "BandNews" },
    { src: anaMariaLogo, alt: "Ana Maria Braga" },
  ];

  const appearances = [
    {
      title: "Entrevista sobre obesidade no Terra",
      description: "Como tratar a obesidade de forma saudável",
    },
    {
      title: "Participação no programa da Ana Maria Braga",
      description: "Dicas de emagrecimento sustentável",
    },
    {
      title: "Matéria na Jovem Pan sobre emagrecimento",
      description: "O papel do balão intragástrico no tratamento da obesidade",
    },
    {
      title: "Artigo na revista Crescer",
      description: "Obesidade infantil e saúde familiar",
    },
    {
      title: "Entrevista na BandNews sobre balão intragástrico",
      description: "Tratamentos modernos para perda de peso",
    },
    {
      title: "Coluna na Boa Forma",
      description: "Métodos eficazes de emagrecimento",
    },
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
            <div
              key={index}
              className="bg-white rounded-xl p-4 flex items-center justify-center hover-lift shadow-md"
            >
              <OptimizedImage
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={60}
                className="max-w-full h-auto opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>

        {/* Lista de Participações */}
        <div className="bg-gradient-to-br from-primary/5 to-wellness-soft/30 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-center mb-8">
            Participações e Entrevistas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {appearances.map((appearance, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 flex items-start gap-3 hover-lift shadow-sm"
              >
                <ExternalLink className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-sm mb-1">{appearance.title}</h4>
                  <p className="text-xs text-muted-foreground">
                    {appearance.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
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
