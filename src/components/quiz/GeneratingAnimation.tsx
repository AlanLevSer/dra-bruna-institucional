import { useEffect, useState } from "react";
import { Loader2, Sparkles, Target, Brain } from "lucide-react";

export const GeneratingAnimation = () => {
  const [messageIndex, setMessageIndex] = useState(0);
  
  const messages = [
    { text: "Analisando seu perfil metabólico...", icon: Brain },
    { text: "Personalizando seu plano...", icon: Target },
    { text: "Preparando sua jornada de transformação...", icon: Sparkles }
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 1500);
    
    return () => clearInterval(interval);
  }, []);
  
  const CurrentIcon = messages[messageIndex].icon;
  
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 animate-in fade-in zoom-in duration-500">
      <div className="relative mb-8">
        <Loader2 className="w-16 h-16 text-primary animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <CurrentIcon className="w-8 h-8 text-primary animate-pulse" />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mb-2 text-center">
        Gerando seu plano personalizado
      </h2>
      
      <p className="text-muted-foreground text-center animate-in fade-in duration-300" key={messageIndex}>
        {messages[messageIndex].text}
      </p>
      
      <div className="flex gap-2 mt-6">
        {messages.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === messageIndex ? 'bg-primary w-8' : 'bg-primary/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
