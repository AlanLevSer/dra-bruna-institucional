import { 
  CheckCircle2, 
  ArrowRight, 
  UtensilsCrossed, 
  Activity, 
  Dumbbell, 
  Brain,
  MapPin,
  Zap,
  Target,
  Infinity as InfinityIcon,
  Syringe,
  Stethoscope,
  Wind,
  Pill,
  Flame
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { GrafismoDecor } from "@/components/GrafismoDecor";
import { PlanoTransformacao } from "@/components/PlanoTransformacao";
import programImage from "@/assets/patient-wellness-1.avif";
import { CONTACT } from "@/lib/constants";

const benefits = [
  "Vou te ajudar a transformar corpo, mente e autoestima",
  "Acompanhamento que respeita seu ritmo e sua história",
  "Nutrição leve, estratégica e que cabe na sua vida real",
  "Apoio comportamental para mudanças que se sustentam",
  "Você vai recuperar sua confiança e qualidade de vida",
  "Comunidade acolhedora que celebra cada vitória sua",
];

const pilares = [
  {
    icon: UtensilsCrossed,
    title: "Nutrição Inteligente",
    subtitle: "Alimentação que cabe na sua rotina, sem sofrimento",
    features: [
      "Plano por fases (não restritivo)",
      "Estratégias de saciedade e prazer",
      "Educação alimentar para autonomia"
    ]
  },
  {
    icon: Activity,
    title: "Saúde Metabólica & Regenerativa",
    subtitle: "Vou ajudar seu corpo a responder: hormônios, energia e metabolismo equilibrados",
      features: [
        "Otimização de insulina, glicemia e marcadores inflamatórios",
        "Nutrição celular para mitocôndrias 'eficientes'",
        "Programas regenerativos para preservar massa magra e queimar gordura"
      ]
  },
  {
    icon: Dumbbell,
    title: "Corpo em Movimento",
    subtitle: "Seu corpo vai ficar forte, funcional e com disposição de verdade",
    features: [
      "Rotina progressiva (sem exageros)",
      "Força + mobilidade + condicionamento",
      "Prevenção de dores e lesões"
    ]
  },
  {
    icon: Brain,
    title: "Mente & Comportamento",
    subtitle: "Você vai conseguir manter a constância, sem culpa, com apoio real",
    features: [
      "Ferramentas de escolha consciente",
      "Organização alimentar & ambiente",
      "Estratégias para recaídas e gatilhos"
    ]
  }
];

const fases = [
  {
    numero: "01",
    icon: MapPin,
    titulo: "Mapeamento & Direção",
    duracao: "2–4 semanas",
    objetivo: "Entender sua biologia, hábitos e metas",
    entregas: [
      "Exames completos",
      "Avaliação corporal",
      "Perfil comportamental",
      "Plano inicial personalizado"
    ],
    sinais: "Você está no caminho certo! Já dá para sentir os primeiros ajustes."
  },
  {
    numero: "02",
    icon: Zap,
    titulo: "Reset & Ritmo",
    duracao: "8–12 semanas",
    objetivo: "Destravar o peso com estratégia e constância. Introduzimos medidas metabólicas & regenerativas para reduzir inflamação, otimizar saciedade e aumentar gasto energético.",
    entregas: [
      "Intervenções possíveis: balão 6/12m, gastroplastia endoscópica, terapias injetáveis (se indicado)"
    ],
    sinais: "Continue assim! Medidas caindo, sono melhor, mais energia e confiança crescendo.",
    miniComparador: true
  },
    {
      numero: "03",
      icon: Target,
      titulo: "Consolidação & Autonomia",
      duracao: "12–16 semanas",
      objetivo: "Manter a perda e ganhar independência",
      entregas: [
        "Progressão de treino",
        "Reeducação alimentar avançada",
        "Ajustes regenerativos para preservar massa magra e melhorar sono/humor",
        "Alta supervisão clínica"
      ],
      sinais: "Seu esforço está valendo a pena. Rotina estável, exames melhores, autonomia crescendo.",
      miniComparadorFase3: true
    },
  {
    numero: "04",
    icon: InfinityIcon,
    titulo: "Manutenção & Estilo de Vida",
    duracao: "12+ meses",
    objetivo: "Não 'terminar', e sim sustentar",
    entregas: [
      "Calendário de checkpoints trimestrais",
      "Ciclos leves de programas regenerativos (trimestrais/semestrais)",
      "Plano de recaída",
      "Ajustes finos contínuos"
    ],
    sinais: "Você conseguiu! Peso estável, bem-estar duradouro, confiança plena. Conte sempre comigo.",
    miniComparadorFase4: true
  }
];

const intervencoes = [
  {
    icon: Wind,
    nome: "Balão 6/12m",
    descricao: "Saciedade imediata, recuperação rápida, reversível (12m pode ser ajustável)"
  },
  {
    icon: Stethoscope,
    nome: "Gastroplastia Endoscópica",
    descricao: "Redução interna do estômago, sem cortes, perda mais robusta, reversível"
  },
  {
    icon: Syringe,
    nome: "Terapias Injetáveis",
    descricao: "Controle de apetite/metabolismo, aliadas ao plano, exigem seguimento"
  },
  {
    icon: Pill,
    nome: "Canetas Emagrecedoras",
    descricao: "Mounjaro, Ozempic, Wegovy e Saxenda com acompanhamento médico especializado"
  },
  {
    icon: Flame,
    nome: "Plasma de Argônio",
    descricao: "Redução endoscópica do estômago por ablação térmica, minimamente invasivo"
  }
];

const intervencoesFase3 = [
  {
    icon: UtensilsCrossed,
    nome: "Nutrição Celular",
    descricao: "Suplementação avançada para otimizar metabolismo, energia e recuperação muscular"
  },
  {
    icon: Activity,
    nome: "Medicina Regenerativa",
    descricao: "Terapias para preservar massa magra, melhorar sono/humor e marcadores metabólicos"
  }
];

const intervencoesFase4 = [
  {
    icon: Brain,
    nome: "Ciência Comportamental",
    descricao: "Estratégias para manter hábitos sustentáveis, prevenir recaídas e fortalecer autonomia"
  },
  {
    icon: UtensilsCrossed,
    nome: "Nutrição Celular",
    descricao: "Otimização nutricional contínua para energia, metabolismo e longevidade"
  },
  {
    icon: Activity,
    nome: "Medicina Regenerativa",
    descricao: "Terapias de manutenção para saúde metabólica, vitalidade e bem-estar duradouro"
  }
];

export const ProgramaLevSer = () => {
  const navigate = useNavigate();
  const [quizOpen, setQuizOpen] = useState(false);

  return (
    <section id="programa" className="relative py-10 xl:py-12 bg-muted/30 overflow-hidden">
      <GrafismoDecor variant="background" position="top-left" size="lg" opacity={0.18} rotate={15} color="gray" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 xl:gap-12 items-center max-w-7xl mx-auto">
          <div className="order-2 lg:order-1 animate-fade-in">
            <div className="relative rounded-2xl overflow-hidden shadow-elegant max-w-sm xl:max-w-md mx-auto lg:mx-0">
              <img
                src={programImage}
                alt="Programa LevSer - Transformação com acompanhamento médico"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          <div className="order-1 lg:order-2 space-y-5 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full">
              <span className="text-sm font-medium text-primary">Programa Premium</span>
            </div>

            <h2 className="text-3xl md:text-4xl xl:text-5xl font-serif font-bold text-foreground">
              Programa LevSer
            </h2>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              <strong>Criei o Programa LevSer</strong> porque acredito que você merece mais do que dietas restritivas e promessas vazias. 
              Este é um programa de transformação integral que vai te reconectar com seu bem-estar, 
              autoestima e qualidade de vida. Vamos juntos, passo a passo, construir resultados que duram — não só números na balança.
            </p>

            <div className="space-y-4 pt-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="text-primary flex-shrink-0 mt-1" size={20} />
                  <p className="text-foreground/90">
                    {benefit === "Suporte emocional para mudanças sustentáveis" 
                      ? "Estratégia comportamental para mudanças sustentáveis"
                      : benefit}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-6 space-y-4">
              <div className="bg-card p-6 rounded-xl shadow-sm border border-border/50">
                <p className="text-sm text-muted-foreground mb-2">
                  Programas personalizados
                </p>
                <p className="text-2xl font-serif font-bold text-primary">
                  16, 24 ou 48 semanas
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  As mesmas fases de transformação, com duração ajustada conforme sua necessidade de otimização
                </p>
              </div>

              <div className="bg-accent/10 p-6 rounded-xl border border-accent/20">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Para Quem É Este Programa?
                </h3>
                <div className="space-y-3 mb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      IMC e perfil metabólico avaliados individualmente
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      Comprometimento com mudança sustentável
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      Disponibilidade para acompanhamento contínuo
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      Decisão compartilhada médico-paciente
                    </p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground/80 italic border-t border-accent/20 pt-4">
                  Este programa não é para todos. Nossa avaliação inicial define o melhor caminho — 
                  que pode incluir acompanhamento clínico, terapias endoscópicas ou cirúrgicas.
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* Seção: Os 4 Pilares do Programa */}
        <div className="mt-16 xl:mt-20 max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-serif font-bold text-foreground mb-4">
              Os 4 Pilares do Programa
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Desenvolvi um programa com menos fricção, mais ciência. Você no centro de tudo.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 xl:gap-8 mb-8">
            {pilares.map((pilar, index) => {
              const IconComponent = pilar.icon;
              return (
                <div 
                  key={index} 
                  className="bg-card p-6 xl:p-8 rounded-xl border border-border/50 shadow-sm hover:shadow-elegant transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col gap-4">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                      <IconComponent className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {pilar.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {pilar.subtitle}
                      </p>
                      <div className="space-y-2">
                        {pilar.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="text-primary flex-shrink-0 mt-0.5" size={16} />
                            <p className="text-sm text-foreground/90">{feature}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              onClick={() => {
                const message = "Olá! Quero conhecer meu plano personalizado pelos 4 pilares do Programa LevSer.";
                window.open(`${CONTACT.WHATSAPP_URL.split('?')[0]}?text=${encodeURIComponent(message)}`, '_blank');
              }}
              className="bg-gradient-premium hover:opacity-90 transition-opacity group"
            >
              Quero meu plano pelos 4 pilares
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Seção: Sua Jornada em 4 Fases */}
        <div className="mt-16 xl:mt-20 max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-serif font-bold text-foreground mb-4">
              Sua Jornada em 4 Fases
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Resultados que ficam — rotina possível, não perfeita.
            </p>
          </div>

          <div className="space-y-8">
            {fases.map((fase, index) => {
              const IconComponent = fase.icon;
              return (
                <div 
                  key={index}
                  className="relative bg-card p-6 xl:p-8 rounded-xl border border-border/50 shadow-sm animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Número e Ícone */}
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full bg-gradient-premium flex items-center justify-center mb-2">
                          <span className="text-2xl font-bold text-white">{fase.numero}</span>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                    </div>

                    {/* Conteúdo */}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                        <h3 className="text-2xl font-serif font-bold text-foreground">
                          {fase.titulo}
                        </h3>
                        <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full w-fit">
                          {fase.duracao}
                        </span>
                      </div>

                      <p className="text-base font-medium text-foreground mb-4">
                        <span className="text-muted-foreground">Objetivo: </span>
                        {fase.objetivo}
                      </p>

                      <div className="space-y-3 mb-4">
                        <p className="text-sm font-semibold text-foreground">Entregáveis:</p>
                        <div className="space-y-2">
                          {fase.entregas.map((entrega, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="text-primary flex-shrink-0 mt-0.5" size={16} />
                              <p className="text-sm text-muted-foreground">{entrega}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <p className="text-sm italic text-muted-foreground/80 border-l-2 border-primary pl-4">
                        <span className="font-semibold not-italic">Sinais de sucesso: </span>
                        {fase.sinais}
                      </p>

                      {/* Mini-Comparador (apenas Fase 2) */}
                      {fase.miniComparador && (
                        <div className="mt-6 pt-6 border-t border-border/50">
                          <p className="text-sm font-semibold text-foreground mb-4">
                            Intervenções possíveis nesta fase:
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                            {intervencoes.map((intervencao, idx) => {
                              const InterIcon = intervencao.icon;
                              return (
                                <div 
                                  key={idx}
                                  className="bg-accent/10 p-4 rounded-lg border border-accent/20"
                                >
                                  <div className="flex items-center gap-2 mb-2">
                                    <InterIcon className="w-5 h-5 text-primary" />
                                    <p className="text-sm font-bold text-foreground">
                                      {intervencao.nome}
                                    </p>
                                  </div>
                                  <p className="text-xs text-muted-foreground">
                                    {intervencao.descricao}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setQuizOpen(true)}
                            className="w-full sm:w-auto"
                          >
                            Descobrir meu melhor caminho (60s)
                          </Button>
                        </div>
                      )}

                      {/* Mini-Comparador Fase 3 */}
                      {fase.miniComparadorFase3 && (
                        <div className="mt-6 pt-6 border-t border-border/50">
                          <p className="text-sm font-semibold text-foreground mb-4">
                            Terapias de suporte nesta fase:
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            {intervencoesFase3.map((intervencao, idx) => {
                              const InterIcon = intervencao.icon;
                              return (
                                <div 
                                  key={idx}
                                  className="bg-accent/10 p-4 rounded-lg border border-accent/20"
                                >
                                  <div className="flex items-center gap-2 mb-2">
                                    <InterIcon className="w-5 h-5 text-primary" />
                                    <p className="text-sm font-bold text-foreground">
                                      {intervencao.nome}
                                    </p>
                                  </div>
                                  <p className="text-xs text-muted-foreground">
                                    {intervencao.descricao}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                          <div className="flex flex-col sm:flex-row gap-3">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => navigate('/nutricao-celular')}
                              className="w-full sm:w-auto"
                            >
                              Saiba mais sobre Nutrição Celular
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => navigate('/medicina-regenerativa')}
                              className="w-full sm:w-auto"
                            >
                              Saiba mais sobre Medicina Regenerativa
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Mini-Comparador Fase 4 */}
                      {fase.miniComparadorFase4 && (
                        <div className="mt-6 pt-6 border-t border-border/50">
                          <p className="text-sm font-semibold text-foreground mb-4">
                            Pilares fundamentais para manutenção e otimização contínua da saúde:
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                            {intervencoesFase4.map((intervencao, idx) => {
                              const InterIcon = intervencao.icon;
                              return (
                                <div 
                                  key={idx}
                                  className="bg-accent/10 p-4 rounded-lg border border-accent/20"
                                >
                                  <div className="flex items-center gap-2 mb-2">
                                    <InterIcon className="w-5 h-5 text-primary" />
                                    <p className="text-sm font-bold text-foreground">
                                      {intervencao.nome}
                                    </p>
                                  </div>
                                  <p className="text-xs text-muted-foreground">
                                    {intervencao.descricao}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                          <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                            <p className="text-sm text-muted-foreground">
                              <span className="font-semibold text-foreground">Manutenção Inteligente:</span> Estes três pilares trabalham juntos para garantir que seus resultados sejam duradouros. Não é sobre perfeição, mas sobre consistência e ajustes contínuos.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <Button
              size="lg"
              onClick={() => {
                const phone = "5511997023024";
                const message = "Olá! Quero seguir a jornada em 4 fases do Programa LevSer.";
                window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
              }}
              className="bg-gradient-premium hover:opacity-90 transition-opacity group"
            >
              Quero seguir a jornada em 4 fases
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>

      <PlanoTransformacao open={quizOpen} onOpenChange={setQuizOpen} />
    </section>
  );
};
