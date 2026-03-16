import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import { QuizData, TransformacaoOutput } from "@/types/quiz";
import { DeclaracaoTransformacao } from "@/components/output/DeclaracaoTransformacao";
import { PlanoEnergeticoComponent } from "@/components/output/PlanoEnergetico";
import { PerfilSaudeRadar } from "@/components/output/PerfilSaudeRadar";
import { IndiceQLI } from "@/components/output/IndiceQLI";
import { RoadmapFases } from "@/components/output/RoadmapFases";
import { MixEstrategias } from "@/components/output/MixEstrategias";
import { KPIsClinicas } from "@/components/output/KPIsClinicas";
import { LifestyleWins } from "@/components/output/LifestyleWins";
import { CTAsFinais } from "@/components/output/CTAsFinais";

interface QuizResultViewProps {
  layout?: "page" | "dialog";
  output: TransformacaoOutput;
  quizData: QuizData;
  onResetQuiz: () => void;
}

const QuizResultView = ({
  layout = "page",
  output,
  quizData,
  onResetQuiz,
}: QuizResultViewProps) => {
  const ctaProps = {
    onResetQuiz,
    notaGlobal: output.perfilSaude.notaGlobal,
    conceito: output.perfilSaude.conceito,
    tratamentoRecomendado: output.mixEstrategias.intervencao?.nome || "Protocolo Clinico",
    metaKg: output.planoEnergetico.metaKg,
    semanasPlano: output.planoEnergetico.semanasPlano,
  };

  if (layout === "dialog") {
    return (
      <div>
        <DeclaracaoTransformacao headline={output.headline} alertaClinico={output.alertaClinico} />
        <PlanoEnergeticoComponent planoEnergetico={output.planoEnergetico} />
        <PerfilSaudeRadar perfilSaude={output.perfilSaude} quizData={quizData} />
        <IndiceQLI qli={output.qli} />
        <RoadmapFases roadmap={output.roadmap} />
        <MixEstrategias mixEstrategias={output.mixEstrategias} />
        <KPIsClinicas kpis={output.kpis} />
        <LifestyleWins lifestyleWins={output.lifestyleWins} />
        <CTAsFinais {...ctaProps} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-2xl border bg-card shadow-lg">
        <DeclaracaoTransformacao headline={output.headline} alertaClinico={output.alertaClinico} />
      </div>
      <PlanoEnergeticoComponent planoEnergetico={output.planoEnergetico} />
      <PerfilSaudeRadar perfilSaude={output.perfilSaude} quizData={quizData} />
      <div className="overflow-hidden rounded-2xl border bg-card shadow-lg">
        <IndiceQLI qli={output.qli} />
        <RoadmapFases roadmap={output.roadmap} />
        <MixEstrategias mixEstrategias={output.mixEstrategias} />
        <KPIsClinicas kpis={output.kpis} />
        <LifestyleWins lifestyleWins={output.lifestyleWins} />
        <CTAsFinais {...ctaProps} />
      </div>
      <div className="flex justify-center pt-4">
        <Link to="/">
          <Button variant="outline" size="lg">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar ao site
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default QuizResultView;
