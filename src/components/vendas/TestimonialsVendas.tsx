import { GrafismoDecor } from "@/components/GrafismoDecor";
import { Skeleton } from "@/components/ui/skeleton";
import { useGoogleReviews } from "@/hooks/useGoogleReviews";
import { GoogleReviewCard } from "@/components/GoogleReviewCard";

export const TestimonialsVendas = () => {
  const { data, isLoading, isError } = useGoogleReviews();

  return (
    <section className="relative py-10 md:py-12 bg-muted/30 overflow-hidden">
      <GrafismoDecor variant="background" position="top-right" size="lg" opacity={0.15} />

      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            O que nossas pacientes dizem
          </h2>
          <p className="text-lg text-muted-foreground">
            Histórias reais de quem transformou a vida com o balão intragástrico e o Programa LevSer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {isLoading && (
            <>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-card rounded-xl p-6 shadow-elegant">
                  <Skeleton className="h-4 w-20 mb-4" />
                  <Skeleton className="h-20 w-full mb-4" />
                  <div className="border-t pt-4">
                    <Skeleton className="h-4 w-32 mb-2" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              ))}
            </>
          )}

          {!isLoading && data?.reviews && (
            <>
              {data.reviews.slice(0, 6).map((review) => (
                <GoogleReviewCard key={review.time} review={review} variant="minimal" />
              ))}
            </>
          )}

          {isError && (
            <div className="col-span-full text-center py-8">
              <p className="text-muted-foreground">
                Não foi possível carregar os depoimentos no momento.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
