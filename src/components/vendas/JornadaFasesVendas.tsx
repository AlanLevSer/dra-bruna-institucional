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
  Infinity,
  Syringe,
  Wind
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { PlanoTransformacao } from "@/components/PlanoTransformacao";

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
      "Intervenções possíveis: balão 6/12m, terapias injetáveis (se indicado)"
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
    icon: Infinity,
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
    icon: Syringe,
    nome: "Terapias Injetáveis",
    descricao: "Controle de apetite/metabolismo, aliadas ao plano, exigem seguimento"
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

export const JornadaFasesVendas = () => {
  const navigate = useNavigate();
  const [quizOpen, setQuizOpen] = useState(false);

  return (
    <section className="relative py-16 md:py-20 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
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
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
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
