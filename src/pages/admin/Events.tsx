import { useState, useEffect } from 'react';
import { AppLayout } from '@/components/admin/AppLayout';
import { externalSupabase } from '@/lib/external-supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Event {
  id: string;
  ocorreu_em: string;
  sessão_id: string;
  nome_do_evento: string;
  propriedades_do_evento: any;
  url_da_página: string;
}

const ITEMS_PER_PAGE = 50;

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchEvents();
  }, [page, search]);

  const fetchEvents = async () => {
    if (!externalSupabase) return;

    setLoading(true);
    try {
      let query = externalSupabase
        .from('eventos')
        .select('*', { count: 'exact' })
        .order('ocorreu_em', { ascending: false })
        .range(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE - 1);

      if (search) {
        query = query.ilike('nome_do_evento', `%${search}%`);
      }

      const { data, count, error } = await query;

      if (error) throw error;

      setEvents(data || []);
      setTotal(count || 0);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPage(0);
    fetchEvents();
  };

  if (loading && events.length === 0) {
    return (
      <AppLayout>
        <div className="space-y-4">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-80" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Eventos</h2>
          <p className="text-muted-foreground">Rastreamento de eventos do usuário</p>
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="Buscar por nome do evento..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="max-w-sm"
          />
          <Button onClick={handleSearch}>Buscar</Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Eventos Recentes</CardTitle>
            <CardDescription>
              Total: {total.toLocaleString('pt-BR')} eventos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Data/Hora</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Evento</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Página</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Propriedades</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event) => (
                    <tr key={event.id} className="border-b border-border hover:bg-muted/50">
                      <td className="py-3 px-4 text-sm">
                        {new Date(event.ocorreu_em).toLocaleString('pt-BR')}
                      </td>
                      <td className="py-3 px-4 text-sm font-medium">{event.nome_do_evento}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground truncate max-w-xs">
                        {event.url_da_página}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <pre className="text-xs bg-muted p-2 rounded max-w-md overflow-auto">
                          {JSON.stringify(event.propriedades_do_evento, null, 2)}
                        </pre>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Anterior
              </Button>
              <span className="text-sm text-muted-foreground">
                Página {page + 1} de {Math.ceil(total / ITEMS_PER_PAGE)}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => p + 1)}
                disabled={(page + 1) * ITEMS_PER_PAGE >= total}
              >
                Próxima
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
