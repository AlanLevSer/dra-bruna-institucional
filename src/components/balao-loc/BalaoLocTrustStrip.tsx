import { Star } from "lucide-react";
import { useGoogleReviews } from "@/hooks/useGoogleReviews";

export const BalaoLocTrustStrip = () => {
  const { data } = useGoogleReviews();
  const rating = data?.rating && data.rating > 0 ? data.rating.toFixed(1).replace(".", ",") : "4,9";
  const totalReviews = data?.total_reviews && data.total_reviews > 0 ? data.total_reviews : null;

  return (
    <div className="bg-muted/50 border-b border-border/60">
      <div className="mx-auto w-full max-w-5xl px-5 py-5 lg:px-10">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-12">

          {/* Group A — social proof */}
          <div className="flex items-center gap-3">
            <span className="font-kumbh text-4xl font-bold text-foreground tabular-nums leading-none">
              {rating}
            </span>
            <div>
              <div className="flex gap-0.5" aria-label="5 estrelas">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" aria-hidden="true" />
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                {totalReviews ? `${totalReviews} avaliações` : "avaliações"} no Google
              </p>
            </div>
          </div>

          {/* Separator — visible on sm+ */}
          <div className="hidden sm:block w-px self-stretch bg-border/60" aria-hidden="true" />

          {/* Group B — institutional */}
          <div className="space-y-0.5">
            <p className="text-sm font-medium text-foreground">Dra. Bruna Durelli</p>
            <p className="text-xs text-muted-foreground">Jardim Paulista, São Paulo</p>
            <p className="text-xs text-muted-foreground">
              Método LevSer · Além do procedimento
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
