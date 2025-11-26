import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { SEOHead } from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, Activity, Brain, Sparkles, Utensils } from 'lucide-react';
import { MapaProgress } from '@/components/mapa-metabolico/MapaProgress';
import { MapaNavigation } from '@/components/mapa-metabolico/MapaNavigation';
import { StepBasics } from '@/components/mapa-metabolico/StepBasics';
import { StepSymptoms } from '@/components/mapa-metabolico/StepSymptoms';
import { StepLifestyle } from '@/components/mapa-metabolico/StepLifestyle';
import { StepHistory } from '@/components/mapa-metabolico/StepHistory';
import { StepLabs } from '@/components/mapa-metabolico/StepLabs';
import { StepContact } from '@/components/mapa-metabolico/StepContact';
import { ResultHeader } from '@/components/mapa-metabolico/ResultHeader';
import { PillarCard } from '@/components/mapa-metabolico/PillarCard';
import { InsightsList } from '@/components/mapa-metabolico/InsightsList';
import { ResultCTAs } from '@/components/mapa-metabolico/ResultCTAs';
import { ResultDisclaimer } from '@/components/mapa-metabolico/ResultDisclaimer';
import type { Answers, ScoreResult } from '@/lib/mapa-metabolico/types';
import { calculateScores } from '@/lib/mapa-metabolico/calculateScores';
import { saveProgress, loadProgress, clearProgress } from '@/lib/mapa-metabolico/storage';
import { trackMapaStart, trackMapaStepSubmit, trackMapaCompleted, trackMapaResultView, trackMapaScore } from '@/lib/mapa-metabolico/analytics';
import { getStoredUTMContext } from '@/lib/utm';

const STEPS = [
  { id: 'A_basics', title: 'Dados básicos' },
  { id: 'B_symptoms', title: 'Sintomas' },
  { id: 'C_lifestyle', title: 'Rotina' },
  { id: 'D_history', title: 'Histórico' },
  { id: 'E_labs_optional', title: 'Exames' },
  { id: 'Z_contact', title: 'Contato' },
];

export default function MapaMetabolico() {
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<Answers>>({});
  const [result, setResult] = useState<ScoreResult | null>(null);

  useEffect(() => {
    const saved = loadProgress();
    if (saved && window.confirm('Encontramos um progresso salvo. Deseja continuar de onde parou?')) {
      setAnswers(saved.answers);
      setCurrentStep(saved.currentStep);
      setStarted(true);
    }
  }, []);

  const handleStart = () => {
    trackMapaStart();
    setStarted(true);
    window.scrollTo({ top: 600, behavior: 'smooth' });
  };

  const handleAnswerChange = (key: keyof Answers, value: unknown) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      trackMapaStepSubmit(STEPS[currentStep].id, currentStep + 1);
      setCurrentStep((prev) => prev + 1);
      saveProgress({ currentStep: currentStep + 1, answers, lastUpdated: new Date().toISOString() });
      window.scrollTo({ top: 400, behavior: 'smooth' });
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }
  };

  const handleSave = () => {
    saveProgress({ currentStep, answers, lastUpdated: new Date().toISOString() });
    alert('Progresso salvo! Você pode retornar em até 7 dias.');
  };

  const handleSubmit = () => {
    const scoring = calculateScores(answers as Answers);
    setResult(scoring);
    clearProgress();
    
    trackMapaCompleted(scoring.total, scoring.class);
    trackMapaResultView(scoring.total, scoring.class);
    trackMapaScore(scoring.total, scoring.class);

    // Send to backend
    sendToBackend(answers, scoring);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sendToBackend = async (answers: Partial<Answers>, scoring: ScoreResult) => {
    const utmContext = getStoredUTMContext();
    const payload = {
      lead: {
        full_name: answers.full_name,
        email: answers.email,
        whatsapp: answers.whatsapp_phone,
        lgpd_consent: answers.lgpd_consent,
      },
      answers,
      scoring,
      tracking: {
        ...utmContext.params,
        referrer: utmContext.referrer,
        page_slug: '/mapa-metabolico',
        device: /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
        timestamp: new Date().toISOString(),
      },
    };

    try {
      // TODO: Replace with actual endpoint
      console.log('Payload to send:', payload);
    } catch (error) {
      console.error('Failed to send data:', error);
    }
  };

  const canGoForward = () => {
    if (currentStep === 0) {
      return !!(answers.age && answers.sex && answers.weight_kg && answers.height_cm && answers.diagnoses?.length);
    }
    if (currentStep === 2) {
      return !!(answers.sleep_hours_bucket && answers.stress_0_10 !== undefined && answers.exercise_freq_bucket && answers.ultra_processed_freq && answers.alcohol_freq);
    }
    if (currentStep === 3) {
      return !!(answers.lost_5kg_regain_times && answers.yo_yo_weight && answers.night_snacking);
    }
    if (currentStep === 5) {
      return !!(answers.full_name && answers.whatsapp_phone && answers.email && answers.lgpd_consent);
    }
    return true;
  };

  return (
    <>
      <SEOHead
        data={{
          title: 'Mapa Metabólico LevSer — Avaliação educativa do seu metabolismo',
          description: 'Descubra sinais e prioridades do seu metabolismo em 5–7 minutos. Score 0–100, 4 pilares e próximos passos responsáveis.',
          keywords: 'mapa metabólico, avaliação metabolismo, saúde metabólica, score metabólico, dra bruna durelli, levser',
          canonical: 'https://www.brunadurelli.com.br/mapa-metabolico',
        }}
      />
      <Navigation />

      <main className="min-h-screen">
        {!result && (
          <section className="py-16 md:py-24 bg-gradient-to-br from-background via-muted/20 to-background">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="text-center space-y-6 mb-12">
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
                  Mapa Metabólico LevSer
                </h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Em poucos minutos, entenda os sinais do seu corpo e descubra os 1–2 pontos mais críticos para
                  destravar energia e peso — sem culpa e sem promessas mágicas.
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" /> Score 0–100
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" /> 4 Pilares
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" /> Direção clínica responsável
                  </span>
                </div>
                {!started && (
                  <Button onClick={handleStart} size="lg" className="shadow-elegant hover:shadow-hover">
                    Começar meu mapa
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                )}
              </div>

              {started && (
                <div className="bg-background rounded-2xl border border-border shadow-elegant p-6 md:p-8 space-y-8">
                  <MapaProgress currentStep={currentStep} totalSteps={STEPS.length} stepTitles={STEPS.map((s) => s.title)} />

                  <div className="space-y-6">
                    <h2 className="text-2xl font-serif font-bold text-foreground">{STEPS[currentStep].title}</h2>
                    
                    {currentStep === 0 && <StepBasics answers={answers} onChange={handleAnswerChange} />}
                    {currentStep === 1 && <StepSymptoms answers={answers} onChange={handleAnswerChange} />}
                    {currentStep === 2 && <StepLifestyle answers={answers} onChange={handleAnswerChange} />}
                    {currentStep === 3 && <StepHistory answers={answers} onChange={handleAnswerChange} />}
                    {currentStep === 4 && <StepLabs answers={answers} onChange={handleAnswerChange} />}
                    {currentStep === 5 && <StepContact answers={answers} onChange={handleAnswerChange} />}
                  </div>

                  <MapaNavigation
                    currentStep={currentStep}
                    totalSteps={STEPS.length}
                    canGoBack={currentStep > 0}
                    canGoForward={canGoForward()}
                    onBack={handleBack}
                    onForward={handleNext}
                    onSave={handleSave}
                    isLastStep={currentStep === STEPS.length - 1}
                  />
                </div>
              )}
            </div>
          </section>
        )}

        {result && (
          <section className="py-16 md:py-24 bg-gradient-to-br from-background via-muted/20 to-background">
            <div className="container mx-auto px-4 max-w-5xl space-y-12">
              <ResultHeader result={result} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PillarCard pillarKey="nutricao" score={result.pillars.nutricao} status={result.pillarStatus.nutricao} />
                <PillarCard pillarKey="metabolica_regenerativa" score={result.pillars.metabolica_regenerativa} status={result.pillarStatus.metabolica_regenerativa} />
                <PillarCard pillarKey="movimento" score={result.pillars.movimento} status={result.pillarStatus.movimento} />
                <PillarCard pillarKey="mente_comportamento" score={result.pillars.mente_comportamento} status={result.pillarStatus.mente_comportamento} />
              </div>

              <InsightsList insights={result.insights} />

              <ResultCTAs score={result.total} priorityPillar={result.priorityPillars[0]} />

              <ResultDisclaimer />
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
