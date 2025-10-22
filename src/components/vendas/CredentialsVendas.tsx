import { GrafismoDecor } from "@/components/GrafismoDecor";
import { GraduationCap, Award, Globe } from "lucide-react";
import { OptimizedImage } from "@/components/OptimizedImage";
import draBrunaImage from "@/assets/dra-bruna-professional.jpg";

export const CredentialsVendas = () => {
  const credentials = [
    {
      icon: GraduationCap,
      title: "Formação Acadêmica",
      items: [
        "Medicina pela USP",
        "Residência em Endoscopia Digestiva",
        "Pós-graduação em Nutrologia",
      ],
    },
    {
      icon: Award,
      title: "Certificações",
      items: [
        "SOBED - Sociedade Brasileira de Endoscopia",
        "SBEM - Sociedade Brasileira de Endocrinologia",
        "Certificação Internacional em Balão Intragástrico",
      ],
    },
    {
      icon: Globe,
      title: "Congressos e Especializações",
      items: [
        "+15 congressos internacionais",
        "Palestrante em eventos médicos",
        "Publicações científicas",
      ],
    },
  ];

  return (
    <section className="relative py-16 md:py-20 bg-background overflow-hidden">
      <GrafismoDecor variant="background" position="center" size="xl" opacity={0.08} />
      
      <div className="container mx-auto px-4">
        {/* Badge de Recomendação */}
        <div className="text-center mb-12">
          <div className="inline-block bg-primary/10 text-primary px-6 py-2 rounded-full text-xs font-medium">
            98% dos pacientes recomendam a Dra. Bruna
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
          {/* Imagem */}
          <div className="order-2 lg:order-1">
            <div className="rounded-2xl overflow-hidden shadow-elegant">
              <OptimizedImage
                src={draBrunaImage}
                alt="Dra. Bruna Durelli"
                width={600}
                height={800}
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Credenciais */}
          <div className="order-1 lg:order-2 space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                Expertise e Excelência em Emagrecimento
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Formação sólida, experiência internacional e dedicação 
                exclusiva ao tratamento da obesidade com balão intragástrico.
              </p>
            </div>

            {credentials.map((credential, index) => (
              <div key={index} className="bg-card rounded-xl p-6 shadow-elegant hover:shadow-hover transition-all">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <credential.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold mb-3">{credential.title}</h3>
                    <ul className="space-y-2">
                      {credential.items.map((item, idx) => (
                        <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                          <span className="text-primary">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quote */}
        <div className="bg-primary/5 border-l-4 border-primary rounded-lg p-8 text-center max-w-3xl mx-auto">
          <blockquote className="text-lg md:text-xl italic text-foreground mb-4">
            "Minha missão é transformar vidas através de um tratamento completo e humanizado"
          </blockquote>
          <p className="text-sm font-medium text-primary">— Dra. Bruna Durelli</p>
        </div>
      </div>
    </section>
  );
};
