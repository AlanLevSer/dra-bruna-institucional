import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { GrafismoDecor } from "@/components/GrafismoDecor";
import { useGoogleReviews } from "@/hooks/useGoogleReviews";
import { GoogleReviewCard } from "@/components/GoogleReviewCard";

export const Depoimentos = () => {
  const { data, isLoading, isError } = useGoogleReviews();

  return (
    <section id="depoimentos" className="relative py-16 xl:py-20 bg-muted/30 overflow-hidden">
      <GrafismoDecor variant="background" position="top-right" size="lg" opacity={0.18} rotate={-20} color="gray" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-12 xl:mb-16 animate-fade-in">
          <div className="inline-block px-3 py-1 bg-primary/10 rounded-full mb-3">
            <span className="text-[11px] font-medium text-primary">Histórias Reais</span>
          </div>
          
          <h2 className="text-xl md:text-2xl xl:text-3xl font-serif font-bold text-foreground mb-4">
            O que dizem nossos pacientes
          </h2>
          
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Transformações que vão além dos números na balança. 
            Vidas que foram impactadas de forma positiva e duradoura.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 xl:gap-12 max-w-6xl mx-auto">
          {isLoading && (
            <>
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="animate-fade-in">
                  <CardContent className="pt-6 px-6 pb-6">
                    <Skeleton className="h-4 w-20 mb-3" />
                    <Skeleton className="h-20 w-full mb-4" />
                    <div className="pt-2.5 border-t border-border/50">
                      <Skeleton className="h-4 w-32 mb-2" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          )}

          {!isLoading && data?.reviews && (
            <>
              {data.reviews.slice(0, 6).map((review, index) => (
                <div
                  key={review.time}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <GoogleReviewCard review={review} variant="default" />
                </div>
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
