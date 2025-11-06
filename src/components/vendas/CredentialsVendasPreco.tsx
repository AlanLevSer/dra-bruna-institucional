import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/components/OptimizedImage";
import { GrafismoDecor } from "@/components/GrafismoDecor";
import draBrunaProfessional from "@/assets/dra-bruna-professional.avif";
import { CONTACT } from "@/lib/constants";
import { openLeadChat } from "@/lib/leadChat";
import { trackPricingCTAClick } from "@/lib/analytics";

const CredentialsVendasPreco = () => {
  const handleWhatsApp = () => {
    const scrollDepth = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );
    
    trackPricingCTAClick({
      source: 'credentials_preco',
      section: 'credentials',
      position: 'middle',
      scroll_depth: scrollDepth,
    });
    
    openLeadChat('credentials_preco', CONTACT.WHATSAPP_BALAO_VENDAS, {
      section: 'credentials',
      position: 'middle',
      scroll_depth: scrollDepth,
    });
  };

  return (
    <section className="relative py-16 md:py-24 bg-muted/30 overflow-hidden">
      <GrafismoDecor variant="background" position="top-left" size="lg" opacity={0.1} />
      
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Sobre a Dra. Bruna Durelli
            </h2>
            <p className="text-lg text-primary font-medium">
              CRM 124809 | RQE 57361
            </p>
          </div>

          {/* Grid com foto e credenciais */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
            {/* Foto */}
            <div className="relative">
              <OptimizedImage
                src={draBrunaProfessional}
                alt="Dra. Bruna Durelli - Especialista em Obesidade"
                width={500}
                height={600}
                className="rounded-2xl shadow-elegant hover:shadow-hover transition-all w-full"
              />
            </div>

            {/* Credenciais */}
            <div className="space-y-8">
              {/* Intro */}
              <p className="text-lg text-muted-foreground">
                Com mais de 10 anos de experiência nacional e internacional, formação em instituições como o Hospital Albert Einstein, Santa Casa de São Paulo e ABRAN, a Dra. Bruna é especialista em balão intragástrico e referência em emagrecimento saudável e acompanhamento multidisciplinar.
              </p>

              {/* Formação Acadêmica */}
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Formação Acadêmica
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Especialista em Obesidade</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Nutrologia e Medicina Regenerativa</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Endoscopia Digestiva</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Formação Premium: Hospital Albert Einstein, Santa Casa de São Paulo, ABRAN</span>
                  </li>
                </ul>
              </div>

              {/* Certificações */}
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Certificações
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Membro titular da SOBED (Sociedade Brasileira de Endoscopia Digestiva)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Membro titular da ABESO (Associação Brasileira para Estudo da Obesidade)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Formação em procedimentos minimamente invasivos com segurança e precisão</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Abordagem integrativa para saúde celular e metabólica</span>
                  </li>
                </ul>
              </div>

              {/* Congressos */}
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Congressos e Especializações
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Mais de 15 congressos internacionais em Endoscopia, Obesidade e Medicina Regenerativa</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Palestrante em eventos médicos e simpósios científicos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Participação em publicações e estudos clínicos sobre emagrecimento sustentável</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Citação final */}
          <div className="bg-card rounded-2xl p-8 md:p-12 shadow-elegant">
            <blockquote className="text-xl md:text-2xl font-serif italic text-center max-w-3xl mx-auto mb-6">
              "Eu não vendo milagres. Eu entrego um método médico, seguro e comprovado que devolve o controle da fome e a confiança de viver em paz com o espelho."
            </blockquote>
            <p className="text-center text-muted-foreground font-medium">
              — Dra. Bruna Durelli
            </p>
          </div>

          {/* CTA */}
          <div className="text-center mt-8">
            <p className="text-lg mb-6">
              Você merece um tratamento que funcione e cabe no seu orçamento.
            </p>
            <Button
              size="lg"
              onClick={handleWhatsApp}
              className="text-base px-8 py-6 h-auto shadow-elegant hover:shadow-hover"
            >
              Consultar Valores
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CredentialsVendasPreco;
