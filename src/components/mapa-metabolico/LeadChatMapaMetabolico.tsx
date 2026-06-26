import { useState, useEffect, useRef } from "react";
import { X, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { trackEvent, trackLeadChatAbandonment } from "@/lib/analytics";
import { getSessionId } from "@/lib/sessionTracking";
import { trackFormSubmission } from "@/lib/tracking";
import avatarAtendente from "@/assets/avatar-atendente.avif";
import type { Answers, ScoreResult } from "@/lib/mapa-metabolico/types";
import { buildLeadTrackingPayload } from "@/lib/tracking";
import { submitLeadPayload } from "@/lib/leadDelivery";

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
  const contentRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

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

  const handleConfirm = async () => {
    if (isSubmitting) {
      return;
    }

    if (!leadData.consent) {
      alert("Por favor, autorize o contato para continuar.");
      return;
    }

    setIsSubmitting(true);

    try {
      const trackingPayload = buildLeadTrackingPayload();
      const protocolId = `MAPA-${Date.now()}-${Math.random().toString(36).substring(7)}`;
      const device = /Mobi|Android/i.test(navigator.userAgent) ? "mobile" : "desktop";

      // Create structured webhook data with Mapa info
      const baseWebhookPayload = {
        nome: leadData.name || "",
        whatsapp: leadData.whatsapp || "",
        email: leadData.email || "",
        principal_objetivo: leadData.qualification1 || "",
        interesse_procedimento: leadData.qualification2 || "",
        score_total: scoring.total,
        classificacao: scoring.class,
        pilar_nutricao: scoring.pillars.nutricao,
        pilar_metabolica: scoring.pillars.metabolica_regenerativa,
        pilar_movimento: scoring.pillars.movimento,
        pilar_mente: scoring.pillars.mente_comportamento,
        pilares_prioritarios: scoring.priorityPillars.join(", "),
        insights: scoring.insights.join(" | "),
        idade: answers.age,
        peso_kg: answers.weight_kg,
        altura_cm: answers.height_cm,
        circunferencia_abdominal: answers.waist_cm,
        diagnosticos: (answers.diagnoses || []).join(", "),
        horas_sono: answers.sleep_hours_bucket,
        nivel_estresse: answers.stress_0_10,
        frequencia_exercicio: answers.exercise_freq_bucket,
        frequencia_ultra_processados: answers.ultra_processed_freq,
        origem: origin,
        page_slug: window.location.pathname,
        url: window.location.href,
        device,
        utm_source: trackingPayload.utm_source,
        utm_medium: trackingPayload.utm_medium,
        utm_campaign: trackingPayload.utm_campaign,
        utm_id: trackingPayload.utm_id,
        utm_adgroup: trackingPayload.utm_adgroup,
        utm_content: trackingPayload.utm_content,
        utm_term: trackingPayload.utm_term,
        utm_matchtype: trackingPayload.utm_matchtype,
        utm_device: trackingPayload.utm_device,
        utm_network: trackingPayload.utm_network,
        utm_source_platform: trackingPayload.utm_source_platform,
        utm_creative_format: trackingPayload.utm_creative_format,
        utm_marketing_tactic: trackingPayload.utm_marketing_tactic,
        gclid: trackingPayload.gclid,
        gbraid: trackingPayload.gbraid,
        wbraid: trackingPayload.wbraid,
        fbclid: trackingPayload.fbclid,
        fbp: trackingPayload.fbp,
        fbc: trackingPayload.fbc,
        gclientid: trackingPayload.gclientid,
        referrer: trackingPayload.referrer,
        click_id: trackingPayload.click_id,
        utm_referrer: trackingPayload.utm_referrer,
        landing_page: trackingPayload.landing_page,
        first_page: trackingPayload.first_page,
        last_page: trackingPayload.last_page,
        page_path: trackingPayload.page_path,
        page_url: trackingPayload.page_url,
        timestamp: trackingPayload.timestamp,
        protocol_id: protocolId,
      };

      const webhookPayload = baseWebhookPayload;

      await submitLeadPayload(webhookPayload);

      trackEvent("lead_converted", {
        source: origin,
        method: "widget_mapa",
        device,
        score: scoring.total,
        classification: scoring.class,
        ...trackingPayload,
      });
      
      // Track form submission to data platform
      await trackFormSubmission("mapa_metabolico_lead", {
        name: leadData.name,
        whatsapp: leadData.whatsapp,
        email: leadData.email,
        qualification1: leadData.qualification1,
        qualification2: leadData.qualification2,
        score: scoring.total,
        classification: scoring.class,
        priority_pillars: scoring.priorityPillars.join(", "),
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
    <div
      className="fixed inset-0 z-[120] flex items-end justify-center md:items-center md:justify-end md:pr-6 md:pb-6"
      data-gtm-suppress-click="true"
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative w-full md:w-[420px] bg-background rounded-t-3xl md:rounded-3xl shadow-2xl max-h-[90vh] md:max-h-[600px] flex flex-col animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/50">
          <div>
            <h3 className="font-serif font-bold text-lg text-foreground">Agende sua Pré-consulta</h3>
            <p className="text-xs text-muted-foreground mt-1">Passo {getStepNumber()} de {getTotalSteps()}</p>
          </div>
          {currentStep !== "success" && (
            <button onClick={handleClose} className="p-2 hover:bg-muted rounded-full transition-colors" aria-label="Fechar">
              <X className="h-5 w-5 text-muted-foreground" />
            </button>
          )}
        </div>

        {/* Progress bar */}
        <div className="px-6 pt-4">
          <div className="w-full bg-muted/30 rounded-full h-1.5">
            <div
              className="bg-gradient-to-r from-primary to-primary/80 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${(getStepNumber() / getTotalSteps()) * 100}%` }}
            />
          </div>
        </div>

        {/* Content area */}
        <div ref={contentRef} className="flex-1 overflow-y-auto p-6">{renderStep()}</div>
      </div>
    </div>
  );
};
