import { useState, useEffect } from 'react';
import { AppLayout } from '@/components/admin/AppLayout';
import { externalSupabase } from '@/lib/external-supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle } from 'lucide-react';

interface FormSubmission {
  id: string;
  enviado_em: string;
  tipo_de_formulário: string;
  dados_do_formulário: any;
  url_da_página: string;
  convertido: boolean;
}

export default function Leads() {
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    if (!externalSupabase) return;

    setLoading(true);
    try {
      const { data, error } = await externalSupabase
        .from('envios_de_formulários')
        .select('*')
        .order('enviado_em', { ascending: false })
        .limit(100);

      if (error) throw error;

      setSubmissions(data || []);
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="space-y-4">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-96" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Leads</h2>
          <p className="text-muted-foreground">Envios de formulários capturados</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Formulários Submetidos</CardTitle>
            <CardDescription>
              Total: {submissions.length} envios
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {submissions.map((submission) => (
                <div
                  key={submission.id}
                  className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-foreground">
                          {submission.tipo_de_formulário}
                        </h3>
                        {submission.convertido ? (
                          <Badge variant="default" className="gap-1">
                            <CheckCircle className="h-3 w-3" />
                            Convertido
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="gap-1">
                            <XCircle className="h-3 w-3" />
                            Não convertido
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {new Date(submission.enviado_em).toLocaleString('pt-BR')}
                      </p>
                    </div>
                  </div>

                  <div className="bg-muted/50 rounded p-3 mb-2">
                    <pre className="text-xs overflow-x-auto">
                      {JSON.stringify(submission.dados_do_formulário, null, 2)}
                    </pre>
                  </div>

                  <p className="text-xs text-muted-foreground truncate">
                    Origem: {submission.url_da_página}
                  </p>
                </div>
              ))}

              {submissions.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  Nenhum envio de formulário encontrado
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
