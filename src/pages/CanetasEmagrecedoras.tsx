import { Navigation } from "@/components/Navigation";
import { SubpageHero } from "@/components/SubpageHero";
import { TreatmentSection } from "@/components/TreatmentSection";
import { Footer } from "@/components/Footer";
import { IndicationList } from "@/components/IndicationList";
import { BenefitsList } from "@/components/BenefitsList";
import { TransformacaoReal } from "@/components/TransformacaoReal";
import { CTASection } from "@/components/CTASection";
import { SEOHead } from "@/components/SEOHead";
import { StructuredData } from "@/components/StructuredData";
import { pageSEO, generateStructuredData } from "@/lib/seo";
import { Sparkles, Heart, Scale, Brain } from "lucide-react";
import medicationsImage from "@/assets/medications-sacietogena.png";

const CanetasEmagrecedoras = () => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalTherapy",
    "name": "Canetas Emagrecedoras (GLP-1 e Dupla Ação)",
    "description": "Tratamento médico com medicações injetáveis aprovadas pela ANVISA para obesidade (tirzepatida, semaglutida, liraglutida), com prescrição e acompanhamento especializado",
    "medicineSystem": "https://schema.org/WesternConventional",
    "relevantSpecialty": "https://schema.org/Endocrinology",
    "availableService": {
      "@type": "MedicalProcedure",
      "name": "Prescrição de Canetas Emagrecedoras",
      "procedureType": "Therapeutic"
    },
    "warning": "Medicamentos sujeitos a prescrição médica. Venda proibida pela internet."
  };

  return (
    <>
      <SEOHead data={pageSEO.canetasEmagrecedoras} />
      <StructuredData data={[generateStructuredData.organization, generateStructuredData.physician, serviceSchema]} />
      <Navigation />
      <SubpageHero
        title="Canetas Emagrecedoras"
        subtitle="Mounjaro, Ozempic, Wegovy e Saxenda com Acompanhamento Médico"
        description="Tratamento médico com canetas emagrecedoras (medicações injetáveis) que atuam nos hormônios da saciedade e do apetite. As canetas emagrecedoras, como Mounjaro (tirzepatida), Ozempic (semaglutida), Wegovy (semaglutida) e Saxenda (liraglutida), são medicações injetáveis aprovadas pela ANVISA para tratamento de obesidade. Na LevSer, utilizamos essas terapias modernas dentro de um programa médico completo, com prescrição individualizada e acompanhamento rigoroso."
        image="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80"
      />

      <TreatmentSection title="O que são Canetas Emagrecedoras?">
        <div className="space-y-6">
          <p className="text-lg leading-relaxed">
            As <strong>canetas emagrecedoras</strong> podem ser a peça que faltava para fazer seu corpo e sua mente caminharem na mesma direção.
          </p>
          
          <p>
            É um tratamento médico com <strong>canetas injetáveis</strong> que atuam diretamente nos centros cerebrais de controle do apetite e saciedade. 
            Essas medicações imitam hormônios naturais que seu corpo deveria estar produzindo em níveis adequados – mas que, por diversos fatores (genética, histórico de dietas restritivas, resistência à insulina), podem estar desequilibrados.
          </p>

          <div className="bg-muted/50 rounded-xl p-6 border-l-4 border-primary my-8">
            <p className="font-semibold text-foreground mb-2">O resultado?</p>
            <p className="text-muted-foreground">
              Menos fome física. Menos pensamento obsessivo em comida. Saciedade mais rápida e duradoura. 
              Isso cria o ambiente metabólico e comportamental para que você consiga, finalmente, 
              fazer escolhas conscientes – sem travar uma guerra com seu próprio corpo.
            </p>
          </div>

          <img 
            src={medicationsImage} 
            alt="Canetas Emagrecedoras - Mounjaro, Ozempic, Wegovy, Saxenda" 
            className="w-full max-w-2xl mx-auto rounded-xl shadow-hover my-8"
          />

          <p>
            Importante: <strong>não é uma "solução mágica"</strong> nem funciona isoladamente. 
            As canetas emagrecedoras são ferramentas poderosas dentro de um programa médico completo, 
            que inclui orientação nutricional, manejo comportamental, exames de controle e ajustes contínuos.
          </p>
        </div>
      </TreatmentSection>

      <TreatmentSection title="Como escolhemos a caneta ideal para você" variant="muted">
        <div className="space-y-6">
          <p>
            Cada medicação tem perfil e indicação específicos:
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 my-8">
            <div className="bg-card p-6 rounded-xl shadow-sm border border-primary/20">
              <h4 className="font-serif font-bold text-lg text-foreground mb-3">Mounjaro (tirzepatida)</h4>
              <p className="text-muted-foreground text-sm">
                Ação dupla (GLP-1 + GIP), maior eficácia demonstrada em estudos clínicos. Aplicação semanal.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-xl shadow-sm border border-primary/20">
              <h4 className="font-serif font-bold text-lg text-foreground mb-3">Ozempic e Wegovy (semaglutida)</h4>
              <p className="text-muted-foreground text-sm">
                Dose única semanal, resultados consistentes e bem documentados. Excelente perfil de segurança.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-xl shadow-sm border border-primary/20">
              <h4 className="font-serif font-bold text-lg text-foreground mb-3">Saxenda (liraglutida)</h4>
              <p className="text-muted-foreground text-sm">
                Aplicação diária, ideal para controle gradual e ajustes mais frequentes conforme resposta.
              </p>
            </div>
          </div>

          <div className="bg-primary/10 rounded-xl p-6 border-l-4 border-primary">
            <p className="font-semibold text-foreground">
              A escolha leva em conta seu histórico, exames, comorbidades e objetivos. 
              <strong> Não existe "melhor caneta" — existe a mais adequada para VOCÊ.</strong>
            </p>
          </div>
        </div>
      </TreatmentSection>

      <TreatmentSection title="Como funciona o tratamento">
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card p-6 rounded-xl shadow-sm">
              <h4 className="font-serif font-bold text-lg text-foreground mb-3">
                🧬 Ação nos Hormônios da Saciedade
              </h4>
              <p className="text-muted-foreground">
                As canetas emagrecedoras agem nos receptores GLP-1 (e GIP no caso do Mounjaro), que regulam 
                o apetite, a velocidade de esvaziamento gástrico e a sensibilidade à insulina.
              </p>
            </div>

            <div className="bg-card p-6 rounded-xl shadow-sm">
              <h4 className="font-serif font-bold text-lg text-foreground mb-3">
                🎯 Redução da Fome e Compulsão
              </h4>
              <p className="text-muted-foreground">
                Você sente menos fome entre as refeições, fica satisfeito com porções menores e 
                reduz pensamentos obsessivos sobre comida.
              </p>
            </div>

            <div className="bg-card p-6 rounded-xl shadow-sm">
              <h4 className="font-serif font-bold text-lg text-foreground mb-3">
                ⚖️ Perda de Peso Gradual e Sustentável
              </h4>
              <p className="text-muted-foreground">
                Com doses crescentes e acompanhamento regular, a perda de peso ocorre de forma progressiva, 
                preservando massa muscular e evitando o efeito rebote.
              </p>
            </div>

            <div className="bg-card p-6 rounded-xl shadow-sm">
              <h4 className="font-serif font-bold text-lg text-foreground mb-3">
                🔬 Melhora Metabólica
              </h4>
              <p className="text-muted-foreground">
                Além do peso, observamos melhora em marcadores como glicemia, hemoglobina glicada, 
                triglicerídeos e pressão arterial.
              </p>
            </div>
          </div>
        </div>
      </TreatmentSection>

      <IndicationList
        title="Para quem são indicadas as Canetas Emagrecedoras?"
        items={[
          "Adultos com IMC ≥ 30 (obesidade) ou IMC ≥ 27 com comorbidades (diabetes, hipertensão, dislipidemia)",
          "Pessoas com fome excessiva, compulsão alimentar ou dificuldade de saciedade",
          "Quem já tentou dietas e exercícios sem sucesso sustentável",
          "Pacientes que buscam tratamento médico seguro e eficaz, sem cirurgia",
          "Pessoas dispostas a seguir protocolo com acompanhamento e ajustes regulares"
        ]}
      />

      <div className="bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-500 p-6 my-8 container mx-auto px-4">
        <p className="text-amber-900 dark:text-amber-200 font-medium">
          ⚠️ <strong>Atenção:</strong> Canetas emagrecedoras são medicamentos controlados que exigem prescrição médica. 
          A venda sem receita é crime. Além disso, o uso sem acompanhamento pode causar efeitos colaterais graves e resultados não sustentáveis. 
          Avaliação médica detalhada é obrigatória antes de iniciar o tratamento.
        </p>
      </div>

      <BenefitsList
        title="O que você pode esperar"
        benefits={[
          "Controle Real da Fome: Redução significativa da fome física e emocional, permitindo escolhas alimentares mais conscientes",
          "Perda de Peso Sustentável: Emagrecimento gradual e consistente, com preservação de massa muscular quando acompanhado de nutrição e exercícios adequados",
          "Melhora dos Exames: Redução de glicemia, hemoglobina glicada, colesterol e triglicerídeos em pacientes com alterações metabólicas",
          "Menos Compulsão Alimentar: Redução dos episódios de compulsão e pensamento obsessivo em comida",
          "Segurança e Acompanhamento: Protocolo médico rigoroso com ajuste de doses, monitoramento de efeitos colaterais e suporte contínuo"
        ]}
      />

      <TreatmentSection title="Integração com Medicina Regenerativa" variant="muted">
        <div className="space-y-6">
          <p>
            As <strong>canetas emagrecedoras</strong> potencializam (e são potencializadas por) nossa abordagem regenerativa.
          </p>
          
          <p>
            Enquanto as medicações controlam a fome e facilitam a perda de peso, protocolos como 
            <strong> Nutrição Celular</strong> e <strong>Terapias Regenerativas</strong> trabalham para:
          </p>
          
          <ul className="space-y-3 list-disc list-inside text-muted-foreground ml-4">
            <li>Reduzir a inflamação crônica que sabota o emagrecimento</li>
            <li>Melhorar a sensibilidade à insulina e função mitocondrial</li>
            <li>Preservar e regenerar massa muscular durante a perda de peso</li>
            <li>Otimizar energia, sono e humor – pilares da sustentabilidade</li>
          </ul>
          
          <div className="bg-card p-8 rounded-xl shadow-hover border border-primary/30 mt-8">
            <p className="text-lg font-serif font-semibold text-foreground mb-4">
              Resultado: transformação metabólica profunda, não apenas números na balança.
            </p>
            <a 
              href="/medicina-regenerativa" 
              className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Saiba mais sobre Medicina Regenerativa →
            </a>
          </div>
        </div>
      </TreatmentSection>

      <TransformacaoReal
        items={[
          {
            icon: Scale,
            title: "Perda de Peso Consistente",
            description: "Redução de 10-20% do peso corporal em 6-12 meses com acompanhamento adequado"
          },
          {
            icon: Brain,
            title: "Controle Mental da Alimentação",
            description: "Fim da obsessão por comida e dos ciclos de compulsão alimentar"
          },
          {
            icon: Heart,
            title: "Melhora Metabólica Profunda",
            description: "Normalização de glicemia, redução de triglicerídeos e melhora da pressão arterial"
          },
          {
            icon: Sparkles,
            title: "Mais Energia e Disposição",
            description: "Melhora significativa na qualidade de vida, mobilidade e autoestima"
          }
        ]}
        testimonial={{
          text: "Eu comia por ansiedade, não por fome. Tentei mil dietas e sempre desistia. As canetas emagrecedoras me deram o controle que eu nunca tive. Pela primeira vez, consigo escolher o que comer sem sentir que vou surtar de fome 2 horas depois. Já perdi 18kg em 7 meses e, mais importante, me sinto leve – fisicamente e emocionalmente.",
          author: "Paciente LevSer (acompanhamento com canetas emagrecedoras)"
        }}
      />

      <CTASection
        title="Pronta para retomar o controle?"
        description="Agende uma avaliação e descubra como as canetas emagrecedoras podem transformar sua relação com a comida."
      />

      <Footer />
    </>
  );
};

export default CanetasEmagrecedoras;
