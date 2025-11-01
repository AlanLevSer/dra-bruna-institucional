import { useState, useEffect, useRef } from "react";
import { X, ArrowLeft, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { trackEvent } from "@/lib/analytics";
import { getStoredUTMContext } from "@/lib/utm";
import { CONTACT } from "@/lib/constants";
import {
  leadNameSchema,
  leadWhatsAppSchema,
  leadEmailSchema,
  type LeadData,
} from "@/lib/leadValidation";
import { formatBRPhone } from "@/lib/phoneMask";
import avatarImage from "@/assets/avatar-dra-bruna.avif";

type Step = "name" | "whatsapp" | "email" | "confirm";

type Props = {
  showFloatingButton?: boolean;
  origin?: string;
};

const STEP_PROGRESS: Record<Step, number> = {
  name: 0,
  whatsapp: 33,
  email: 66,
  confirm: 100,
};

const STEP_LABELS: Record<Step, string> = {
  name: "Nome Completo",
  whatsapp: "WhatsApp",
  email: "E-mail",
  confirm: "Confirmação",
};

export default function LeadChatWidget({ showFloatingButton = false, origin = "unknown" }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>("name");
  const [isTyping, setIsTyping] = useState(false);
  const [leadData, setLeadData] = useState<Partial<LeadData>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.LeadChat = {
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
        isOpen: () => isOpen,
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, step]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    trackEvent("chat_open", {
      page_slug: window.location.pathname,
      origin,
    });
  };

  const handleClose = () => {
    setIsOpen(false);
    trackEvent("chat_close", {
      step,
      completed: step === "confirm",
    });
  };

  const validateStep = (stepName: Step, value: string): boolean => {
    setErrors({});
    try {
      switch (stepName) {
        case "name":
          leadNameSchema.parse({ name: value });
          break;
        case "whatsapp":
          leadWhatsAppSchema.parse({ whatsapp: value.replace(/\D/g, "") });
          break;
        case "email":
          leadEmailSchema.parse({ email: value });
          break;
      }
      return true;
    } catch (error: any) {
      if (error.errors?.[0]?.message) {
        setErrors({ [stepName]: error.errors[0].message });
      }
      return false;
    }
  };

  const showTypingAnimation = () => {
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 300);
  };

  const handleNext = () => {
    const trimmedValue = inputValue.trim();

    if (step === "name") {
      if (!validateStep("name", trimmedValue)) return;
      setLeadData({ ...leadData, name: trimmedValue });
      showTypingAnimation();
      setTimeout(() => {
        setStep("whatsapp");
        setInputValue("");
        trackEvent("chat_step", { step: "whatsapp" });
      }, 300);
    } else if (step === "whatsapp") {
      const phoneDigits = trimmedValue.replace(/\D/g, "");
      if (!validateStep("whatsapp", phoneDigits)) return;
      setLeadData({ ...leadData, whatsapp: phoneDigits });
      showTypingAnimation();
      setTimeout(() => {
        setStep("email");
        setInputValue("");
        trackEvent("chat_step", { step: "email" });
      }, 300);
    } else if (step === "email") {
      if (!validateStep("email", trimmedValue)) return;
      setLeadData({ ...leadData, email: trimmedValue });
      showTypingAnimation();
      setTimeout(() => {
        setStep("confirm");
        trackEvent("chat_step", { step: "confirm" });
      }, 300);
    }
  };

  const handleBack = () => {
    const stepOrder: Step[] = ["name", "whatsapp", "email", "confirm"];
    const currentIndex = stepOrder.indexOf(step);
    if (currentIndex > 0) {
      const prevStep = stepOrder[currentIndex - 1];
      setStep(prevStep);
      setErrors({});
      trackEvent("chat_back", { from: step, to: prevStep });
    }
  };

  const handleConfirm = () => {
    const utmContext = getStoredUTMContext();
    
    let gaClientId = "";
    if (typeof document !== "undefined") {
      const gaCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("_ga="));
      if (gaCookie) {
        const parts = gaCookie.split(".");
        if (parts.length >= 4) {
          gaClientId = `${parts[2]}.${parts[3]}`;
        }
      }
    }

    const webhookPayload = {
      nome: leadData.name || "",
      whatsapp: leadData.whatsapp || "",
      email: leadData.email || "",
      origem: origin,
      url: window.location.href,
      referrer: utmContext.referrer || "",
      utm_source: utmContext.params.utm_source || "",
      utm_medium: utmContext.params.utm_medium || "",
      utm_campaign: utmContext.params.utm_campaign || "",
      utm_content: utmContext.params.utm_content || "",
      utm_term: utmContext.params.utm_term || "",
      utm_id: utmContext.params.utm_id || "",
      utm_source_platform: utmContext.params.utm_source_platform || "",
      utm_creative_format: utmContext.params.utm_creative_format || "",
      utm_marketing_tactic: utmContext.params.utm_marketing_tactic || "",
      gclid: utmContext.params.gclid || "",
      fbclid: utmContext.params.fbclid || "",
      gclientid: gaClientId,
      ga_utm: `${utmContext.params.utm_source || ""}|${utmContext.params.utm_medium || ""}|${utmContext.params.utm_campaign || ""}`,
      timestamp: new Date().toISOString(),
    };

    trackEvent("form_submit", {
      origin: "chat_widget",
      ...webhookPayload,
    });

    fetch("https://hook.us2.make.com/abcd1234", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(webhookPayload),
    }).catch(() => {});

    const whatsappMessage = encodeURIComponent(
      `Olá! Vim pelo site.\n\n*Nome:* ${leadData.name}\n*WhatsApp:* ${formatBRPhone(leadData.whatsapp || "")}\n*Email:* ${leadData.email}\n*Origem:* ${origin}`
    );

    trackEvent("whatsapp_redirect", {
      origin: "chat_widget",
      phone: CONTACT.PHONE_DISPLAY,
    });

    window.open(`https://wa.me/${CONTACT.WHATSAPP_NUMBER}?text=${whatsappMessage}`, "_blank");
    
    setTimeout(() => {
      setIsOpen(false);
      setStep("name");
      setLeadData({});
      setInputValue("");
      setErrors({});
    }, 500);
  };

  const handleInputChange = (value: string) => {
    if (step === "whatsapp") {
      const digits = value.replace(/\D/g, "");
      setInputValue(formatBRPhone(digits));
    } else {
      setInputValue(value);
    }
    setErrors({});
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (step === "confirm") {
        handleConfirm();
      } else {
        handleNext();
      }
    }
  };

  const getStepMessage = (): string => {
    switch (step) {
      case "name":
        return "Olá! Que alegria ter você aqui! 😊 Para começarmos, qual é o seu nome completo?";
      case "whatsapp":
        return `Prazer em te conhecer, ${leadData.name?.split(" ")[0]}! ✨ Agora me conta, qual é o seu WhatsApp? Assim consigo te enviar informações importantes sobre sua jornada de transformação!`;
      case "email":
        return "Maravilha! 💚 Qual é o seu melhor e-mail? Vou te enviar conteúdos exclusivos e materiais que vão te ajudar nessa jornada!";
      case "confirm":
        return "Quase lá! 🎯 Dá uma conferida se está tudo certinho com seus dados:";
      default:
        return "";
    }
  };

  const getInputPlaceholder = (): string => {
    switch (step) {
      case "name":
        return "Ex: Maria Silva Santos";
      case "whatsapp":
        return "(11) 98765-4321";
      case "email":
        return "seuemail@exemplo.com";
      default:
        return "";
    }
  };

  return (
    <>
      {showFloatingButton && !isOpen && (
        <Button
          onClick={handleOpen}
          className="fixed bottom-6 right-6 z-50 rounded-full shadow-elegant hover:shadow-hover hover:scale-105 transition-all px-6 py-6 text-base font-medium"
          aria-label="Abrir chat para agendamento"
        >
          Agende sua pré-consulta
        </Button>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center md:items-center md:justify-end md:pr-6 md:pb-6">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={handleClose}
          />
          
          <div className="relative w-full md:w-[420px] md:h-[600px] h-[80vh] bg-background rounded-t-2xl md:rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 md:slide-in-from-right-4 duration-300">
            <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-lg">Agende sua Avaliação</h3>
                <p className="text-sm opacity-90">
                  {STEP_LABELS[step]} ({Object.keys(STEP_LABELS).indexOf(step) + 1}/4)
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="text-primary-foreground hover:bg-primary-foreground/20"
              >
                <X size={20} />
              </Button>
            </div>

            <Progress value={STEP_PROGRESS[step]} className="h-1" />

            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              <div className="flex items-start gap-3">
                <img 
                  src={avatarImage} 
                  alt="Dra. Bruna" 
                  className="w-10 h-10 rounded-full object-cover shrink-0 ring-2 ring-primary/20"
                />
                <div className="flex-1">
                  <div className="bg-muted rounded-2xl rounded-tl-none p-4">
                    <p className="text-sm leading-relaxed">{getStepMessage()}</p>
                  </div>
                </div>
              </div>

              {isTyping && (
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Loader2 size={16} className="animate-spin text-primary" />
                  </div>
                  <div className="bg-muted rounded-2xl rounded-tl-none p-4">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}

              {step === "confirm" && (
                <div className="space-y-3 bg-muted/50 rounded-xl p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Nome:</span>
                    <span className="text-sm font-medium">{leadData.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">WhatsApp:</span>
                    <span className="text-sm font-medium">{formatBRPhone(leadData.whatsapp || "")}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Email:</span>
                    <span className="text-sm font-medium">{leadData.email}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t bg-background">
              {errors[step] && (
                <p className="text-sm text-destructive mb-2">{errors[step]}</p>
              )}
              
              {step !== "confirm" ? (
                <div className="flex gap-2">
                  {step !== "name" && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleBack}
                      className="shrink-0"
                    >
                      <ArrowLeft size={18} />
                    </Button>
                  )}
                  <div className="flex-1 relative">
                    <Input
                      ref={inputRef}
                      type={step === "email" ? "email" : "text"}
                      value={inputValue}
                      onChange={(e) => handleInputChange(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={getInputPlaceholder()}
                      className="pr-12"
                    />
                    <Button
                      size="icon"
                      onClick={handleNext}
                      disabled={!inputValue.trim()}
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                    >
                      <Send size={16} />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    className="flex-1"
                  >
                    <ArrowLeft size={18} className="mr-2" />
                    Voltar
                  </Button>
                  <Button
                    onClick={handleConfirm}
                    className="flex-1"
                  >
                    Confirmar e falar no WhatsApp
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

declare global {
  interface Window {
    LeadChat: {
      open: () => void;
      close: () => void;
      isOpen: () => boolean;
    };
  }
}
