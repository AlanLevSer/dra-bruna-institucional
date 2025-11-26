import { AlertCircle } from 'lucide-react';

export const ResultDisclaimer = () => {
  return (
    <div className="bg-muted/30 border border-border rounded-lg p-4 flex gap-3">
      <AlertCircle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
      <div className="text-xs text-muted-foreground leading-relaxed">
        <p className="font-medium text-foreground mb-1">Importante:</p>
        <p>
          Este conteúdo tem caráter exclusivamente educativo e não substitui consulta médica, exames ou
          diagnóstico. Os resultados apresentados são baseados em padrões estatísticos e não constituem
          diagnóstico clínico. Para orientação personalizada, agende uma avaliação com nossa equipe médica.
        </p>
      </div>
    </div>
  );
};
