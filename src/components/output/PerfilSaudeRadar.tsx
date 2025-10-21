import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Share2, AlertCircle, TrendingUp } from "lucide-react";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from 'recharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { trackEvent } from '@/lib/analytics';
import { CONTACT } from '@/lib/constants';
import { TransformacaoOutput, QuizData } from '@/types/quiz';
import { useRef, useEffect } from 'react';

interface PerfilSaudeRadarProps {
  perfilSaude: TransformacaoOutput['perfilSaude'];
  quizData: QuizData;
}

export const PerfilSaudeRadar = ({ perfilSaude, quizData }: PerfilSaudeRadarProps) => {
  const chartRef = useRef<HTMLDivElement>(null);

  const { notaGlobal, conceito, faixa, eixos, problemasDetectados, ganhosProv90dias } = perfilSaude;

  // Track when component is viewed
  useEffect(() => {
    trackEvent('perfil_saude_viewed', { 
      nota_global: notaGlobal,
      conceito,
      faixa,
      problemas_qtd: problemasDetectados.length,
    });
  }, [notaGlobal, conceito, faixa, problemasDetectados.length]);

  // Preparar dados para o radar chart
  const chartData = eixos.map(e => ({
    eixo: e.nome,
    Agora: e.nota,
    'Meta 90 dias': Math.min(100, e.nota + 15),
  }));

  // Cores baseadas na faixa
  const badgeColors = {
    verde: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    ambar: 'bg-amber-100 text-amber-800 border-amber-300',
    vermelho: 'bg-rose-100 text-rose-800 border-rose-300',
  };

  const exportPNG = async () => {
    if (!chartRef.current) return;
    
    try {
      trackEvent('perfil_saude_exported', { format: 'png', nota_global: notaGlobal });
      
      const canvas = await html2canvas(chartRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
      });
      
      const link = document.createElement('a');
      link.download = `perfil-saude-${conceito}-${notaGlobal}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Erro ao exportar PNG:', error);
    }
  };

  const exportPDF = async () => {
    if (!chartRef.current) return;
    
    try {
      trackEvent('perfil_saude_exported', { format: 'pdf', nota_global: notaGlobal });
      
      const canvas = await html2canvas(chartRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 10, pdfWidth, pdfHeight);
      pdf.save(`perfil-saude-${conceito}-${notaGlobal}.pdf`);
    } catch (error) {
      console.error('Erro ao exportar PDF:', error);
    }
  };

  const handleCTAClick = () => {
    trackEvent('perfil_saude_cta_clicked', { 
      nota_global: notaGlobal,
      conceito,
      problemas_qtd: problemasDetectados.length,
    });
  };

  const whatsappMessage = encodeURIComponent(
    `Olá, Dra. Bruna! Completei meu Perfil de Saúde e minha nota foi ${notaGlobal}/100 (conceito ${conceito}). Gostaria de conhecer meu Plano de Transformação personalizado.`
  );

  return (
    <div ref={chartRef} className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header com Nota Global */}
      <div className="bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 p-6 md:p-8 border-b">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary mb-2">
              Perfil de Saúde & Qualidade de Vida
            </h2>
            <p className="text-sm md:text-base text-muted-foreground">
              O gráfico resume seu ponto de partida. Metas finais são definidas na avaliação.
            </p>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <Badge 
              variant="outline" 
              className={`text-2xl md:text-3xl font-bold px-6 py-3 border-2 ${badgeColors[faixa]}`}
            >
              {notaGlobal}/100
            </Badge>
            <div className="text-sm font-semibold text-muted-foreground">
              Conceito: <span className="text-lg text-primary">{conceito}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Radar Chart */}
      <CardContent className="p-6 md:p-8">
        <div className="w-full h-[400px] md:h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={chartData}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis 
                dataKey="eixo" 
                tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
                className="text-xs md:text-sm"
              />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 100]} 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
              />
              <Radar
                name="Agora"
                dataKey="Agora"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.5}
                strokeWidth={2}
              />
              <Radar
                name="Meta 90 dias"
                dataKey="Meta 90 dias"
                stroke="hsl(var(--chart-2))"
                fill="hsl(var(--chart-2))"
                fillOpacity={0.2}
                strokeWidth={2}
                strokeDasharray="6 6"
              />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="line"
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Grid de Problemas e Ganhos */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {/* Problemas Detectados */}
          <Card className="border-rose-200 bg-rose-50/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2 text-rose-900">
                <AlertCircle className="w-5 h-5" />
                Problemas detectados
              </CardTitle>
            </CardHeader>
            <CardContent>
              {problemasDetectados.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {problemasDetectados.map((p, idx) => (
                    <Badge 
                      key={idx}
                      variant="outline"
                      className="bg-rose-100 text-rose-700 border-rose-300 text-xs"
                    >
                      {p.mensagem}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground italic">
                  Nenhum ponto crítico detectado
                </p>
              )}
            </CardContent>
          </Card>

          {/* Ganhos Prováveis */}
          <Card className="border-emerald-200 bg-emerald-50/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2 text-emerald-900">
                <TrendingUp className="w-5 h-5" />
                Seus 3 ganhos mais prováveis (90 dias)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {ganhosProv90dias.map((ganho, idx) => (
                  <li key={idx} className="text-sm flex items-start gap-2">
                    <span className="text-emerald-600 font-bold mt-0.5">•</span>
                    <span className="text-emerald-900">{ganho}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Botões de Ação */}
        <div className="flex flex-wrap items-center gap-3 mt-8 pt-6 border-t">
          <Button 
            variant="outline" 
            size="sm"
            onClick={exportPNG}
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            Baixar PNG
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={exportPDF}
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            Baixar PDF
          </Button>

          <Button 
            size="lg"
            className="ml-auto gap-2 bg-gradient-premium text-white hover:opacity-90 transition-opacity"
            asChild
            onClick={handleCTAClick}
          >
            <a 
              href={`${CONTACT.WHATSAPP_URL.split('?')[0]}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Share2 className="w-5 h-5" />
              Gerar meu Plano de Transformação
            </a>
          </Button>
        </div>

        {/* Disclaimer LGPD */}
        <p className="text-xs text-muted-foreground mt-6 pt-4 border-t leading-relaxed">
          <strong>Privacidade:</strong> Cálculo realizado localmente no seu navegador. Não compartilhamos seus dados sem consentimento. 
          Este material é informativo e não substitui consulta médica.
        </p>
      </CardContent>
    </div>
  );
};
