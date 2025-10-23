import { Check, X } from "lucide-react";

const TreatmentComparisonSection = () => {
  const treatments = [
    {
      name: "Balão Intragástrico",
      invasiveness: "Baixa (endoscopia)",
      duration: "6-12 meses",
      recovery: "1-3 dias",
      results: "15-30% do peso",
      reversible: true,
      highlight: true,
    },
    {
      name: "Cirurgia Bariátrica",
      invasiveness: "Alta (cirurgia)",
      duration: "Permanente",
      recovery: "2-4 semanas",
      results: "30-50% do peso",
      reversible: false,
      highlight: false,
    },
    {
      name: "Dietas Tradicionais",
      invasiveness: "Nenhuma",
      duration: "Contínua",
      recovery: "Não se aplica",
      results: "5-15% do peso",
      reversible: true,
      highlight: false,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Compare os Tratamentos
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Entenda as diferenças entre o Balão Intragástrico e outras abordagens 
            para escolher a melhor opção para você.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-soft overflow-hidden">
            <thead>
              <tr className="bg-wellness-cream">
                <th className="p-4 text-left font-semibold text-foreground">Critério</th>
                {treatments.map((treatment, index) => (
                  <th 
                    key={index}
                    className={`p-4 text-center font-semibold ${
                      treatment.highlight 
                        ? 'bg-wellness-warm text-white' 
                        : 'text-foreground'
                    }`}
                  >
                    {treatment.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-wellness-soft">
                <td className="p-4 font-medium text-foreground">Invasividade</td>
                {treatments.map((treatment, index) => (
                  <td key={index} className="p-4 text-center text-muted-foreground">
                    {treatment.invasiveness}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-wellness-soft bg-wellness-cream/30">
                <td className="p-4 font-medium text-foreground">Duração</td>
                {treatments.map((treatment, index) => (
                  <td key={index} className="p-4 text-center text-muted-foreground">
                    {treatment.duration}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-wellness-soft">
                <td className="p-4 font-medium text-foreground">Recuperação</td>
                {treatments.map((treatment, index) => (
                  <td key={index} className="p-4 text-center text-muted-foreground">
                    {treatment.recovery}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-wellness-soft bg-wellness-cream/30">
                <td className="p-4 font-medium text-foreground">Perda de Peso</td>
                {treatments.map((treatment, index) => (
                  <td key={index} className="p-4 text-center text-muted-foreground">
                    {treatment.results}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-medium text-foreground">Reversível</td>
                {treatments.map((treatment, index) => (
                  <td key={index} className="p-4 text-center">
                    {treatment.reversible ? (
                      <Check className="w-6 h-6 text-green-500 mx-auto" />
                    ) : (
                      <X className="w-6 h-6 text-red-500 mx-auto" />
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="text-center mt-12">
          <div className="bg-wellness-warm/5 p-6 rounded-xl border border-wellness-warm/20 max-w-3xl mx-auto">
            <p className="text-lg text-foreground">
              <strong>O Balão Intragástrico</strong> oferece o equilíbrio ideal entre eficácia e segurança, 
              sendo menos invasivo que a cirurgia e mais efetivo que dietas tradicionais.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TreatmentComparisonSection;
