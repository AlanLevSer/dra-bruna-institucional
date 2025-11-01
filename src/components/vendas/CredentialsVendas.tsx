import { GrafismoDecor } from "@/components/GrafismoDecor";
import { GraduationCap, Award, Globe } from "lucide-react";
import { OptimizedImage } from "@/components/OptimizedImage";
import draBrunaImage from "@/assets/dra-bruna-professional.avif";

const credentials = [
  {
    icon: GraduationCap,
    title: "Formação acadêmica",
    items: [
      "Especialista em Obesidade",
      "Nutrologia e Medicina Regenerativa",
      "Endoscopia Digestiva",
      "Formação premium: Einstein, Santa Casa, ABRAN",
    ],
  },
  {
    icon: Award,
    title: "Certificações",
    items: [
      "Membro titular SOBED (Sociedade Brasileira de Endoscopia Digestiva)",
      "Membro titular ABESO (Associação Brasileira para Estudo da Obesidade)",
      "Formação em procedimentos minimamente invasivos com segurança e precisão",
      "Abordagem integrativa para saúde celular e metabólica",
    ],
  },
  {
    icon: Globe,
    title: "Congressos e especializações",
    items: [
      "+15 congressos internacionais",
      "Palestrante em eventos médicos",
      "Publicações científicas",
    ],
  },
];

export const CredentialsVendas = () => {
  return (
    <section className="relative py-10 md:py-12 bg-background overflow-hidden">
      <GrafismoDecor variant="background" position="center" size="xl" opacity={0.08} />

      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block bg-primary/10 text-primary px-6 py-2 rounded-full text-xs font-medium">
            98% das pacientes recomendam a Dra. Bruna
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
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

          <div className="order-1 lg:order-2 space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                Expertise e excelência em emagrecimento
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Formação sólida, experiência internacional e dedicação exclusiva ao tratamento da obesidade com balão intragástrico.
              </p>
            </div>

            {credentials.map((credential) => {
              const Icon = credential.icon;
              return (
                <div key={credential.title} className="bg-card rounded-xl p-6 shadow-elegant hover:shadow-hover transition-all">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-semibold mb-3">{credential.title}</h3>
                      <ul className="space-y-2">
                        {credential.items.map((item) => (
                          <li key={item} className="text-xs text-muted-foreground flex items-start gap-2">
                            <span className="text-primary">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-primary/5 border-l-4 border-primary rounded-lg p-8 text-center max-w-3xl mx-auto">
          <blockquote className="text-lg md:text-xl italic text-foreground mb-4">
            "Há mais de 10 anos, escolhi dedicar minha carreira a te ajudar a conquistar uma vida mais leve e saudável.
            Acredito que você merece um cuidado que respeita sua história, seus desafios e seu tempo — com ciência, sim, mas também com empatia de verdade.
            Estou aqui para te acompanhar, não para te julgar."
          </blockquote>
          <p className="text-sm font-medium text-primary">— Dra. Bruna Durelli</p>
        </div>
      </div>
    </section>
  );
};
