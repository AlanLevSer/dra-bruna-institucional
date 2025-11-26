import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Shield } from 'lucide-react';
import type { Answers } from '@/lib/mapa-metabolico/types';

interface StepContactProps {
  answers: Partial<Answers>;
  onChange: (key: keyof Answers, value: unknown) => void;
}

export const StepContact = ({ answers, onChange }: StepContactProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">
          Nome completo <span className="text-destructive">*</span>
        </Label>
        <Input
          id="name"
          type="text"
          value={answers.full_name || ''}
          onChange={(e) => onChange('full_name', e.target.value)}
          placeholder="Seu nome completo"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="whatsapp">
          WhatsApp <span className="text-destructive">*</span>
        </Label>
        <Input
          id="whatsapp"
          type="tel"
          value={answers.whatsapp_phone || ''}
          onChange={(e) => onChange('whatsapp_phone', e.target.value)}
          placeholder="+55 11 98765-4321"
          required
        />
        <p className="text-xs text-muted-foreground">Formato internacional: +55 DDD NÚMERO</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">
          E-mail <span className="text-destructive">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          value={answers.email || ''}
          onChange={(e) => onChange('email', e.target.value)}
          placeholder="seu@email.com"
          required
        />
      </div>

      <div className="bg-muted/50 border border-border rounded-lg p-4 space-y-4">
        <div className="flex gap-3">
          <Shield className="w-5 h-5 text-primary flex-shrink-0" />
          <div>
            <p className="font-medium text-foreground mb-1">Seus dados estão seguros</p>
            <p className="text-sm text-muted-foreground">
              Utilizamos seus dados apenas para fornecer orientação personalizada sobre programas médicos.
              Respeitamos totalmente a LGPD.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-2 pt-2">
          <Checkbox
            id="consent"
            checked={answers.lgpd_consent || false}
            onCheckedChange={(checked) => onChange('lgpd_consent', checked)}
            required
          />
          <Label htmlFor="consent" className="cursor-pointer text-sm font-normal leading-tight">
            Autorizo o contato para orientação sobre avaliação e programas médicos. <span className="text-destructive">*</span>
          </Label>
        </div>
      </div>
    </div>
  );
};
