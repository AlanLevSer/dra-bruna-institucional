import { ReactNode } from "react";

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
      className={`py-16 ${
        variant === "muted" ? "bg-muted/30" : "bg-background"
      }`}
    >
      <div className="container mx-auto px-4">
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
