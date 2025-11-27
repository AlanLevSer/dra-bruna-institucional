import { useState, useEffect, useRef } from "react";
import { X, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { CONTACT } from "@/lib/constants";
import { trackEvent, trackLeadChatAbandonment } from "@/lib/analytics";
import { getStoredUTMContext } from "@/lib/utm";
import { getSessionId } from "@/lib/sessionTracking";
import avatarAtendente from "@/assets/avatar-atendente.avif";
import type { Answers, ScoreResult } from "@/lib/mapa-metabolico/types";

type Step = "qualification1" | "qualification2" | "name" | "whatsapp" | "email" | "confirm" | "success";

interface LeadData {
  qualification1: string;
  qualification2: string;
  name: string;
  whatsapp: string;
  email: string;
  consent: boolean;
}

interface LeadChatMapaMetabolicoProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  answers: Partial<Answers>;
  scoring: ScoreResult;
  origin?: string;
}

const WEBHOOK_URL = "https://hook.eu2.make.com/a8npmvf1rzbfjw8c1iigmm1lqezfhd37";

export const LeadChatMapaMetabolico = ({
  isOpen,
  onClose,
  onSuccess,
  answers,
  scoring,
  origin = "mapa_metabolico",
}: LeadChatMapaMetabolicoProps) => {
  const [currentStep, setCurrentStep] = useState<Step>("qualification1");
  const [leadData, setLeadData] = useState<LeadData>({
    qualification1: "",
    qualification2: "",
    name: "",
    whatsapp: "",
    email: "",
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sessionId = useRef(getSessionId());

  const handleClose = () => {
    // Track abandonment if not converted
    if (currentStep !== "success") {
      trackLeadChatAbandonment({
        source: origin,
        step: currentStep,
        partial_data: {
          ...leadData,
          score: scoring?.total,
          classification: scoring?.class,
          answers: answers,
        },
        session_id: sessionId.current,
      });
    }
    
    onClose();
    trackEvent("lead_chat_closed_mapa", { 
      source: origin, 
      step: currentStep,
      score: scoring?.total,
      converted: currentStep === "success",
    });
  };

  // Track abandonment on page unload
  useEffect(() => {
    if (!isOpen) return;

    const handleBeforeUnload = () => {
      if (currentStep !== "success") {
        trackLeadChatAbandonment({
          source: origin,
          step: currentStep,
          partial_data: {
            ...leadData,
            score: scoring?.total,
            classification: scoring?.class,
            answers: answers,
          },
          session_id: sessionId.current,
        });
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isOpen, currentStep, leadData, scoring, answers, origin]);

  const handleQualificationAnswer = (step: Step, answer: string) => {
    setLeadData((prev) => ({ ...prev, [step]: answer }));
    trackEvent("lead_chat_step_completed", { source: origin, step, answer });

    if (step === "qualification1") setCurrentStep("qualification2");
    else if (step === "qualification2") setCurrentStep("name");
  };

  const handleInputChange = (field: keyof LeadData, value: string | boolean) => {
    setLeadData((prev) => ({ ...prev, [field]: value }));
  };

  const handleWhatsAppMask = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 11) {
      const masked = numbers.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
      return masked;
    }
    return value;
  };

  const handleNext = () => {
    if (currentStep === "name" && leadData.name.trim()) {
      setCurrentStep("whatsapp");
    } else if (currentStep === "whatsapp" && leadData.whatsapp.trim()) {
      setCurrentStep("email");
    } else if (currentStep === "email" && leadData.email.trim()) {
      setCurrentStep("confirm");
    }
  };

  const getGAClientId = (): string => {
    try {
      const match = document.cookie.match(/_ga=(.+?);/);
      if (match && match[1]) {
        const parts = match[1].split(".");
        if (parts.length >= 3) {
          return `${parts[2]}.${parts[3]}`;
        }
      }
    } catch (e) {
      void e;
    }
    return "";
  };

  const handleConfirm = async () => {
    if (!leadData.consent) {
      alert("Por favor, autorize o contato para continuar.");
      return;
    }

    setIsSubmitting(true);

    try {
      const utmContext = getStoredUTMContext();
      const gaClientId = getGAClientId();
      const protocolId = `MAPA-${Date.now()}-${Math.random().toString(36).substring(7)}`;
      const device = /Mobi|Android/i.test(navigator.userAgent) ? "mobile" : "desktop";

      const webhookPayload = {
        // Personal data
        nome: leadData.name || "",
        whatsapp: leadData.whatsapp || "",
        email: leadData.email || "",

        // Qualification answers
        principal_objetivo: leadData.qualification1 || "",
        interesse_procedimento: leadData.qualification2 || "",

        // Mapa Metabólico scoring
        score_total: scoring.total,
        classificacao: scoring.class,
        pilar_nutricao: scoring.pillars.nutricao,
        pilar_metabolica: scoring.pillars.metabolica_regenerativa,
        pilar_movimento: scoring.pillars.movimento,
        pilar_mente: scoring.pillars.mente_comportamento,
        pilares_prioritarios: scoring.priorityPillars.join(", "),
        insights: scoring.insights.join(" | "),

        // Selected assessment answers
        idade: answers.age,
        peso_kg: answers.weight_kg,
        altura_cm: answers.height_cm,
        circunferencia_abdominal: answers.waist_cm,
        diagnosticos: (answers.diagnoses || []).join(", "),
        horas_sono: answers.sleep_hours_bucket,
        nivel_estresse: answers.stress_0_10,
        frequencia_exercicio: answers.exercise_freq_bucket,
        
        // Origin
        origem: origin,
        page_slug: window.location.pathname,
        url: window.location.href,
        device,

        // Basic UTMs
        utm_source: utmContext.params.utm_source || "",
        utm_medium: utmContext.params.utm_medium || "",
        utm_campaign: utmContext.params.utm_campaign || "",
        utm_content: utmContext.params.utm_content || "",
        utm_term: utmContext.params.utm_term || "",

        // Advanced UTMs
        utm_source_platform: utmContext.params.utm_source_platform || "",
        utm_creative_format: utmContext.params.utm_creative_format || "",
        utm_marketing_tactic: utmContext.params.utm_marketing_tactic || "",

        // Tracking IDs
        gclid: utmContext.params.gclid || "",
        fbclid: utmContext.params.fbclid || "",
        gclientid: gaClientId,

        // Referrer
        referrer: utmContext.referrer || document.referrer || "",

        // Timestamp & Protocol
        timestamp: new Date().toISOString(),
        protocol_id: protocolId,
      };

      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(webhookPayload),
      });

      trackEvent("lead_converted", {
        source: origin,
        method: "widget_mapa",
        device,
        score: scoring.total,
        classification: scoring.class,
      });

      try {
        window.fbq?.("track", "Lead", {
          content_name: "Lead Mapa Metabólico",
          content_category: "mapa_metabolico",
          value: 1,
          currency: "BRL",
        });
      } catch (e) {
        void e;
      }

      setCurrentStep("success");
      setTimeout(() => {
        onSuccess();
      }, 2000);
    } catch (error) {
      console.error("Error submitting lead:", error);
      alert("Erro ao enviar. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStepNumber = (): number => {
    const steps = ["qualification1", "qualification2", "name", "whatsapp", "email", "confirm", "success"];
    return steps.indexOf(currentStep) + 1;
  };

  const getTotalSteps = (): number => 6;

  const renderStep = () => {
    switch (currentStep) {
      case "qualification1":
        return (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <img
                src={avatarAtendente}
                alt="Atendente"
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 bg-muted/50 rounded-2xl rounded-tl-none p-4">
                <p className="text-sm text-foreground leading-relaxed">
                  Vi que você completou seu Mapa Metabólico! Pra eu te direcionar melhor, me conta:{" "}
                  <strong>qual é seu principal objetivo agora?</strong>
                </p>
              </div>
            </div>
            <div className="space-y-2 pl-13">
              {[
                "Emagrecer com saúde e manter o resultado",
                "Recuperar energia e disposição",
                "Entender se algum procedimento é indicado pra mim",
                "Melhorar minha saúde metabólica",
              ].map((option) => (
                <Button
                  key={option}
                  onClick={() => handleQualificationAnswer("qualification1", option)}
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-3 px-4 hover:bg-primary/10 hover:border-primary transition-all"
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        );

      case "qualification2":
        return (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <img
                src={avatarAtendente}
                alt="Atendente"
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 bg-muted/50 rounded-2xl rounded-tl-none p-4">
                <p className="text-sm text-foreground leading-relaxed">
                  E <strong>você tem interesse em conhecer procedimentos médicos</strong> como balão
                  intragástrico ou terapias endoscópicas?
                </p>
              </div>
            </div>
            <div className="space-y-2 pl-13">
              {[
                "Sim, quero conhecer as opções disponíveis",
                "Talvez, quero entender se é indicado pra mim",
                "Não, prefiro focar só em acompanhamento",
                "Ainda não sei, quero conversar com a equipe",
              ].map((option) => (
                <Button
                  key={option}
                  onClick={() => handleQualificationAnswer("qualification2", option)}
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-3 px-4 hover:bg-primary/10 hover:border-primary transition-all"
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        );

      case "name":
        return (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <img
                src={avatarAtendente}
                alt="Atendente"
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 bg-muted/50 rounded-2xl rounded-tl-none p-4">
                <p className="text-sm text-foreground leading-relaxed">
                  Perfeito! Agora me passa seus dados pra equipe da Dra. Bruna te chamar com seu resultado personalizado 👇
                </p>
              </div>
            </div>
            <div className="space-y-3 pl-13">
              <Input
                placeholder="Nome completo"
                value={leadData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full"
                autoFocus
              />
              <Button onClick={handleNext} disabled={!leadData.name.trim()} className="w-full">
                Continuar
              </Button>
            </div>
          </div>
        );

      case "whatsapp":
        return (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <img
                src={avatarAtendente}
                alt="Atendente"
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 bg-muted/50 rounded-2xl rounded-tl-none p-4">
                <p className="text-sm text-foreground leading-relaxed">
                  Qual é o seu <strong>WhatsApp</strong>?
                </p>
              </div>
            </div>
            <div className="space-y-3 pl-13">
              <Input
                placeholder="(11) 99999-9999"
                value={leadData.whatsapp}
                onChange={(e) => handleInputChange("whatsapp", handleWhatsAppMask(e.target.value))}
                className="w-full"
                autoFocus
              />
              <Button onClick={handleNext} disabled={!leadData.whatsapp.trim()} className="w-full">
                Continuar
              </Button>
            </div>
          </div>
        );

      case "email":
        return (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <img
                src={avatarAtendente}
                alt="Atendente"
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 bg-muted/50 rounded-2xl rounded-tl-none p-4">
                <p className="text-sm text-foreground leading-relaxed">
                  E o seu <strong>e-mail</strong>?
                </p>
              </div>
            </div>
            <div className="space-y-3 pl-13">
              <Input
                type="email"
                placeholder="seuemail@exemplo.com"
                value={leadData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full"
                autoFocus
              />
              <Button onClick={handleNext} disabled={!leadData.email.trim()} className="w-full">
                Continuar
              </Button>
            </div>
          </div>
        );

      case "confirm":
        return (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <img
                src={avatarAtendente}
                alt="Atendente"
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 bg-muted/50 rounded-2xl rounded-tl-none p-4">
                <p className="text-sm text-foreground leading-relaxed">
                  Pronto! Confirma esses dados antes de enviar?
                </p>
                <ul className="text-sm mt-3 space-y-1">
                  <li><strong>Nome:</strong> {leadData.name}</li>
                  <li><strong>WhatsApp:</strong> {leadData.whatsapp}</li>
                  <li><strong>E-mail:</strong> {leadData.email}</li>
                </ul>
              </div>
            </div>
            <div className="space-y-4 pl-13">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="consent"
                  checked={leadData.consent}
                  onCheckedChange={(checked) => handleInputChange("consent", checked === true)}
                />
                <label htmlFor="consent" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                  Autorizo o contato da equipe da Dra. Bruna Durelli para apresentar meu resultado personalizado e orientações.
                </label>
              </div>
              <Button
                onClick={handleConfirm}
                disabled={!leadData.consent || isSubmitting}
                className="w-full"
              >
                {isSubmitting ? "Enviando..." : "Confirmar e ver resultado"}
                <Send className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        );

      case "success":
        return (
          <div className="space-y-4 text-center py-6">
            <CheckCircle2 className="w-16 h-16 text-primary mx-auto" />
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-foreground">Dados recebidos!</h3>
              <p className="text-sm text-muted-foreground">
                Você já pode ver seu resultado abaixo. A equipe da Dra. Bruna vai entrar em contato em breve!
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-background rounded-2xl shadow-elegant max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-background border-b border-border p-4 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-3">
            <img src={avatarAtendente} alt="Atendente" className="w-10 h-10 rounded-full object-cover" />
            <div>
              <h3 className="font-semibold text-foreground">Falta pouco!</h3>
              <p className="text-xs text-muted-foreground">
                Etapa {getStepNumber()} de {getTotalSteps()}
              </p>
            </div>
          </div>
          {currentStep !== "success" && (
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="p-6">{renderStep()}</div>
      </div>
    </div>
  );
};
