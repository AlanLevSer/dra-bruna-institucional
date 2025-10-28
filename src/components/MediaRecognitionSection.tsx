import terraLogo from "@/assets/media/terra-logo.avif";
import crescerLogo from "@/assets/media/crescer-logo.avif";
import jovemPanLogo from "@/assets/media/jovem-pan-logo.avif";
import boaFormaLogo from "@/assets/media/boa-forma-logo.avif";
import bandNewsLogo from "@/assets/media/bandnews-logo.avif";
import anaMariaLogo from "@/assets/media/ana-maria-logo.avif";
import { ExternalLink } from "lucide-react";

const MediaRecognitionSection = () => {
  const mediaLogos = [
    { 
      name: "Terra", 
      logo: terraLogo,
      url: "https://www.terra.com.br/vida-e-estilo/saude/7-sinais-de-que-a-obesidade-esta-afetando-a-sua-saude,21f8581eeb5cc9e3ac0e7c68691fe551smecd7g5.html",
      width: 120,
      height: 40
    },
    { 
      name: "Crescer", 
      logo: crescerLogo,
      url: "https://revistacrescer.globo.com/criancas/saude/noticia/2025/06/um-terco-das-criancas-estara-acima-do-peso-ate-2050-como-prevenir-a-obesidade-infantil.ghtml",
      width: 110,
      height: 40
    },
    { 
      name: "Jovem Pan News", 
      logo: jovemPanLogo,
      url: "https://jovempan.com.br/edicase/8-mitos-e-verdades-sobre-obesidade-e-sobrepeso.html",
      width: 120,
      height: 40
    },
    { 
      name: "Boa Forma", 
      logo: boaFormaLogo,
      url: "https://boaforma.abril.com.br/alimentacao/habitos-alimentares-parecem-saudaveis-nao-sao/#google_vignette",
      width: 110,
      height: 40
    },
    { 
      name: "BandNews FM", 
      logo: bandNewsLogo,
      url: "https://open.spotify.com/episode/1YYkeDdwVcU1sBFW3GbnJm?si=MUWuUl_rQcq1LGpxSujEXQ&nd=1&dlsi=db62467fbc874a60",
      width: 110,
      height: 40
    },
    { 
      name: "Ana Maria", 
      logo: anaMariaLogo,
      url: "https://revistaanamaria.com.br/bem-estar-e-saude/o-impacto-velado-da-semaglutida/",
      width: 100,
      height: 36
    }
  ];

  const recognitions = [
    {
      text: "7 sinais de que a obesidade está afetando a sua saúde",
      outlet: "Terra",
      url: "https://www.terra.com.br/vida-e-estilo/saude/7-sinais-de-que-a-obesidade-esta-afetando-a-sua-saude,21f8581eeb5cc9e3ac0e7c68691fe551smecd7g5.html"
    },
    {
      text: "Um terço das crianças estará acima do peso até 2050: como prevenir a obesidade infantil",
      outlet: "Revista Crescer",
      url: "https://revistacrescer.globo.com/criancas/saude/noticia/2025/06/um-terco-das-criancas-estara-acima-do-peso-ate-2050-como-prevenir-a-obesidade-infantil.ghtml"
    },
    {
      text: "8 mitos e verdades sobre obesidade e sobrepeso",
      outlet: "Jovem Pan News",
      url: "https://jovempan.com.br/edicase/8-mitos-e-verdades-sobre-obesidade-e-sobrepeso.html"
    },
    {
      text: "Hábitos alimentares que parecem saudáveis, mas não são",
      outlet: "Boa Forma",
      url: "https://boaforma.abril.com.br/alimentacao/habitos-alimentares-parecem-saudaveis-nao-sao/#google_vignette"
    },
    {
      text: "Podcast sobre tratamento da obesidade (Áudio)",
      outlet: "BandNews FM",
      url: "https://open.spotify.com/episode/1YYkeDdwVcU1sBFW3GbnJm?si=MUWuUl_rQcq1LGpxSujEXQ&nd=1&dlsi=db62467fbc874a60"
    },
    {
      text: "O impacto velado da semaglutida",
      outlet: "Revista Ana Maria",
      url: "https://revistaanamaria.com.br/bem-estar-e-saude/o-impacto-velado-da-semaglutida/"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Reconhecimento na Mídia
            </h2>
            <p className="text-xl text-muted-foreground">
              Dra. Bruna é reconhecida como autoridade no tratamento da obesidade
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              (clique na imagem para ler e ouvir as matérias na íntegra)
            </p>
          </div>
          
          {/* Media Logos */}
          <div className="mb-16">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center justify-items-center">
              {mediaLogos.map((logo, index) => (
                <a
                  key={index}
                  href={logo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-border/50 w-full h-20 flex items-center justify-center hover:shadow-lg hover:scale-105 transition-all duration-300 hover:bg-white"
                >
                  <img 
                    src={logo.logo} 
                    alt={`Logo ${logo.name}`}
                    loading="lazy"
                    width={logo.width}
                    height={logo.height}
                    className="max-w-full max-h-12 object-contain filter group-hover:brightness-110 transition-all duration-300"
                  />
                </a>
              ))}
            </div>
          </div>
          
          {/* Recognition List */}
          <div className="bg-wellness-soft/10 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
              Participações e Reconhecimentos
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {recognitions.map((recognition, index) => (
                <a
                  key={index}
                  href={recognition.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start space-x-3 p-4 rounded-lg hover:bg-wellness-soft/5 transition-all duration-300"
                >
                  <div className="w-2 h-2 bg-wellness-warm rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors">
                      {recognition.text}
                    </p>
                    <div className="flex items-center space-x-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-sm text-wellness-warm font-medium">{recognition.outlet}</span>
                      <ExternalLink className="w-3 h-3 text-wellness-warm" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
          
          <div className="text-center mt-12">
            <div className="bg-wellness-warm/5 p-6 rounded-xl border border-wellness-warm/20 max-w-3xl mx-auto">
              <p className="text-lg text-wellness-warm font-medium">
                "A expertise da Dra. Bruna é reconhecida pelos principais veículos de comunicação do país, 
                consolidando sua posição como referência no tratamento interdisciplinar da obesidade."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MediaRecognitionSection;
