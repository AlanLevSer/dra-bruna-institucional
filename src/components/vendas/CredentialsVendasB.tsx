import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/components/OptimizedImage";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GraduationCap, Award, Globe } from "lucide-react";
import draBrunaProfessional from "@/assets/dra-bruna-professional.avif";
import { CONTACT } from "@/lib/constants";
import { openLeadChat } from "@/lib/leadChat";

const credentials = {
  formacao: [
    "Especialista em Obesidade",
    "Nutrologia e Medicina Regenerativa",
    "Endoscopia Digestiva",
    "Formação Premium: Hospital Albert Einstein, Santa Casa de São Paulo, ABRAN (Associação Brasileira de Nutrologia)",
  ],
  certificacoes: [
    "Membro titular da SOBED (Sociedade Brasileira de Endoscopia Digestiva)",
    "Membro titular da ABESO (Associação Brasileira para Estudo da Obesidade)",
    "Formação em procedimentos minimamente invasivos com segurança e precisão",
    "Abordagem integrativa para saúde celular e metabólica",
  ],
  congressos: [
    "+15 congressos internacionais nas áreas de Endoscopia, Obesidade e Medicina Regenerativa",
    "Palestrante em eventos médicos e simpósios científicos",
    "Participação em publicações e estudos clínicos sobre emagrecimento sustentável",
  ],
};

const CredentialsVendasB = () => {
  const handleWhatsApp = () => {
    openLeadChat('credentials_vendas_b', CONTACT.WHATSAPP_BALAO_VENDAS);
  };

  return (
    <section className="py-16 md:py-24 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Section 1: About Dra. Bruna */}
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            {/* Image */}
            <div className="lg:col-span-2">
              <OptimizedImage
                src={draBrunaProfessional}
                alt="Dra. Bruna Durelli - Especialista em Emagrecimento"
                width={600}
                height={800}
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>

            {/* Content */}
            <div className="lg:col-span-3 space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-2">
                  Sobre a Dra. Bruna Durelli
                </h2>
                <p className="text-lg text-muted-foreground">
                  CRM 124809 • RQE 57361
                </p>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Com mais de 10 anos de experiência nacional e internacional, formação em instituições 
                como o Hospital Albert Einstein, Santa Casa de São Paulo e ABRAN, a Dra. Bruna é 
                especialista em balão intragástrico e referência em emagrecimento saudável e 
                acompanhamento interdisciplinar.
              </p>

              {/* Accordion for Credentials */}
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="formacao" className="border-b border-border">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <GraduationCap className="w-5 h-5 text-primary" />
                      </div>
                      <span className="font-semibold">Formação Acadêmica</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 mt-4 ml-13">
                      {credentials.formacao.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="certificacoes" className="border-b border-border">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Award className="w-5 h-5 text-primary" />
                      </div>
                      <span className="font-semibold">Certificações</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 mt-4 ml-13">
                      {credentials.certificacoes.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="congressos" className="border-b-0">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Globe className="w-5 h-5 text-primary" />
                      </div>
                      <span className="font-semibold">Congressos e Especializações</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 mt-4 ml-13">
                      {credentials.congressos.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* Quote */}
              <div className="bg-primary/5 backdrop-blur-sm rounded-xl p-6 border-l-4 border-primary">
                <p className="text-base md:text-lg italic text-muted-foreground leading-relaxed mb-4">
                  "Há mais de 10 anos, escolhi dedicar minha carreira a te ajudar a conquistar uma vida 
                  mais leve e saudável. Acredito que você merece um cuidado que respeita sua história, 
                  seus desafios e seu tempo — com ciência, sim, mas também com empatia de verdade. 
                  Estou aqui para te acompanhar, não para te julgar."
                </p>
                <p className="font-semibold text-foreground">
                  — Dra. Bruna Durelli
                </p>
              </div>

              {/* CTA */}
              <div className="text-center lg:text-left">
                <Button
                  size="lg"
                  onClick={handleWhatsApp}
                  className="text-base px-8 py-6 h-auto shadow-elegant hover:shadow-hover"
                >
                  Transforme sua vida com quem entende de resultados reais
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CredentialsVendasB;
