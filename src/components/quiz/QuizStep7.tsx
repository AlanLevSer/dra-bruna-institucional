/* eslint-disable @typescript-eslint/no-explicit-any */
import { AlertCircle } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface QuizStep7Props {
  cirurgiaGastricaPrevia: boolean;
  cirurgiaBariatricaPreviaTipo: "nenhuma" | "bypass" | "sleeve" | "outras";
  reganhoPosBariatrica: boolean;
  falhaPreviaClinica: boolean;
  onChange: (field: string, value: any) => void;
}

export const QuizStep7 = ({
  cirurgiaGastricaPrevia,
  cirurgiaBariatricaPreviaTipo,
  reganhoPosBariatrica,
  falhaPreviaClinica,
  onChange,
}: QuizStep7Props) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-3">
          Historico Cirurgico e Tratamentos
        </h2>
        <p className="text-muted-foreground">
          Essas informacoes sao essenciais para sua seguranca
        </p>
      </div>

      {/* Cirurgia gastrica previa */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-4">
            <Label htmlFor="cirurgia-previa" className="text-base font-medium">
              Voce ja fez alguma cirurgia gastrica ou bariatrica?
            </Label>
            <ToggleGroup
              type="single"
              value={cirurgiaGastricaPrevia ? "sim" : "nao"}
              onValueChange={(val) => {
                const hasSurgery = val === "sim";
                onChange("cirurgiaGastricaPrevia", hasSurgery);
                if (!hasSurgery) {
                  onChange("cirurgiaBariatricaPreviaTipo", "nenhuma");
                  onChange("reganhoPosBariatrica", false);
                }
              }}
              className="bg-muted/40 rounded-full p-1 self-start md:self-auto"
            >
              <ToggleGroupItem value="nao" className="px-4">
                Nao
              </ToggleGroupItem>
              <ToggleGroupItem value="sim" className="px-4">
                Sim
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          {cirurgiaGastricaPrevia && (
            <>
              <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-4 flex gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  Alguns procedimentos podem ter restricoes por seguranca.
                  Vamos personalizar seu plano considerando isso.
                </p>
              </div>

              <Label className="text-sm font-medium mb-3 block">
                Qual tipo de cirurgia voce fez?
              </Label>
              <RadioGroup
                value={cirurgiaBariatricaPreviaTipo}
                onValueChange={(val) => onChange("cirurgiaBariatricaPreviaTipo", val)}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="bypass" id="bypass" />
                  <Label htmlFor="bypass" className="font-normal cursor-pointer">
                    Bypass gastrico
                  </Label>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="sleeve" id="sleeve" />
                  <Label htmlFor="sleeve" className="font-normal cursor-pointer">
                    Sleeve (gastroplastia vertical)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="outras" id="outras" />
                  <Label htmlFor="outras" className="font-normal cursor-pointer">
                    Outra cirurgia gastrica
                  </Label>
                </div>
              </RadioGroup>

              <div className="mt-4 flex items-center justify-between gap-4">
                <Label htmlFor="reganho" className="text-sm flex-1">
                  Teve reganho de peso apos a cirurgia?
                </Label>
                <Switch
                  id="reganho"
                  checked={reganhoPosBariatrica}
                  onCheckedChange={(val) => onChange("reganhoPosBariatrica", val)}
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Falha previa clinica */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <Label htmlFor="falha-clinica" className="text-base font-medium block mb-1">
                Ja tentou perder peso com acompanhamento medico/nutricional sem sucesso?
              </Label>
              <p className="text-sm text-muted-foreground">
                Dietas acompanhadas, medicamentos prescritos, etc.
              </p>
            </div>
            <Switch
              id="falha-clinica"
              checked={falhaPreviaClinica}
              onCheckedChange={(val) => onChange("falhaPreviaClinica", val)}
              className="ml-4"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

