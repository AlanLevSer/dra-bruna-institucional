import { useState, useEffect, useRef, useCallback } from "react";
import { X, ArrowLeft, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { trackEvent } from "@/lib/analytics";
import { getStoredUTMContext } from "@/lib/utm";
import { CONTACT } from "@/lib/constants";
import { toast } from "@/hooks/use-toast";
import confetti from "canvas-confetti";
import {
  leadNameSchema,
  leadWhatsAppSchema,
  leadEmailSchema,
  type LeadData,
} from "@/lib/leadValidation";
import { formatBRPhone } from "@/lib/phoneMask";
import avatarImage from "@/assets/dra-bruna-profile.avif";
import { ZodError } from "zod";

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
  const [completedSteps, setCompletedSteps] = useState<Step[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    trackEvent("chat_open", {
      page_slug: window.location.pathname,
      origin,
    });
  }, [origin]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    trackEvent("chat_close", {
      step,
      completed: step === "confirm",
    });
  }, [step]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // ALWAYS register globally, even if widget isn't visible
      window.LeadChat = {
        open: handleOpen,
        close: handleClose,
        isOpen: () => isOpen,
      };
      
      console.log("[LeadChat] Widget registered globally", { origin, showFloatingButton });
    }
    
    return () => {
      // Cleanup on unmount
      if (typeof window !== "undefined") {
        delete window.LeadChat;
      }
    };
  }, [handleClose, handleOpen, isOpen, origin, showFloatingButton]);

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
  }, [handleClose, isOpen]);

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
    } catch (error) {
      if (error instanceof ZodError && error.errors[0]?.message) {
        setErrors({ [stepName]: error.errors[0].message });
      }
      return false;
    }
  };

  const showTypingAnimation = () => {
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 300);
  };

  const triggerHapticFeedback = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate([50]);
    }
  };

  const playProgressSound = () => {
    try {
      const win = window as WindowWithWebkitAudioContext;
      const AudioContextCtor = window.AudioContext ?? win.webkitAudioContext;
      if (!AudioContextCtor) return;
      
      const audioContext = new AudioContextCtor();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      const frequencies: Record<Step, number> = {
        name: 523.25,
        whatsapp: 659.25,
        email: 783.99,
        confirm: 1046.50,
      };
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = frequencies[step];
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
      // Silently fail if audio not supported
    }
  };

  const triggerConfettiCelebration = () => {
    const duration = 2000;
    const animationEnd = Date.now() + duration;
    
    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const colors = ['#B8654B', '#D4A373', '#4A7C59', '#E67E22'];

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        particleCount,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: randomInRange(0.1, 0.9),
          y: Math.random() - 0.2
        },
        colors,
        ticks: 60,
        gravity: 0.8,
        scalar: 1.2,
        drift: 0,
      });
    }, 250);
  };

  const showMilestoneToast = (stepName: Step) => {
    const messages: Record<Step, { title: string; description: string }> = {
      name: { 
        title: "🎯 Primeira etapa completa!", 
        description: "Ótimo começo! Continue assim." 
      },
      whatsapp: { 
        title: "💚 Estamos conectados!", 
        description: "Metade da jornada completa." 
      },
      email: { 
        title: "✨ Quase lá!", 
        description: "Última etapa antes da confirmação." 
      },
      confirm: { 
        title: "🎉 Jornada completa!", 
        description: "Vamos te conectar no WhatsApp agora!" 
      }
    };

    toast({
      title: messages[stepName].title,
      description: messages[stepName].description,
      duration: 2500,
    });
  };

  const handleNext = () => {
    const trimmedValue = inputValue.trim();

    if (step === "name") {
      if (!validateStep("name", trimmedValue)) return;
      setLeadData({ ...leadData, name: trimmedValue });
      
      triggerHapticFeedback();
      playProgressSound();
      showMilestoneToast("name");
      setCompletedSteps([...completedSteps, "name"]);
      
      showTypingAnimation();
      setTimeout(() => {
        setStep("whatsapp");
        setInputValue("");
        trackEvent("chat_step", { step: "whatsapp", milestone: "name_completed" });
      }, 300);
    } else if (step === "whatsapp") {
      const phoneDigits = trimmedValue.replace(/\D/g, "");
      if (!validateStep("whatsapp", phoneDigits)) return;
      setLeadData({ ...leadData, whatsapp: phoneDigits });
      
      triggerHapticFeedback();
      playProgressSound();
      showMilestoneToast("whatsapp");
      setCompletedSteps([...completedSteps, "whatsapp"]);
      
      showTypingAnimation();
      setTimeout(() => {
        setStep("email");
        setInputValue("");
        trackEvent("chat_step", { step: "email", milestone: "whatsapp_completed" });
      }, 300);
    } else if (step === "email") {
      if (!validateStep("email", trimmedValue)) return;
      setLeadData({ ...leadData, email: trimmedValue });
      
      triggerHapticFeedback();
      playProgressSound();
      showMilestoneToast("email");
      setCompletedSteps([...completedSteps, "email"]);
      
      showTypingAnimation();
      setTimeout(() => {
        setStep("confirm");
        trackEvent("chat_step", { step: "confirm", milestone: "email_completed" });
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

  const generateFallbackId = (): string => {
    return `LD${Date.now().toString(36).toUpperCase()}`;
  };

  const handleConfirm = () => {
    triggerHapticFeedback();
    playProgressSound();
    triggerConfettiCelebration();
    showMilestoneToast("confirm");
    
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

    const protocolId = utmContext.params.click_id || generateFallbackId();

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
      click_id: utmContext.params.click_id || "",
      protocol_id: protocolId,
      timestamp: new Date().toISOString(),
    };

    trackEvent("form_submit", {
      origin: "chat_widget",
      had_celebrations: true,
      ...webhookPayload,
    });

    fetch("https://hook.eu2.make.com/a8npmvf1rzbfjw8c1iigmm1lqezfhd37", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(webhookPayload),
    }).catch(() => {});

    const whatsappMessage = encodeURIComponent(
      `Oi, Dra. Bruna!\n\nAcabei de conhecer seu trabalho e quero saber como você pode me ajudar a transformar minha saúde.\n\n---\n⚠️ *Guarde esta mensagem!*\nEla é seu comprovante de atendimento.\n\n📋 Protocolo: ${protocolId}`
    );

    // Prefer web.whatsapp.com on desktop to avoid environments that block api.whatsapp.com
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobi/i.test(
      navigator.userAgent
    );
    const waUrl = isMobile
      ? `https://wa.me/${CONTACT.WHATSAPP_NUMBER}?text=${whatsappMessage}`
      : `https://web.whatsapp.com/send?phone=${CONTACT.WHATSAPP_NUMBER}&text=${whatsappMessage}`;

    trackEvent("whatsapp_redirect", {
      origin: "chat_widget",
      phone: CONTACT.PHONE_DISPLAY,
      ua: isMobile ? "mobile" : "desktop",
    });

    window.open(waUrl, "_blank");
    
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
        <div 
          onClick={handleOpen}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 cursor-pointer hover:scale-105 transition-all duration-300 animate-fade-in group"
          role="button"
          aria-label="Comece sua jornada hoje"
        >
          {/* Desktop - Speech bubble + Avatar */}
          <div className="hidden md:flex items-center gap-3">
            {/* Speech Bubble */}
            <div className="bg-white rounded-2xl shadow-xl px-4 py-3 relative animate-in slide-in-from-left-2 duration-500">
              <p className="text-sm font-medium text-gray-800 leading-tight whitespace-nowrap pr-2">
                Comece sua jornada hoje! ✨
              </p>
              {/* Arrow pointing to avatar */}
              <div className="absolute right-[-8px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[8px] border-t-transparent border-l-[8px] border-l-white border-b-[8px] border-b-transparent" />
            </div>
            
            {/* Avatar with online indicator */}
            <div className="relative animate-in zoom-in-50 duration-300" style={{ animationDelay: '200ms' }}>
              <img 
                src={avatarImage}
                alt="Dra. Bruna Durelli" 
                className="w-14 h-14 rounded-full object-cover object-top border-2 border-white shadow-lg group-hover:shadow-xl transition-shadow"
              />
              {/* Online indicator */}
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
            </div>
          </div>

          {/* Mobile - Compact version with avatar + small bubble */}
          <div className="md:hidden flex items-center gap-2">
            <div className="bg-white rounded-xl shadow-lg px-3 py-2 relative">
              <span className="text-xs font-medium text-gray-800">Comece hoje! ✨</span>
              <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-l-[6px] border-l-white border-b-[6px] border-b-transparent" />
            </div>
            <div className="relative">
              <img 
                src={avatarImage}
                alt="Dra. Bruna" 
                className="w-12 h-12 rounded-full object-cover object-top border-2 border-white shadow-lg"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse" />
            </div>
          </div>
        </div>
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

            {/* Premium progress bar with step indicators and animations */}
            <div className="relative px-4 py-3 bg-gradient-to-b from-primary/5 to-transparent">
              <div className="flex justify-between items-center mb-3">
                {(['name', 'whatsapp', 'email', 'confirm'] as Step[]).map((stepName, idx) => {
                  const stepOrder: Step[] = ['name', 'whatsapp', 'email', 'confirm'];
                  const currentStepIndex = stepOrder.indexOf(step);
                  const isActive = idx === currentStepIndex;
                  const isCompleted = completedSteps.includes(stepName);
                  const labels = ['Nome', 'WhatsApp', 'E-mail', 'Confirmar'];
                  
                  return (
                    <div key={idx} className="flex flex-col items-center gap-1.5 relative">
                      {/* Step circle with animations */}
                      <div className={`
                        w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold
                        transition-all duration-500 relative
                        ${isCompleted 
                          ? 'bg-gradient-premium text-white scale-110 shadow-lg' 
                          : isActive 
                          ? 'bg-primary text-white ring-4 ring-primary/20 scale-110' 
                          : 'bg-primary/15 text-primary/40 scale-90'
                        }
                      `}>
                        {isCompleted ? (
                          <span className="text-lg">✓</span>
                        ) : (
                          <span>{idx + 1}</span>
                        )}
                        
                        {/* Glow effect for active step */}
                        {isActive && (
                          <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
                        )}
                      </div>
                      
                      {/* Step label */}
                      <span className={`text-[10px] font-medium transition-all duration-300 ${
                        isActive ? 'text-primary font-semibold scale-105' : 
                        isCompleted ? 'text-primary/70' : 
                        'text-muted-foreground'
                      }`}>
                        {labels[idx]}
                      </span>
                      
                      {/* Connection line (except for last step) */}
                      {idx < 3 && (
                        <div 
                          className={`absolute top-[18px] left-[calc(50%+20px)] w-[calc(100vw/5-40px)] md:w-[60px] h-0.5 transition-all duration-500 ${
                            isCompleted ? 'bg-gradient-premium' : 'bg-primary/10'
                          }`}
                          style={{ transformOrigin: 'left center' }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
              
              {/* Main progress bar */}
              <div className="relative h-2.5 bg-primary/10 rounded-full overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-gradient-premium transition-all duration-700 ease-out relative rounded-full"
                  style={{ width: `${STEP_PROGRESS[step]}%` }}
                >
                  {/* Shimmer animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer-down opacity-60" />
                  
                  {/* Glow at the end */}
                  <div className="absolute right-0 top-0 h-full w-1 bg-white/60 shadow-lg animate-pulse" />
                </div>
              </div>
              
              {/* Progress percentage */}
              <div className="flex justify-between items-center mt-2 px-1">
                <span className="text-[10px] text-muted-foreground">Início</span>
                <span className="text-xs font-bold text-primary tabular-nums">
                  {STEP_PROGRESS[step]}%
                </span>
                <span className="text-[10px] text-muted-foreground">Completo</span>
              </div>
            </div>

            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              <div className="flex items-start gap-3">
                <img 
                  src={avatarImage} 
                  alt="Dra. Bruna" 
                  className="w-10 h-10 rounded-full object-cover object-top shrink-0 ring-2 ring-primary/20"
                  style={{ objectPosition: '50% 20%' }}
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

            <div className="px-4 pt-4 pb-8 md:pb-4 border-t bg-background">
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

type WindowWithWebkitAudioContext = Window & {
  webkitAudioContext?: typeof AudioContext;
};
