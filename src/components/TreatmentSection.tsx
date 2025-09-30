import { ReactNode } from "react";
import { GrafismoDecor } from "@/components/GrafismoDecor";

interface TreatmentSectionProps {
  title: string;
  children: ReactNode;
  variant?: "default" | "muted";
}

export const TreatmentSection = ({
  title,
  children,
  variant = "default",
}: TreatmentSectionProps) => {
  return (
    <section
      className={`relative py-16 overflow-hidden ${
        variant === "muted" ? "bg-muted/30" : "bg-background"
      }`}
    >
      <GrafismoDecor 
        variant="background" 
        position={variant === "muted" ? "bottom-right" : "top-left"} 
        size="md" 
        opacity={0.15} 
        rotate={variant === "muted" ? -25 : 25}
        color="gray"
      />
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-8">
          {title}
        </h2>
        <div className="prose prose-lg max-w-none text-muted-foreground">
          {children}
        </div>
      </div>
    </section>
  );
};
