import { Star } from "lucide-react";
import { useGoogleReviews } from "@/hooks/useGoogleReviews";
import { GoogleReviewCard } from "@/components/GoogleReviewCard";
import type { GoogleReview } from "@/types/google-reviews";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

/**
 * LP C1 — prova social dentro da própria página.
 * Sem qualquer link externo (Google, Maps, perfil do autor).
 * Fonte de nota/volume/reviews: useGoogleReviews (mesma do restante do site).
 */

const THEMES: { key: string; terms: string[] }[] = [
  // 1. Dra. Bruna / confiança / atenção
  {
    key: "medica",
    terms: ["bruna", "doutora", "dra", "médica", "medica", "atenciosa", "atencioso", "atenção", "atencao", "confian", "profissional"],
  },
  // 2. equipe / acompanhamento / cuidado / clareza / organização
  {
    key: "equipe",
    terms: ["equipe", "acompanham", "cuidado", "cuidam", "clareza", "clara", "organiza", "nutri", "explic"],
  },
  // 3. estrutura / experiência / atendimento / acolhimento
  {
    key: "experiencia",
    terms: ["estrutura", "espaço", "espaco", "clínica", "clinica", "ambiente", "experiência", "experiencia", "atendimento", "acolh", "recep"],
  },
];

const normalize = (value: string) => value.toLowerCase();

const themeOf = (review: GoogleReview): string | null => {
  const text = normalize(review.text);
  for (const theme of THEMES) {
    if (theme.terms.some((term) => text.includes(term))) return theme.key;
  }
  return null;
};

const priorityScore = (review: GoogleReview): number => {
  const text = normalize(review.text);
  return THEMES.reduce((score, theme, index) => {
    const hits = theme.terms.filter((term) => text.includes(term)).length;
    return score + hits * (THEMES.length - index);
  }, 0);
};

export const selectReviews = (reviews: GoogleReview[]): GoogleReview[] => {
  const eligible = reviews
    .filter((review) => review.rating >= 4 && (review.text?.trim().length ?? 0) > 0)
    .sort((a, b) => priorityScore(b) - priorityScore(a));

  // Os 3 primeiros cards buscam diversidade temática (médica / equipe / experiência).
  const highlighted: GoogleReview[] = [];
  for (const theme of THEMES) {
    const match = eligible.find(
      (review) => !highlighted.includes(review) && themeOf(review) === theme.key
    );
    if (match) highlighted.push(match);
  }

  const rest = eligible.filter((review) => !highlighted.includes(review));
  return [...highlighted, ...rest].slice(0, 6);
};

export const Glp1Avaliacoes = () => {
  const { data, isLoading, isError } = useGoogleReviews();

  if (isLoading || isError || !data?.reviews?.length) return null;

  const selected = selectReviews(data.reviews);
  if (selected.length === 0) return null;

  return (
    <section id="experiencia" className="bg-muted/40">
      <div className="mx-auto w-full max-w-5xl px-5 py-12 md:py-16">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary mb-3">
          Experiência LevSer
        </p>
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground leading-snug">
          O cuidado também aparece na experiência de quem passa por aqui.
        </h2>
        <p className="mt-3 text-base text-muted-foreground leading-relaxed">
          Avaliações compartilhadas por pessoas que já conheceram a LevSer e nossa equipe.
        </p>

        {typeof data.rating === "number" && data.rating > 0 && (
          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="flex gap-0.5" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.round(data.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-muted text-muted"
                  }`}
                />
              ))}
            </span>
            <span className="text-xl font-semibold text-foreground">
              {data.rating.toFixed(1).replace(".", ",")}
            </span>
            {typeof data.total_reviews === "number" && data.total_reviews > 0 && (
              <span className="text-sm text-muted-foreground">
                {data.total_reviews} avaliações no Google
              </span>
            )}
          </div>
        )}

        <div className="mt-8 relative">
          <Carousel opts={{ align: "start", loop: selected.length > 3 }}>
            <CarouselContent className="-ml-4">
              {selected.map((review) => (
                <CarouselItem key={review.time} className="pl-4 basis-full md:basis-1/3">
                  <GoogleReviewCard review={review} variant="compact" />
                </CarouselItem>
              ))}
            </CarouselContent>
            {selected.length > 3 && (
              <>
                <CarouselPrevious className="left-1 md:-left-10" />
                <CarouselNext className="right-1 md:-right-10" />
              </>
            )}
          </Carousel>
        </div>
      </div>
    </section>
  );
};
