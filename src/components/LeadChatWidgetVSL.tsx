import { useState, useEffect, useRef } from "react";
import { X, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { CONTACT } from "@/lib/constants";
import avatarAtendente from "@/assets/avatar-atendente.avif";
import { trackEvent, trackLeadChatAbandonment, trackWhatsAppClick } from "@/lib/analytics";
import { getSessionId } from "@/lib/sessionTracking";
import { trackFormSubmission } from "@/lib/tracking";
import { buildLeadTrackingPayload } from "@/lib/tracking";
import { submitLeadPayload } from "@/lib/leadDelivery";

type Step = 
  | "qualification1" 
  | "qualification2" 
  | "qualification3" 
  | "qualification4" 
  | "name" 
  | "whatsapp" 
  | "email" 
  | "confirm" 
  | "success";

interface LeadData {
  qualification1: string;
  qualification2: string;
  qualification3: string;
  qualification4: string;
  name: string;
  whatsapp: string;
  email: string;
  consent: boolean;
}

interface LeadChatWidgetVSLProps {
  origin?: string;
  showFloatingButton?: boolean;
  autoOpen?: boolean;
}

export const LeadChatWidgetVSL = ({ 
  origin = "vsl_metodo_levser",
  showFloatingButton = true,
  autoOpen = false 
}: LeadChatWidgetVSLProps) => {
  const [isOpen, setIsOpen] = useState(autoOpen);
  const [currentStep, setCurrentStep] = useState<Step>("qualification1");
  const [leadData, setLeadData] = useState<LeadData>({
    qualification1: "",
    qualification2: "",
    qualification3: "",
    qualification4: "",
    name: "",
    whatsapp: "",
    email: "",
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sessionId = useRef(getSessionId());

  useEffect(() => {
    if (autoOpen) {
      setIsOpen(true);
      trackEvent("lead_chat_opened", { source: origin, trigger: "auto" });
    }
  }, [autoOpen, origin]);

  const handleOpen = () => {
    setIsOpen(true);
    trackEvent("lead_chat_opened", { source: origin, trigger: "button" });
  };

  const handleClose = () => {
    // Track abandonment if not converted
    if (currentStep !== "success") {
      trackLeadChatAbandonment({
        source: origin,
        step: currentStep,
        partial_data: leadData as unknown as Record<string, unknown>,
        session_id: sessionId.current,
      });
    }
    
    setIsOpen(false);
    trackEvent("lead_chat_closed", { 
      source: origin, 
      step: currentStep,
      converted: currentStep === "success",
    });
  };

  const handleQualificationAnswer = (step: Step, answer: string) => {
    setLeadData((prev) => ({ ...prev, [step]: answer }));
    trackEvent("lead_chat_step_completed", { 
      source: origin, 
      step, 
      answer 
    });

    // Move to next step
    if (step === "qualification1") setCurrentStep("qualification2");
    else if (step === "qualification2") setCurrentStep("qualification3");
    else if (step === "qualification3") setCurrentStep("qualification4");
    else if (step === "qualification4") setCurrentStep("name");
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
      const protocolId = `VSL-${Date.now()}-${Math.random().toString(36).substring(7)}`;

      // Detect device
      const device = /Mobi|Android/i.test(navigator.userAgent) ? "mobile" : "desktop";

      const webhookPayload = {
        // Personal data
        nome: leadData.name || "",
        whatsapp: leadData.whatsapp || "",
        email: leadData.email || "",

        // Qualification answers
        dor: leadData.qualification1 || "",
        objetivo: leadData.qualification2 || "",
        momento: leadData.qualification3 || "",
        objecao: leadData.qualification4 || "",

        // Origin
        origem: origin,
        page_slug: window.location.pathname,
        url: window.location.href,

        // Device
        device,

        // Basic UTMs
        utm_source: trackingPayload.utm_source,
        utm_medium: trackingPayload.utm_medium,
        utm_campaign: trackingPayload.utm_campaign,
        utm_content: trackingPayload.utm_content,
        utm_term: trackingPayload.utm_term,
        utm_id: trackingPayload.utm_id,
        utm_adgroup: trackingPayload.utm_adgroup,
        utm_matchtype: trackingPayload.utm_matchtype,
        utm_device: trackingPayload.utm_device,
        utm_network: trackingPayload.utm_network,

        // Advanced UTMs
        utm_source_platform: trackingPayload.utm_source_platform,
        utm_creative_format: trackingPayload.utm_creative_format,
        utm_marketing_tactic: trackingPayload.utm_marketing_tactic,

        // Tracking IDs
        gclid: trackingPayload.gclid,
        gbraid: trackingPayload.gbraid,
        wbraid: trackingPayload.wbraid,
        fbclid: trackingPayload.fbclid,
        fbp: trackingPayload.fbp,
        fbc: trackingPayload.fbc,
        gclientid: trackingPayload.gclientid,

        // Referrer
        referrer: trackingPayload.referrer,
        click_id: trackingPayload.click_id,
        utm_referrer: trackingPayload.utm_referrer,
        landing_page: trackingPayload.landing_page,
        first_page: trackingPayload.first_page,
        last_page: trackingPayload.last_page,
        page_path: trackingPayload.page_path,
        page_url: trackingPayload.page_url,

        // GA UTM string
        ga_utm: `${trackingPayload.utm_source || ""}|${trackingPayload.utm_medium || ""}|${trackingPayload.utm_campaign || ""}`,

        // Timestamp
        timestamp: trackingPayload.timestamp,

        // Protocol ID
        protocol_id: protocolId,
      };

      // Send to webhook
      await submitLeadPayload(webhookPayload);

      // Track conversion
      trackEvent("lead_converted", {
        source: origin,
        method: "widget",
        device,
        has_utm: !!trackingPayload.utm_source,
        ...trackingPayload,
      });
      
      // Track form submission to data platform
      await trackFormSubmission("vsl_lead", {
        name: leadData.name,
        whatsapp: leadData.whatsapp,
        email: leadData.email,
        qualification1: leadData.qualification1,
        qualification2: leadData.qualification2,
        qualification3: leadData.qualification3,
        qualification4: leadData.qualification4,
      });

      // Facebook Pixel
      try {
        window.fbq?.("track", "Lead", {
          content_name: "Lead VSL Metodo LevSer",
          content_category: "vsl_lead",
          value: 1,
          currency: "BRL",
        });
      } catch (e) {
        void e;
      }

      setCurrentStep("success");
    } catch (error) {
      console.error("Error submitting lead:", error);
      alert("Erro ao enviar. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppRedirect = () => {
    const message = encodeURIComponent(
      `Oi, acabei de ver o vídeo do Programa LevSer e preenchi o formulário. Minha situação é: ${leadData.qualification1}. Quero saber qual caminho vocês indicam pra mim.`
    );
    const whatsappUrl = `${CONTACT.WHATSAPP_URL}?text=${message}`;
    trackWhatsAppClick(origin, { destination_url: whatsappUrl, qualification_step: leadData.qualification1 });
    window.open(whatsappUrl, "_blank");
    trackEvent("lead_whatsapp_redirect", { source: origin });
  };

  const getStepNumber = (): number => {
    const steps = ["qualification1", "qualification2", "qualification3", "qualification4", "name", "whatsapp", "email", "confirm", "success"];
    return steps.indexOf(currentStep) + 1;
  };

  const getTotalSteps = (): number => 8;

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
                  Que bom ter você aqui! Pra eu te direcionar do jeito certo, me conta: <strong>o que melhor descreve sua situação hoje?</strong>
                </p>
              </div>
            </div>
            <div className="space-y-2 pl-13">
              {[
                "Já emagreci outras vezes, mas o peso volta",
                "Tenho dificuldade em controlar fome/apetite",
                "Sinto que meu corpo está 'travado', mesmo me esforçando",
                "Quero melhorar corpo e energia ao mesmo tempo",
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
                  E <strong>qual é o seu principal objetivo</strong> com o Programa LevSer?
                </p>
              </div>
            </div>
            <div className="space-y-2 pl-13">
              {[
                "Emagrecer com saúde e manter",
                "Recuperar energia e autoestima",
                "Acabar de vez com o efeito sanfona",
                "Entender se algum procedimento médico é indicado pra mim",
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

      case "qualification3":
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
                  Entendi. E <strong>em que momento você está agora?</strong>
                </p>
              </div>
            </div>
            <div className="space-y-2 pl-13">
              {[
                "Quero começar o quanto antes",
                "Tenho interesse, mas quero entender valores/pagamento",
                "Quero conhecer melhor antes de decidir",
                "Estou planejando para os próximos meses",
              ].map((option) => (
                <Button
                  key={option}
                  onClick={() => handleQualificationAnswer("qualification3", option)}
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-3 px-4 hover:bg-primary/10 hover:border-primary transition-all"
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        );

      case "qualification4":
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
                  Última coisa: <strong>o que mais te impede hoje</strong> de chegar no resultado que você quer?
                </p>
              </div>
            </div>
            <div className="space-y-2 pl-13">
              {[
                "Falta de tempo",
                "Dificuldade de manter constância",
                "Falta de energia/motivação",
                "Ainda não achei um método que funcione pra mim",
              ].map((option) => (
                <Button
                  key={option}
                  onClick={() => handleQualificationAnswer("qualification4", option)}
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
                  Perfeito! Agora me passa seus dados pra equipe da Dra. Bruna te chamar 👇
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
              <Button
                onClick={handleNext}
                disabled={!leadData.name.trim()}
                className="w-full"
              >
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
              <Button
                onClick={handleNext}
                disabled={!leadData.whatsapp.trim()}
                className="w-full"
              >
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
              <Button
                onClick={handleNext}
                disabled={!leadData.email.trim()}
                className="w-full"
              >
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
                <p className="text-sm text-foreground leading-relaxed mb-3">
                  <strong>Confirme seus dados:</strong>
                </p>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p><strong>Nome:</strong> {leadData.name}</p>
                  <p><strong>WhatsApp:</strong> {leadData.whatsapp}</p>
                  <p><strong>E-mail:</strong> {leadData.email}</p>
                </div>
              </div>
            </div>
            <div className="space-y-3 pl-13">
              <div className="flex items-start gap-2">
                <Checkbox
                  id="consent"
                  checked={leadData.consent}
                  onCheckedChange={(checked) => handleInputChange("consent", !!checked)}
                />
                <label
                  htmlFor="consent"
                  className="text-xs text-muted-foreground leading-tight cursor-pointer"
                >
                  Autorizo a equipe da Dra. Bruna a entrar em contato comigo sobre pré-consulta e programas médicos.
                </label>
              </div>
              <Button
                onClick={handleConfirm}
                disabled={!leadData.consent || isSubmitting}
                className="w-full"
              >
                {isSubmitting ? "Enviando..." : "Enviar"}
                {!isSubmitting && <Send className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </div>
        );

      case "success":
        return (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <img
                src={avatarAtendente}
                alt="Atendente"
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl rounded-tl-none p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <p className="font-semibold text-foreground">Pronto! 🎉</p>
                </div>
                <p className="text-sm text-foreground leading-relaxed">
                  Suas respostas chegaram aqui e já estão sendo analisadas pela nossa equipe médica.
                  <br /><br />
                  Vamos te chamar no WhatsApp para te passar o melhor caminho.
                  <br /><br />
                  Se quiser adiantar, clique abaixo.
                </p>
              </div>
            </div>
            <div className="pl-13">
              <Button
                onClick={handleWhatsAppRedirect}
                variant="default"
                className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white"
              >
                Falar no WhatsApp agora
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {showFloatingButton && !isOpen && (
        <div
          onClick={handleOpen}
          className="fixed bottom-6 right-6 z-[120] flex items-center gap-3 cursor-pointer hover:scale-105 transition-all duration-300 animate-fade-in group"
          role="button"
          aria-label="Agende sua pré-consulta"
        >
          <div className="hidden md:flex items-center bg-white shadow-elegant rounded-full px-6 py-3 border border-primary/20 group-hover:shadow-hover transition-all">
            <span className="text-sm font-semibold text-foreground">
              Agende sua pré-consulta
            </span>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-primary rounded-full blur-lg opacity-50 animate-pulse"></div>
            <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-primary to-primary/80 shadow-elegant flex items-center justify-center group-hover:shadow-hover transition-all">
              <img
                src={avatarAtendente}
                alt="Atendente"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-[120] flex items-end justify-center md:items-center md:justify-end md:pr-6 md:pb-6"
          data-gtm-suppress-click="true"
        >
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={handleClose}
          />
          <div className="relative w-full md:w-[420px] bg-background rounded-t-3xl md:rounded-3xl shadow-2xl max-h-[90vh] md:max-h-[600px] flex flex-col animate-slide-up">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border/50">
              <div>
                <h3 className="font-serif font-bold text-lg text-foreground">
                  Agende sua Pré-consulta
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Passo {getStepNumber()} de {getTotalSteps()}
                </p>
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-muted rounded-full transition-colors"
                aria-label="Fechar"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
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

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {renderStep()}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
