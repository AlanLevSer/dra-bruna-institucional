import { useGoogleReviews } from "@/hooks/useGoogleReviews";

export const BalaoLocTrustStrip = () => {
  const { data } = useGoogleReviews();

  const items = [
    {
      label: "Dra. Bruna Durelli",
      sub: "Direção médica LevSer",
    },
    {
      label: "Jardim Paulista",
      sub: "São Paulo",
    },
    {
      label:
        data?.rating && data.rating > 0
          ? `${data.rating.toFixed(1).replace(".", ",")} no Google`
          : "Avaliações reais",
      sub: "Pacientes da LevSer",
    },
    {
      label: "Método LevSer",
      sub: "Além do procedimento",
    },
  ];

  return (
    <div className="bg-muted/50 border-b border-border/60">
      <div className="mx-auto w-full max-w-3xl px-5 py-5">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
          {items.map(({ label, sub }) => (
            <li key={label}>
              <p className="text-sm font-medium text-foreground leading-snug">{label}</p>
              <p className="text-xs text-muted-foreground leading-snug mt-0.5">{sub}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
