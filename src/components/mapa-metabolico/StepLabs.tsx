import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Info } from 'lucide-react';
import type { Answers } from '@/lib/mapa-metabolico/types';

interface StepLabsProps {
  answers: Partial<Answers>;
  onChange: (key: keyof Answers, value: unknown) => void;
}

export const StepLabs = ({ answers, onChange }: StepLabsProps) => {
  return (
    <div className="space-y-6">
      <div className="bg-muted/50 border border-border rounded-lg p-4 flex gap-3">
        <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
        <div className="text-sm text-muted-foreground">
          <p className="font-medium text-foreground mb-1">Esta etapa é opcional</p>
          <p>
            Se você tiver exames recentes, pode preenchê-los para uma análise mais precisa. Caso não tenha, pode
            pular esta etapa.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="glucose">Glicemia em jejum (mg/dL)</Label>
          <Input
            id="glucose"
            type="number"
            min={0}
            value={answers.fasting_glucose_mgdl || ''}
            onChange={(e) => onChange('fasting_glucose_mgdl', parseFloat(e.target.value))}
            placeholder="Ex: 95"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="hba1c">Hemoglobina glicada (%)</Label>
          <Input
            id="hba1c"
            type="number"
            min={0}
            step={0.1}
            value={answers.hba1c_perc || ''}
            onChange={(e) => onChange('hba1c_perc', parseFloat(e.target.value))}
            placeholder="Ex: 5.6"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="triglycerides">Triglicerídeos (mg/dL)</Label>
          <Input
            id="triglycerides"
            type="number"
            min={0}
            value={answers.triglycerides_mgdl || ''}
            onChange={(e) => onChange('triglycerides_mgdl', parseFloat(e.target.value))}
            placeholder="Ex: 150"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="hdl">HDL (mg/dL)</Label>
          <Input
            id="hdl"
            type="number"
            min={0}
            value={answers.hdl_mgdl || ''}
            onChange={(e) => onChange('hdl_mgdl', parseFloat(e.target.value))}
            placeholder="Ex: 50"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tsh">TSH</Label>
          <Input
            id="tsh"
            type="number"
            min={0}
            step={0.01}
            value={answers.tsh || ''}
            onChange={(e) => onChange('tsh', parseFloat(e.target.value))}
            placeholder="Ex: 2.5"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="vitd">Vitamina D (25-OH)</Label>
          <Input
            id="vitd"
            type="number"
            min={0}
            value={answers.vitamin_d || ''}
            onChange={(e) => onChange('vitamin_d', parseFloat(e.target.value))}
            placeholder="Ex: 30"
          />
        </div>
      </div>
    </div>
  );
};
