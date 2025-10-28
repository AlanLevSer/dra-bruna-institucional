import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { AlertCircle } from "lucide-react";

interface QuizStep7Props {
  cirurgiaGastricaPrevia: boolean;
  cirurgiaBariatricaPreviaTipo: 'nenhuma' | 'bypass' | 'sleeve' | 'outras';
  reganhoPosBariatrica: boolean;
  falhaPreviaClinica: boolean;
  onChange: (field: string, value: any) => void;
}

export const QuizStep7 = ({
  cirurgiaGastricaPrevia,
  cirurgiaBariatricaPreviaTipo,
  reganhoPosBariatrica,
  falhaPreviaClinica,
  onChange
}: QuizStep7Props) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-3">
          Histórico Cirúrgico e Tratamentos
        </h2>
        <p className="text-muted-foreground">
          Essas informações são essenciais para sua segurança
        </p>
      </div>

      {/* Cirurgia Gástrica Prévia */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <Label htmlFor="cirurgia-previa" className="text-base font-medium">
              Você já fez alguma cirurgia gástrica ou bariátrica?
            </Label>
            <Switch
              id="cirurgia-previa"
              checked={cirurgiaGastricaPrevia}
              onCheckedChange={(val) => {
                onChange('cirurgiaGastricaPrevia', val);
                if (!val) {
                  onChange('cirurgiaBariatricaPreviaTipo', 'nenhuma');
                  onChange('reganhoPosBariatrica', false);
                }
              }}
            />
          </div>

          {cirurgiaGastricaPrevia && (
            <>
              <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-4 flex gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  Alguns procedimentos podem ter restrições por segurança. 
                  Vamos personalizar seu plano considerando isso.
                </p>
              </div>

              <Label className="text-sm font-medium mb-3 block">
                Qual tipo de cirurgia você fez?
              </Label>
              <RadioGroup
                value={cirurgiaBariatricaPreviaTipo}
                onValueChange={(val) => onChange('cirurgiaBariatricaPreviaTipo', val)}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="bypass" id="bypass" />
                  <Label htmlFor="bypass" className="font-normal cursor-pointer">
                    Bypass Gástrico
                  </Label>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="sleeve" id="sleeve" />
                  <Label htmlFor="sleeve" className="font-normal cursor-pointer">
                    Sleeve (Gastroplastia Vertical)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="outras" id="outras" />
                  <Label htmlFor="outras" className="font-normal cursor-pointer">
                    Outra cirurgia gástrica
                  </Label>
                </div>
              </RadioGroup>

              <div className="mt-4 flex items-center justify-between">
                <Label htmlFor="reganho" className="text-sm">
                  Teve reganho de peso após a cirurgia?
                </Label>
                <Switch
                  id="reganho"
                  checked={reganhoPosBariatrica}
                  onCheckedChange={(val) => onChange('reganhoPosBariatrica', val)}
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Falha Prévia Clínica */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <Label htmlFor="falha-clinica" className="text-base font-medium block mb-1">
                Já tentou perder peso com acompanhamento médico/nutricional sem sucesso?
              </Label>
              <p className="text-sm text-muted-foreground">
                Dietas acompanhadas, medicamentos prescritos, etc.
              </p>
            </div>
            <Switch
              id="falha-clinica"
              checked={falhaPreviaClinica}
              onCheckedChange={(val) => onChange('falhaPreviaClinica', val)}
              className="ml-4"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
/* eslint-disable @typescript-eslint/no-explicit-any */
