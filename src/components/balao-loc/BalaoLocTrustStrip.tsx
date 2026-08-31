import { Stethoscope, MapPin, Star, Compass } from "lucide-react";
import { useGoogleReviews } from "@/hooks/useGoogleReviews";

export const BalaoLocTrustStrip = () => {
  const { data } = useGoogleReviews();

  const items = [
    {
      icon: Stethoscope,
      label: "Dra. Bruna Durelli",
      sub: "Direção médica LevSer",
    },
    {
      icon: MapPin,
      label: "Jardim Paulista",
      sub: "São Paulo",
    },
    {
      icon: Star,
      label:
        data?.rating && data.rating > 0
          ? `${data.rating.toFixed(1).replace(".", ",")} no Google`
          : "Avaliações reais",
      sub: "Google · pacientes da LevSer",
    },
    {
      icon: Compass,
      label: "Método LevSer",
      sub: "Além do procedimento",
    },
  ];

  return (
    <div className="bg-muted/50 border-b border-border/60">
      <div className="mx-auto w-full max-w-3xl px-5 py-5">
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {items.map(({ icon: Icon, label, sub }) => (
            <li key={label} className="flex items-start gap-2.5">
              <Icon className="h-4 w-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium text-foreground leading-snug">{label}</p>
                <p className="text-xs text-muted-foreground leading-snug">{sub}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
