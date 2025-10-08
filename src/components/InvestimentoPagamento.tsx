import { useState } from "react";
import { Users, ShieldCheck, TrendingUp, Calculator, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { GrafismoDecor } from "@/components/GrafismoDecor";
const beneficios = [{
  icon: Users,
  title: "Acompanhamento Contínuo",
  description: "Equipe médica, nutricional, psicológica e educador físico com consultas ilimitadas durante o programa e suporte via app 7 dias/semana"
}, {
  icon: ShieldCheck,
  title: "Sem Custos Ocultos",
  description: "Todos os exames e protocolos inclusos. Sem surpresas no meio do caminho. Garantia de transparência total em cada etapa"
}, {
  icon: TrendingUp,
  title: "Resultados Sustentáveis",
  description: "Foco em manutenção, não só perda rápida. Estratégias para evitar efeito rebote com monitoramento após alta"
}];
export const InvestimentoPagamento = () => {
  const [valores, setValores] = useState({
    dietas: "",
    remedios: "",
    academia: "",
    consultas: ""
  });
  const calcularTotal = () => {
    return Object.values(valores).reduce((acc, val) => {
      const num = parseFloat(val) || 0;
      return acc + num;
    }, 0);
  };
  const handleWhatsAppClick = () => {
    const phoneNumber = "5511997023024";
    const message = "Olá! Gostaria de simular meu plano personalizado.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };
  const scrollToSection = () => {
    const element = document.querySelector("#agendar");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };
  const total = calcularTotal();
  return <section className="relative py-20 bg-muted/30 overflow-hidden">
      <GrafismoDecor variant="floating" position="top-right" size="lg" opacity={0.15} rotate={25} color="gray" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
            Investimento em Sua Saúde
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">Mais do que um tratamento, um ecossistema completo de transformação sustentável. Sei que o investimento em saúde é uma decisão importante. Por isso, criei opções acessíveis e transparentes, com foco em resultados que duram — não em promessas vazias.</p>
        </div>

        {/* 3 Cards de Valor */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {beneficios.map((item, index) => {
          const Icon = item.icon;
          return <Card key={index} className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="p-3 rounded-full bg-primary/10">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </CardContent>
              </Card>;
        })}
        </div>

        {/* Mini-Calculadora */}
        <div className="max-w-3xl mx-auto mb-16">
          <Card className="border-primary/20 bg-card shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Calculator className="h-6 w-6 text-primary" />
                <h3 className="text-2xl font-serif font-bold text-foreground">
                  Reflexão Financeira: Quanto Você Já Investiu?
                </h3>
              </div>
              
              <p className="text-muted-foreground mb-6">
                Nos últimos 12 meses, quanto você gastou com:
              </p>

              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-[1fr,auto] gap-4 items-center">
                  <label className="text-sm font-medium text-foreground">Dietas comerciais/apps:</label>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">R$</span>
                    <Input type="number" placeholder="0" value={valores.dietas} onChange={e => setValores({
                    ...valores,
                    dietas: e.target.value
                  })} className="w-32 text-right" />
                  </div>
                </div>

                <div className="grid grid-cols-[1fr,auto] gap-4 items-center">
                  <label className="text-sm font-medium text-foreground">Remédios/suplementos:</label>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">R$</span>
                    <Input type="number" placeholder="0" value={valores.remedios} onChange={e => setValores({
                    ...valores,
                    remedios: e.target.value
                  })} className="w-32 text-right" />
                  </div>
                </div>

                <div className="grid grid-cols-[1fr,auto] gap-4 items-center">
                  <label className="text-sm font-medium text-foreground">Academia/personal:</label>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">R$</span>
                    <Input type="number" placeholder="0" value={valores.academia} onChange={e => setValores({
                    ...valores,
                    academia: e.target.value
                  })} className="w-32 text-right" />
                  </div>
                </div>

                <div className="grid grid-cols-[1fr,auto] gap-4 items-center">
                  <label className="text-sm font-medium text-foreground">Consultas isoladas:</label>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">R$</span>
                    <Input type="number" placeholder="0" value={valores.consultas} onChange={e => setValores({
                    ...valores,
                    consultas: e.target.value
                  })} className="w-32 text-right" />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-border/50">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-foreground">Total investido:</span>
                  <span className="text-3xl font-serif font-bold text-primary">
                    R$ {total.toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground text-center italic">
                  E os resultados? Quantos duram mais de 6 meses?
                </p>
                <p className="text-sm text-foreground text-center mt-4 leading-relaxed">
                  Investir em saúde de verdade significa ter uma equipe, protocolo científico e acompanhamento constante.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Opções de Pagamento */}
        <div className="max-w-3xl mx-auto mb-12">
          <h3 className="text-2xl font-serif font-bold text-foreground mb-6 text-center">
            Opções de Pagamento Facilitadas
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-border/50">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Parcelamento Facilitado</h4>
                    <p className="text-sm text-muted-foreground">Até 12x no cartão de crédito</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Reembolso Parcial</h4>
                    <p className="text-sm text-muted-foreground">Via convênio médico (quando aplicável)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Planos Corporativos</h4>
                    <p className="text-sm text-muted-foreground">Benefício de saúde para empresas</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Consulta Sem Compromisso</h4>
                    <p className="text-sm text-muted-foreground">Orçamento detalhado e transparente</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="max-w-3xl mx-auto mb-12">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground text-center leading-relaxed">
                <strong>Valores Personalizados:</strong> Os valores são individualizados de acordo com seu caso clínico, 
                exames necessários e protocolo escolhido. Na consulta de avaliação, você recebe um plano financeiro 
                completo e transparente.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" onClick={handleWhatsAppClick} className="group min-w-[280px]">
            Simular meu plano personalizado
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button size="lg" variant="outline" onClick={scrollToSection} className="min-w-[280px]">
            Agendar consulta de avaliação
          </Button>
        </div>
      </div>
    </section>;
};