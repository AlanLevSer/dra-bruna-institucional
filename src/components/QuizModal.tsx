import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { CONTACT } from "@/lib/constants";
import { openLeadChat } from "@/lib/leadChat";

interface QuizModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const QuizModal = ({ open, onOpenChange }: QuizModalProps) => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    age: "",
    weight: "",
    challenge: "",
  });

  const questions = [
    {
      id: "age",
      question: "Qual sua faixa etária?",
      options: [
        { value: "18-29", label: "18-29 anos" },
        { value: "30-45", label: "30-45 anos" },
        { value: "46-60", label: "46-60 anos" },
        { value: "60+", label: "Acima de 60 anos" },
      ],
    },
    {
      id: "weight",
      question: "Quanto peso você deseja perder?",
      options: [
        { value: "5-10kg", label: "5-10kg" },
        { value: "11-20kg", label: "11-20kg" },
        { value: "21-30kg", label: "21-30kg" },
        { value: "30+kg", label: "Mais de 30kg" },
      ],
    },
    {
      id: "challenge",
      question: "Qual seu maior desafio com alimentação?",
      options: [
        { value: "compulsao", label: "Compulsão alimentar" },
        { value: "fome", label: "Fome constante" },
        { value: "ansiedade", label: "Ansiedade" },
        { value: "tempo", label: "Falta de tempo para cozinhar" },
      ],
    },
  ];

  const currentQuestion = questions[step - 1];
  const progress = (step / questions.length) * 100;

  const handleAnswer = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  };

  const handleNext = () => {
    if (step < questions.length) {
      setStep(step + 1);
    } else {
      // Finalizar quiz
      const profile = `Idade: ${answers.age}, Meta: ${answers.weight}, Desafio: ${answers.challenge}`;
      const whatsappUrl = CONTACT.WHATSAPP_QUIZ_RESULT(profile);
      openLeadChat("quiz_modal_result", whatsappUrl);
      onOpenChange(false);
      // Reset
      setStep(1);
      setAnswers({ age: "", weight: "", challenge: "" });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const currentAnswer = answers[currentQuestion.id as keyof typeof answers];
  const isAnswered = currentAnswer !== "";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-serif font-bold text-center mb-4">
            Descubra Seu Perfil Metabólico
          </DialogTitle>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="mb-6">
          <Progress value={progress} className="h-1 bg-primary/20" />
          <p className="text-sm text-muted-foreground text-center mt-2">
            Pergunta {step} de {questions.length}
          </p>
        </div>

        {/* Question */}
        <div className="space-y-6">
          <h3 className="text-base font-semibold text-center">
            {currentQuestion.question}
          </h3>

          <RadioGroup value={currentAnswer} onValueChange={handleAnswer}>
            <div className="space-y-3">
              {currentQuestion.options.map((option) => (
                <div
                  key={option.value}
                  className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-primary/5 cursor-pointer transition-colors"
                >
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label
                    htmlFor={option.value}
                    className="flex-1 cursor-pointer text-sm"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>

        {/* Navigation */}
        <div className="flex gap-3 mt-6">
          {step > 1 && (
            <Button variant="ghost" onClick={handleBack} className="flex-1">
              Voltar
            </Button>
          )}
          <Button
            variant="default"
            onClick={handleNext}
            disabled={!isAnswered}
            className="flex-1 bg-gradient-premium hover:opacity-90"
          >
            {step === questions.length ? "Ver Resultado" : "Próxima"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuizModal;
