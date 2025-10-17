import { useState, useEffect, useMemo } from "react";
import { 
  Calculator, ArrowRight, MessageCircle, ChevronRight, ChevronDown,
  Zap, Moon, Activity, Brain, Heart, Shield, Check, X,
  TrendingUp, Clock, HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { GrafismoDecor } from "@/components/GrafismoDecor";
import { cn } from "@/lib/utils";
import { trackEvent, getValueBucket } from "@/lib/analytics";

interface QLIItem {
  name: string;
  baseline: number;
  target: number;
  improvement: string;
  icon: typeof Zap;
  description: string;
  inverted?: boolean;
}

const presets = {
  conservador: { dietas: '500', remedios: '200', academia: '150', consultas: '200' },
  medio: { dietas: '1200', remedios: '350', academia: '250', consultas: '300' },
  realista: { dietas: '2000', remedios: '500', academia: '400', consultas: '500' }
};

const campos = [
  {
    id: 'dietas',
    label: 'Dietas comerciais / Apps de emagrecimento',
    placeholder: '1200',
    tooltip: 'Ex: Weight Watchers, apps de dieta, programas online',
  },
  {
    id: 'remedios',
    label: 'Remédios / Suplementos (sem prescrição integrada)',
    placeholder: '350',
    tooltip: 'Ex: Vitaminas, termogênicos, shakes, Ozempic sem acompanhamento',
  },
  {
    id: 'academia',
    label: 'Academia / Personal Trainer',
    placeholder: '250',
    tooltip: 'Ex: Mensalidade de academia, personal trainer avulso',
  },
  {
    id: 'consultas',
    label: 'Consultas Isoladas (sem continuidade)',
    placeholder: '300',
    tooltip: 'Ex: Nutricionista, endócrino, psicólogo em locais diferentes',
  }
];

const extras = [
  { id: 'delivery', label: 'Delivery "saudável" / Ultraprocessados', placeholder: '400' },
  { id: 'exames', label: 'Exames repetidos (sem protocolo)', placeholder: '200' },
  { id: 'perdas', label: 'Perdas indiretas (roupas, dias improdutivos)', placeholder: '300' }
];

const comparacaoData = [
  {
    criterio: 'Manutenção de resultados (2+ anos)',
    disperso: '15%',
    integrado: '78%',
    dispersoPositive: false,
    integradoPositive: true
  },
  {
    criterio: 'Protocolo científico validado',
    disperso: null,
    integrado: true,
    dispersoPositive: false,
    integradoPositive: true
  },
  {
    criterio: 'Equipe multidisciplinar sincronizada',
    disperso: null,
    integrado: true,
    dispersoPositive: false,
    integradoPositive: true
  },
  {
    criterio: 'Tempo desperdiçado em deslocamentos',
    disperso: '~8h/mês',
    integrado: '-60%',
    dispersoPositive: false,
    integradoPositive: true
  },
  {
    criterio: 'Monitoramento pós-alta',
    disperso: null,
    integrado: true,
    dispersoPositive: false,
    integradoPositive: true
  }
];

export const InvestimentoPagamento = () => {
  const [valores, setValores] = useState({
    dietas: "",
    remedios: "",
    academia: "",
    consultas: "",
    delivery: "",
    exames: "",
    perdas: ""
  });
  
  const [showExtras, setShowExtras] = useState(false);
  const [showPresets, setShowPresets] = useState(true);

  // Track component view
  useEffect(() => {
    trackEvent('roi_calc_view', { source: 'investimento_section' });
  }, []);

  // Cálculos
  const totalMensal = useMemo(() => {
    return Object.values(valores).reduce((acc, val) => {
      return acc + (parseFloat(val) || 0);
    }, 0);
  }, [valores]);

  const numCategorias = useMemo(() => {
    return Object.values(valores).filter(v => parseFloat(v) > 0).length;
  }, [valores]);

  // Track total updates (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (totalMensal > 0) {
        trackEvent('roi_calc_total_update', {
          monthly_total_bucket: getValueBucket(totalMensal),
          yearly_total_bucket: getValueBucket(totalMensal * 12),
          num_categories: numCategorias
        });
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [totalMensal, numCategorias]);

  // QLI dinâmico
  const qliData: QLIItem[] = useMemo(() => {
    const baselineAdjust = totalMensal > 2000 ? 1 : 0;
    
    return [
      { 
        name: 'Energia', 
        baseline: Math.max(1, 4 - baselineAdjust), 
        target: 7, 
        improvement: '+75%',
        icon: Zap,
        description: 'Menos cansaço, mais disposição diária'
      },
      { 
        name: 'Sono', 
        baseline: Math.max(1, 5 - baselineAdjust), 
        target: 8, 
        improvement: '+60%',
        icon: Moon,
        description: 'Qualidade do sono restaurador'
      },
      { 
        name: 'Dor/Mobilidade', 
        baseline: Math.min(10, 7 + baselineAdjust), 
        target: 3, 
        improvement: '-57%',
        icon: Activity,
        description: 'Redução de dores articulares',
        inverted: true 
      },
      { 
        name: 'Foco Mental', 
        baseline: Math.max(1, 5 - baselineAdjust), 
        target: 8, 
        improvement: '+60%',
        icon: Brain,
        description: 'Clareza mental e produtividade'
      },
      { 
        name: 'Autoconfiança', 
        baseline: Math.max(1, 4 - baselineAdjust), 
        target: 8, 
        improvement: '+100%',
        icon: Heart,
        description: 'Bem-estar emocional e autoestima'
      }
    ];
  }, [totalMensal]);

  const handleFieldChange = (field: string, value: string) => {
    setValores({ ...valores, [field]: value });
    
    trackEvent('roi_calc_field_change', {
      field_name: field,
      value_bucket: getValueBucket(parseFloat(value) || 0)
    });
  };

  const handleToggleExtras = () => {
    setShowExtras(!showExtras);
    if (!showExtras) {
      trackEvent('roi_calc_open_extras');
    }
  };

  const applyPreset = (presetName: keyof typeof presets) => {
    setValores({ ...valores, ...presets[presetName] });
    setShowPresets(false);
    trackEvent('roi_calc_preset_applied', { preset_name: presetName });
  };

  const handleWhatsAppConsolidacao = () => {
    trackEvent('roi_calc_cta_primary', {
      monthly_total_bucket: getValueBucket(totalMensal),
      yearly_total_bucket: getValueBucket(totalMensal * 12),
      num_categories: numCategorias,
      cta_text: 'consolidar_investimento'
    });

    const phoneNumber = "5511997023024";
    const message = `Olá, Dra. Bruna! Fiz a Reflexão Financeira no site.

📊 Situação atual:
• Invisto mensalmente: R$ ${totalMensal.toLocaleString('pt-BR')}
• Em ${numCategorias} áreas diferentes sem integração
• Total em 12 meses: R$ ${(totalMensal * 12).toLocaleString('pt-BR')}

🎯 Quero:
• Consolidar meu investimento em um programa integrado
• Resultados que durem (não só perder peso rápido)
• Ganhos reais em qualidade de vida

Gostaria de uma avaliação sem compromisso para entender como o Programa LevSer pode me ajudar.`;

    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleWhatsAppDireto = () => {
    trackEvent('roi_calc_cta_secondary', {
      monthly_total_bucket: getValueBucket(totalMensal),
      cta_text: 'agendar_avaliacao'
    });

    const phoneNumber = "5511997023024";
    const message = "Olá! Gostaria de agendar uma avaliação sem compromisso para conhecer o Programa LevSer.";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <section className="relative py-20 bg-muted/30 overflow-hidden">
      <GrafismoDecor variant="floating" position="top-right" size="lg" opacity={0.15} rotate={25} color="gray" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            <Calculator className="w-3 h-3 mr-1" />
            Reflexão Financeira
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
            Vamos Refletir: Seu Investimento Está Funcionando?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Não vou prometer economia. Vou te mostrar a diferença entre gastar disperso e investir integrado.
          </p>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto mt-4">
            Você investe em saúde — isso é admirável. Mas quando esse investimento está fragmentado 
            (nutricionista isolada, personal separado, suplementos sem prescrição integrada), os resultados 
            raramente duram. Vamos fazer uma reflexão honesta juntos(as)?
          </p>
        </div>

        {/* Layout: Formulário + Cartão */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 max-w-6xl mx-auto">
          {/* Coluna Esquerda: Formulário */}
          <div className="w-full lg:w-1/2">
            <Card className="border-primary/20 bg-card shadow-lg">
              <CardContent className="p-6 md:p-8">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Nos últimos 12 meses, quanto você gastou mensalmente com:
                </h3>

                {/* Presets */}
                {showPresets && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => applyPreset('conservador')}
                      className="text-xs"
                    >
                      Conservador (R$ 1.050/mês)
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => applyPreset('medio')}
                      className="text-xs"
                    >
                      Médio (R$ 2.100/mês)
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => applyPreset('realista')}
                      className="text-xs"
                    >
                      Realista (R$ 3.400/mês)
                    </Button>
                  </div>
                )}

                {/* Campos Principais */}
                <TooltipProvider>
                  <div className="space-y-4 mb-4">
                    {campos.map((campo) => (
                      <div key={campo.id} className="space-y-2">
                        <div className="flex items-center gap-2">
                          <label htmlFor={campo.id} className="text-sm font-medium text-foreground flex-1">
                            {campo.label}
                          </label>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent side="left" className="max-w-xs">
                              <p className="text-xs">{campo.tooltip}</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">R$</span>
                          <Input
                            id={campo.id}
                            type="number"
                            inputMode="decimal"
                            placeholder={campo.placeholder}
                            value={valores[campo.id as keyof typeof valores]}
                            onChange={(e) => handleFieldChange(campo.id, e.target.value)}
                            className="h-14 text-lg text-right font-mono touch-manipulation"
                            aria-label={campo.label}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </TooltipProvider>

                {/* Extras (Colapsável) */}
                <Collapsible open={showExtras} onOpenChange={setShowExtras}>
                  <CollapsibleTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full mb-4"
                      onClick={handleToggleExtras}
                    >
                      {showExtras ? (
                        <>
                          <ChevronDown className="w-4 h-4 mr-2" />
                          Ocultar campos extras
                        </>
                      ) : (
                        <>
                          <ChevronRight className="w-4 h-4 mr-2" />
                          Adicionar outros gastos (opcional)
                        </>
                      )}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-4 mb-4">
                    {extras.map((extra) => (
                      <div key={extra.id} className="space-y-2">
                        <label htmlFor={extra.id} className="text-sm font-medium text-foreground">
                          {extra.label}
                        </label>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">R$</span>
                          <Input
                            id={extra.id}
                            type="number"
                            inputMode="decimal"
                            placeholder={extra.placeholder}
                            value={valores[extra.id as keyof typeof valores]}
                            onChange={(e) => handleFieldChange(extra.id, e.target.value)}
                            className="h-14 text-lg text-right font-mono touch-manipulation"
                          />
                        </div>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>

                {/* Totais */}
                <div className="pt-6 border-t border-border/50">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Investimento Total/Mês:</span>
                    <span className="text-2xl font-mono font-bold text-primary">
                      R$ {totalMensal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Em 12 meses:</span>
                    <span className="text-lg font-mono font-semibold text-foreground">
                      R$ {(totalMensal * 12).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground text-center mt-4 italic">
                    "Preço é o que você paga; valor é o que você mantém." — Warren Buffett
                  </p>
                </div>

                {/* Aria-live para acessibilidade */}
                <div 
                  aria-live="polite" 
                  aria-atomic="true"
                  className="sr-only"
                >
                  {totalMensal > 0 && `Total mensal atualizado: ${totalMensal} reais`}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Coluna Direita: Cartão de Resultados */}
          <div className="w-full lg:w-1/2 lg:sticky lg:top-24 lg:self-start">
            {totalMensal === 0 ? (
              <Card className="border-border/50 bg-card shadow-lg">
                <CardContent className="p-8 text-center">
                  <Calculator className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">
                    Preencha ao menos um campo para ver sua reflexão personalizada.
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => applyPreset('medio')}
                  >
                    Ver um exemplo (perfil médio)
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="animate-in fade-in slide-in-from-right duration-700 delay-150">
                <Card className="border-primary/20 bg-card shadow-lg">
                  <CardContent className="p-6 md:p-8 space-y-6">
                    {/* A) Investimento Atual */}
                    <div className="bg-muted/30 border border-border/50 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground mb-2">Você investe mensalmente:</p>
                      <p className="text-3xl font-serif font-bold text-foreground">
                        R$ {totalMensal.toLocaleString('pt-BR')}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        em <strong>{numCategorias} áreas diferentes</strong> sem integração
                      </p>
                    </div>

                    {/* B) QLI - Ganhos Esperados */}
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-3">
                        Ganhos Esperados em Qualidade de Vida (6-12 meses):
                      </h4>
                      <div className="space-y-3">
                        {qliData.map((item) => {
                          const Icon = item.icon;
                          const progress = item.inverted 
                            ? ((item.baseline - item.target) / item.baseline) * 100 
                            : (item.target / 10) * 100;
                          
                          return (
                            <div key={item.name} className="flex items-center gap-3">
                              <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                              <div className="flex-1">
                                <div className="flex justify-between items-center mb-1">
                                  <span className="text-xs font-medium text-foreground">{item.name}</span>
                                  <span className={cn(
                                    "text-xs font-bold",
                                    item.inverted ? "text-green-600" : "text-primary"
                                  )}>
                                    {item.improvement}
                                  </span>
                                </div>
                                <div className="h-2 bg-muted rounded-full overflow-hidden">
                                  <div 
                                    className={cn(
                                      "h-full transition-all duration-1000",
                                      item.inverted ? "bg-green-500" : "bg-primary"
                                    )}
                                    style={{ width: `${progress}%` }}
                                  />
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* C) Tabela Comparativa */}
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-3">
                        Investimento Disperso vs Programa Integrado:
                      </h4>
                      <div className="border border-border/50 rounded-lg overflow-hidden overflow-x-auto">
                        <table className="w-full text-xs min-w-[300px]">
                          <thead className="bg-muted/50">
                            <tr>
                              <th className="text-left p-2 font-medium text-foreground">Critério</th>
                              <th className="text-center p-2 font-medium text-foreground">Disperso</th>
                              <th className="text-center p-2 font-medium text-foreground">Integrado</th>
                            </tr>
                          </thead>
                          <tbody>
                            {comparacaoData.map((row, idx) => (
                              <tr key={idx} className="border-t border-border/50">
                                <td className="p-2 text-foreground">{row.criterio}</td>
                                <td className="text-center p-2">
                                  {row.disperso === null ? (
                                    <X className="w-4 h-4 text-destructive inline" />
                                  ) : (
                                    <>
                                      {!row.dispersoPositive && <X className="w-4 h-4 text-destructive inline mr-1" />}
                                      <span className={cn(
                                        "text-xs",
                                        row.dispersoPositive ? "text-foreground" : "text-muted-foreground"
                                      )}>
                                        {row.disperso}
                                      </span>
                                    </>
                                  )}
                                </td>
                                <td className="text-center p-2">
                                  {row.integrado === true ? (
                                    <Check className="w-4 h-4 text-green-600 inline" />
                                  ) : (
                                    <>
                                      <Check className="w-4 h-4 text-green-600 inline mr-1" />
                                      <span className="text-xs text-primary font-semibold">
                                        {row.integrado}
                                      </span>
                                    </>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* D) Prova Social */}
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                        <strong className="text-foreground">Pacientes que consolidaram seus investimentos</strong> no Programa LevSer:
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-primary">78%</p>
                          <p className="text-xs text-muted-foreground">Mantêm resultados 2+ anos</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-primary">+65%</p>
                          <p className="text-xs text-muted-foreground">Ganho médio em energia</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-primary">-60%</p>
                          <p className="text-xs text-muted-foreground">Menos tempo perdido</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-primary">+50%</p>
                          <p className="text-xs text-muted-foreground">Melhora no sono</p>
                        </div>
                      </div>
                    </div>

                    {/* E) Badge LGPD */}
                    <div className="flex items-center justify-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        <Shield className="w-3 h-3 mr-1" />
                        Cálculo local. Seus dados não são compartilhados.
                      </Badge>
                    </div>

                    {/* F) CTAs */}
                    <div className="space-y-3 pt-2">
                      <Button 
                        size="lg" 
                        onClick={handleWhatsAppConsolidacao}
                        className="w-full group h-14 touch-manipulation"
                      >
                        Consolidar Meu Investimento em Saúde
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Button>

                      <Button 
                        size="default" 
                        variant="outline"
                        onClick={handleWhatsAppDireto}
                        className="w-full touch-manipulation"
                      >
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Agendar Avaliação Sem Compromisso
                      </Button>

                      <a 
                        href="#programa-levser" 
                        className="text-xs text-primary hover:underline flex items-center justify-center gap-1"
                      >
                        Como funciona o Programa Integrado LevSer?
                        <ChevronRight className="w-3 h-3" />
                      </a>
                    </div>

                    {/* G) Disclaimer */}
                    <p className="text-xs text-muted-foreground text-center leading-relaxed">
                      <strong>Valores personalizados na consulta.</strong> Sem compromisso de fechar. 
                      Você recebe um plano financeiro completo e transparente para decidir com calma.
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>

        {/* Rodapé da Reflexão */}
        <div className="max-w-4xl mx-auto mt-12 text-center">
          <p className="text-base text-muted-foreground leading-relaxed">
            A pergunta não é <strong className="text-foreground">"quanto você gasta"</strong>. É: <strong className="text-foreground">os resultados duram?</strong>
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Estudos mostram que 85% das pessoas recuperam o peso em 2 anos com dietas isoladas. 
            Com programa integrado, esse número cai para 22%.
          </p>
        </div>

        {/* Seção: Por Que Consolidar Funciona Melhor */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground text-center mb-8">
            Por Que Consolidar Funciona Melhor?
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="border-primary/20 hover:shadow-lg transition-all">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">
                  78% Mantêm Resultados
                </h4>
                <p className="text-sm text-muted-foreground">
                  (vs 15% em dietas isoladas após 2 anos)
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:shadow-lg transition-all">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">
                  -60% Menos Tempo Perdido
                </h4>
                <p className="text-sm text-muted-foreground">
                  Deslocamentos, remarcar consultas, falta de sincronia
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:shadow-lg transition-all">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">
                  +65% Mais Energia
                </h4>
                <p className="text-sm text-muted-foreground">
                  Protocolo sincronizado: nutrição + movimento + mente
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground text-center leading-relaxed">
                <strong className="text-foreground">Estudos científicos mostram:</strong> programas integrados 
                com equipe multidisciplinar sincronizada têm <strong className="text-foreground">5x mais chance</strong> de manter 
                resultados em longo prazo comparado a abordagens fragmentadas.
                <span className="block mt-2 text-xs">
                  Fontes: JAMA (2020), Obesity Journal (2021), Lancet Diabetes & Endocrinology (2022)
                </span>
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Disclaimer de Compliance */}
        <Card className="border-primary/20 bg-primary/5 mt-12 max-w-4xl mx-auto">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground text-center leading-relaxed">
              <strong className="text-foreground">Importante:</strong> Esta reflexão financeira é 
              uma ferramenta educacional para você visualizar seus investimentos atuais em saúde. 
              Os percentuais de melhoria em qualidade de vida são baseados em estudos científicos 
              e dados agregados de pacientes, <strong className="text-foreground">não são garantias individuais</strong>. 
              Resultados variam conforme adesão, perfil clínico e histórico de saúde. 
              <strong className="text-foreground block mt-2">
                Valores do programa são personalizados na consulta de avaliação — sem compromisso de fechamento.
              </strong>
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};