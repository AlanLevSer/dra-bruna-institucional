import { useState } from "react";
import {
  CheckCircle2,
  ArrowRight,
  UtensilsCrossed,
  Activity,
  Brain,
  MapPin,
  Zap,
  Target,
  Infinity as InfinityIcon,
  Syringe,
  Wind,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { PlanoTransformacao } from "@/components/PlanoTransformacao";

const fases = [
  {
    numero: "01",
    icon: MapPin,
    titulo: "Mapeamento & Direção",
    duracao: "24 semanas",
    objetivo: "Entender sua biologia, hábitos e metas.",
    entregas: [
      "Exames completos",
      "Avaliação corporal",
      "Perfil comportamental",
      "Plano inicial personalizado",
    ],
    sinais: "Você está no caminho certo! Já dá para sentir os primeiros ajustes.",
  },
  {
    numero: "02",
    icon: Zap,
    titulo: "Reset & Ritmo",
    duracao: "812 semanas",
    objetivo:
      "Destravar o peso com estratégia e constância. Introduzimos medidas metabólicas e regenerativas para reduzir inflamação, otimizar saciedade e aumentar gasto energético.",
    entregas: [
      "Intervenções possíveis: balão 6/12m, terapias injetáveis (quando indicadas)",
    ],
    sinais: "Continue assim! Medidas caindo, sono melhor, mais energia e confiança crescendo.",
    miniComparador: true,
  },
  {
    numero: "03",
    icon: Target,
    titulo: "Consolidação & Autonomia",
    duracao: "1216 semanas",
    objetivo: "Manter a perda e ganhar independência.",
    entregas: [
      "Progressão de treino",
      "Reeducação alimentar avançada",
      "Ajustes regenerativos para preservar massa magra e melhorar sono/humor",
      "Alta supervisão clínica",
    ],
    sinais: "Seu esforço está valendo a pena. Rotina estável, exames melhores, autonomia crescendo.",
    miniComparadorFase3: true,
  },
  {
    numero: "04",
    icon: InfinityIcon,
    titulo: "Manutenção & Estilo de Vida",
    duracao: "12+ meses",
    objetivo: "Não Sterminar⬝, e sim sustentar.",
    entregas: [
      "Calendário de checkpoints trimestrais",
      "Ciclos leves de programas regenerativos (trimestrais/semestrais)",
      "Plano de recaída",
      "Ajustes finos contínuos",
    ],
    sinais: "Você conseguiu! Peso estável, bem-estar duradouro, confiança plena. Conte sempre comigo.",
    miniComparadorFase4: true,
  },
];

const intervencoes = [
  {
    icon: Wind,
    nome: "Balão 6/12m",
    descricao: "Saciedade imediata, recuperação rápida, opção reversível (12m pode ser ajustável).",
  },
  {
    icon: Syringe,
    nome: "Terapias injetáveis",
    descricao: "Controle de apetite/metabolismo aliado ao plano, com acompanhamento contínuo.",
  },
];

const intervencoesFase3 = [
  {
    icon: UtensilsCrossed,
    nome: "Nutrição Celular",
    descricao: "Suplementação avançada para otimizar metabolismo, energia e recuperação muscular.",
  },
  {
    icon: Activity,
    nome: "Medicina Regenerativa",
    descricao: "Terapias para preservar massa magra, melhorar sono/humor e marcadores metabólicos.",
  },
];

const intervencoesFase4 = [
  {
    icon: Brain,
    nome: "Ciência Comportamental",
    descricao: "Estratégias para manter hábitos sustentáveis, prevenir recaídas e fortalecer autonomia.",
  },
  {
    icon: UtensilsCrossed,
    nome: "Nutrição Celular",
    descricao: "Otimização nutricional contínua para energia, metabolismo e longevidade.",
  },
  {
    icon: Activity,
    nome: "Medicina Regenerativa",
    descricao: "Terapias de manutenção para saúde metabólica, vitalidade e bem-estar duradouro.",
  },
];

export const JornadaFasesVendas = () => {
  const navigate = useNavigate();
  const [quizOpen, setQuizOpen] = useState(false);

  return (
    <section className="relative py-16 md:py-20 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl xl:text-5xl font-serif font-bold text-foreground mb-4">
            Sua jornada em 4 fases
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Resultados que ficam  rotina possível, não perfeita. Vamos juntas construir consistência, confiança e saúde duradoura.
          </p>
        </div>

        <div className="space-y-6">
          {fases.map((fase, index) => (
            <div
              key={fase.numero}
              className="bg-card rounded-2xl shadow-elegant border border-border/50 overflow-hidden animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/5 bg-primary/5 p-6 flex items-start gap-4">
                  <div className="flex flex-col items-center gap-3">
                    <span className="w-14 h-14 rounded-full bg-primary text-primary-foreground font-semibold flex items-center justify-center text-lg">
                      {fase.numero}
                    </span>
                    <fase.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-wide text-muted-foreground font-semibold">
                      {fase.duracao}
                    </p>
                    <h3 className="text-xl font-serif font-bold text-foreground">{fase.titulo}</h3>
                  </div>
                </div>

                <div className="lg:w-4/5 p-6 md:p-8 space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">Objetivo:</p>
                    <p className="text-base text-muted-foreground leading-relaxed">{fase.objetivo}</p>
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-foreground">Entregáveis:</p>
                    <ul className="grid md:grid-cols-2 gap-2">
                      {fase.entregas.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-primary mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-primary/5 border border-primary/10 rounded-lg p-4 text-sm text-muted-foreground italic">
                    Sinais de sucesso: {fase.sinais}
                  </div>

                  {fase.miniComparador && (
                    <div className="mt-6 pt-6 border-t border-border/50">
                      <p className="text-sm font-semibold text-foreground mb-4">
                        Intervenções possíveis nesta fase:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {intervencoes.map((intervencao, idx) => {
                          const Icon = intervencao.icon;
                          return (
                            <div key={idx} className="bg-accent/10 p-4 rounded-lg border border-accent/20">
                              <div className="flex items-center gap-2 mb-2">
                                <Icon className="w-5 h-5 text-primary" />
                                <p className="text-sm font-bold text-foreground">{intervencao.nome}</p>
                              </div>
                              <p className="text-xs text-muted-foreground">{intervencao.descricao}</p>
                            </div>
                          );
                        })}
                      </div>
                      <div className="mt-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setQuizOpen(true)}
                          className="w-full sm:w-auto"
                        >
                          Descobrir meu melhor caminho (60s)
                        </Button>
                      </div>
                    </div>
                  )}

                  {fase.miniComparadorFase3 && (
                    <div className="mt-6 pt-6 border-t border-border/50">
                      <p className="text-sm font-semibold text-foreground mb-4">
                        Terapias de suporte nesta fase:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        {intervencoesFase3.map((intervencao, idx) => {
                          const Icon = intervencao.icon;
                          return (
                            <div key={idx} className="bg-accent/10 p-4 rounded-lg border border-accent/20">
                              <div className="flex items-center gap-2 mb-2">
                                <Icon className="w-5 h-5 text-primary" />
                                <p className="text-sm font-bold text-foreground">{intervencao.nome}</p>
                              </div>
                              <p className="text-xs text-muted-foreground">{intervencao.descricao}</p>
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => navigate("/nutricao-celular")}
                          className="w-full sm:w-auto"
                        >
                          Saiba mais sobre Nutrição Celular
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => navigate("/medicina-regenerativa")}
                          className="w-full sm:w-auto"
                        >
                          Saiba mais sobre Medicina Regenerativa
                        </Button>
                      </div>
                    </div>
                  )}

                  {fase.miniComparadorFase4 && (
                    <div className="mt-6 pt-6 border-t border-border/50">
                      <p className="text-sm font-semibold text-foreground mb-4">
                        Pilares fundamentais para manutenção e otimização contínua da saúde:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                        {intervencoesFase4.map((intervencao, idx) => {
                          const Icon = intervencao.icon;
                          return (
                            <div key={idx} className="bg-accent/10 p-4 rounded-lg border border-accent/20">
                              <div className="flex items-center gap-2 mb-2">
                                <Icon className="w-5 h-5 text-primary" />
                                <p className="text-sm font-bold text-foreground">{intervencao.nome}</p>
                              </div>
                              <p className="text-xs text-muted-foreground">{intervencao.descricao}</p>
                            </div>
                          );
                        })}
                      </div>
                      <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                        <p className="text-sm text-muted-foreground">
                          <span className="font-semibold text-foreground">Manutenção inteligente:</span> estes três pilares trabalham juntos para garantir que seus resultados sejam duradouros. Não é sobre perfeição, mas sobre consistência e ajustes contínuos.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button
            size="lg"
            onClick={() => {
              const phone = "5511997023024";
              const message = "Olá! Quero seguir a jornada em 4 fases do Programa LevSer.";
              try { trackEvent("jornada_fases_cta", { path: window.location.pathname }); } catch (e) { void e; }
              window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
            }}
            className="bg-gradient-premium hover:opacity-90 transition-opacity group"
          >
            Quero seguir a jornada em 4 fases
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>

      <PlanoTransformacao open={quizOpen} onOpenChange={setQuizOpen} />
    </section>
  );
};



