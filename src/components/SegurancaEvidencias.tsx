import { Building2, Award, FileCheck, Activity, AlertTriangle, CheckCircle, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GrafismoDecor } from "@/components/GrafismoDecor";
import { CONTACT } from "@/lib/constants";
const pilares = [{
  icon: Building2,
  title: "Centro Credenciado",
  items: ["Centro cirúrgico credenciado pela ANVISA", "Equipamentos de última geração", "Protocolos de biossegurança rigorosos", "UTI de retaguarda 24h"]
}, {
  icon: Award,
  title: "Equipe Certificada",
  items: ["Médicos com título de especialista (SBEM, SBCBM)", "Nutricionistas, psicólogos e educadores físicos", "Anestesistas exclusivos para obesidade", "Enfermagem treinada em bariatria"]
}, {
  icon: FileCheck,
  title: "Programas Internacionais",
  items: ["Baseados em guidelines da IFSO", "Estudos multicêntricos validados", "Atualização contínua com literatura científica", "Personalização conforme perfil metabólico"]
}, {
  icon: Activity,
  title: "Monitoramento 360°",
  items: ["Telemonitoramento pós-procedimento", "Consultas de acompanhamento protocoladas", "App com registro de evolução", "Canal direto para dúvidas e emergências"]
}];
const resultados = [{
  metrica: "Perda de Peso Total",
  valor: "15-30%"
}, {
  metrica: "Perda de Gordura Visceral",
  valor: "20-40%"
}, {
  metrica: "Redução de HbA1c",
  valor: "1-2 pontos"
}, {
  metrica: "Redução de Colesterol",
  valor: "20-30%"
}, {
  metrica: "Redução de Circunferência",
  valor: "10-20cm"
}, {
  metrica: "Melhora de Sono/Apneia",
  valor: "70-85%"
}, {
  metrica: "Redução de Hipertensão",
  valor: "50-70%"
}];
const compliance = ["Avaliação Pré-Tratamento: Exames laboratoriais completos, avaliação cardiovascular, endoscopia digestiva (quando necessário)", "Consentimento Informado: Explicação detalhada de riscos, benefícios e alternativas", "Decisão Compartilhada: Você participa ativamente da escolha do melhor protocolo", "Riscos Transparentes: Todo procedimento possui riscos, que serão discutidos individualmente"];
export const SegurancaEvidencias = () => {
  const handleWhatsAppClick = () => {
    const message = "Olá! Gostaria de agendar uma avaliação completa.";
    window.open(`${CONTACT.WHATSAPP_URL.split('?')[0]}?text=${encodeURIComponent(message)}`, "_blank");
  };
  return <section id="seguranca" className="relative py-20 bg-card overflow-hidden">
      <GrafismoDecor variant="floating" position="bottom-left" size="lg" opacity={0.1} rotate={-20} color="gray" />
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
            Segurança & Evidências Científicas
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">Programas baseados em pesquisas, adaptados à sua realidade. Sua segurança é nossa prioridade absoluta. Trabalho com programas internacionais, equipe certificada e infraestrutura de ponta para garantir resultados sem comprometer seu bem-estar.</p>
        </div>

        {/* 4 Pilares de Segurança */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {pilares.map((pilar, index) => {
          const Icon = pilar.icon;
          return <Card key={index} className="border-border/50 hover:border-primary/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 rounded-full bg-primary/10 flex-shrink-0">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground pt-2">{pilar.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {pilar.items.map((item, idx) => <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>)}
                  </ul>
                </CardContent>
              </Card>;
        })}
        </div>

        {/* Resultados Esperados */}
        <div className="max-w-4xl mx-auto mb-16">
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-6 text-center">
            Resultados Esperados (baseado em evidências)
          </h3>
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <CardContent className="p-8">
              <div className="flex items-center gap-2 mb-6 justify-center">
                <Activity className="h-5 w-5 text-primary" />
                <p className="font-semibold text-foreground">Ranges Clínicos (6-12 meses)</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {resultados.map((resultado, index) => <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-background/50 border border-border/30">
                    <span className="text-sm font-medium text-foreground">{resultado.metrica}:</span>
                    <span className="text-lg font-serif font-bold text-primary">{resultado.valor}</span>
                  </div>)}
              </div>
              <p className="text-xs text-muted-foreground text-center mt-6 italic">
                *Resultados variam conforme perfil, adesão e programa.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Compliance & Transparência */}
        <div className="max-w-4xl mx-auto mb-12">
          <h3 className="text-2xl font-serif font-bold text-foreground mb-6 text-center">
            Compliance & Transparência
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {compliance.map((item, index) => <Card key={index} className="border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground leading-relaxed">{item}</p>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </div>

        {/* Disclaimer Legal */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-950/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-1" />
                <div className="space-y-3">
                  <h4 className="font-bold text-foreground text-lg">Aviso Médico Importante</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 dark:text-amber-500">•</span>
                      <span>Resultados variam conforme avaliação clínica e adesão ao programa</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 dark:text-amber-500">•</span>
                      <span>Intervenções são indicadas após critérios médicos rigorosos e exames</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 dark:text-amber-500">•</span>
                      <span>Decisão compartilhada entre médico e paciente; segurança em primeiro lugar</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 dark:text-amber-500">•</span>
                      <span>Procedimentos médicos possuem riscos e contraindicações, avaliados individualmente</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 dark:text-amber-500">•</span>
                      <span>Este site não substitui consulta médica presencial</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button size="lg" onClick={handleWhatsAppClick} className="group min-w-[280px]">
            Agendar avaliação completa
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>;
};