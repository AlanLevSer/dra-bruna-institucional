import { AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import type { ScoreResult } from '@/lib/mapa-metabolico/types';

interface ResultHeaderProps {
  result: ScoreResult;
}

export const ResultHeader = ({ result }: ResultHeaderProps) => {
  const getClassDetails = () => {
    switch (result.class) {
      case 'Critico':
        return {
          icon: <XCircle className="w-16 h-16 text-destructive" />,
          text: 'Atenção necessária',
          color: 'text-destructive',
          bgColor: 'bg-destructive/10',
        };
      case 'Atencao':
        return {
          icon: <AlertCircle className="w-16 h-16 text-orange-500" />,
          text: 'Melhorias recomendadas',
          color: 'text-orange-500',
          bgColor: 'bg-orange-500/10',
        };
      case 'Bom':
        return {
          icon: <CheckCircle2 className="w-16 h-16 text-green-600" />,
          text: 'Bom resultado',
          color: 'text-green-600',
          bgColor: 'bg-green-600/10',
        };
    }
  };

  const details = getClassDetails();

  return (
    <div className="text-center space-y-6">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/5">
        {details.icon}
      </div>

      <div>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2">
          Seu Mapa Metabólico está pronto
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Entenda os sinais do seu corpo e os próximos passos para transformar sua saúde
        </p>
      </div>

      <div className={`inline-flex flex-col items-center gap-2 px-8 py-6 rounded-2xl ${details.bgColor}`}>
        <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Seu score</span>
        <div className="flex items-baseline gap-2">
          <span className={`text-6xl md:text-7xl font-bold ${details.color}`}>{result.total}</span>
          <span className="text-2xl text-muted-foreground font-medium">/100</span>
        </div>
        <span className={`text-lg font-medium ${details.color}`}>{details.text}</span>
      </div>
    </div>
  );
};
