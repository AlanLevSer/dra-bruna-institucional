import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { age: 30, semPrograma: 100, comPrograma: 100 },
  { age: 40, semPrograma: 90, comPrograma: 95 },
  { age: 50, semPrograma: 75, comPrograma: 90 },
  { age: 60, semPrograma: 55, comPrograma: 85 },
  { age: 70, semPrograma: 30, comPrograma: 75 },
  { age: 80, semPrograma: 10, comPrograma: 60 },
];

export const LongevityComparison = () => {
  return (
    <section className="py-16 xl:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl xl:text-4xl font-serif font-bold mb-4">
            Qualidade de Vida ao Longo dos Anos
          </h2>
          <p className="text-lg text-muted-foreground">
            O impacto da Medicina Regenerativa na sua longevidade saudável
          </p>
        </div>

        <div className="bg-card rounded-2xl p-8 shadow-elegant border border-primary/20">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="age" 
                label={{ value: 'Idade', position: 'insideBottom', offset: -5 }}
                stroke="hsl(var(--muted-foreground))"
              />
              <YAxis 
                label={{ value: 'Qualidade de Vida (%)', angle: -90, position: 'insideLeft' }}
                stroke="hsl(var(--muted-foreground))"
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="semPrograma" 
                stroke="#94a3b8" 
                strokeWidth={2}
                name="Sem Programa Regenerativo"
                strokeDasharray="5 5"
              />
              <Line 
                type="monotone" 
                dataKey="comPrograma" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                name="Com Programa Regenerativo"
              />
            </LineChart>
          </ResponsiveContainer>

          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div className="bg-muted/50 rounded-lg p-6">
              <h4 className="font-semibold text-foreground mb-2">Sem Programa</h4>
              <p className="text-sm text-muted-foreground">
                Declínio acelerado de energia, massa muscular e autonomia após os 50 anos
              </p>
            </div>
            <div className="bg-primary/10 rounded-lg p-6 border border-primary/20">
              <h4 className="font-semibold text-foreground mb-2">Com Programa Regenerativo</h4>
              <p className="text-sm text-muted-foreground">
                Manutenção de vitalidade, função cognitiva e autonomia até idades avançadas
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
