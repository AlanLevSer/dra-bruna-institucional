import { useState, useEffect } from 'react';
import { AppLayout } from '@/components/admin/AppLayout';
import { externalSupabase } from '@/lib/external-supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Users, Activity, UserCheck, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardStats {
  sessions: number;
  uniqueVisitors: number;
  leads: number;
  conversionRate: number;
}

interface SessionData {
  date: string;
  count: number;
}

interface TopPage {
  page_url: string;
  views: number;
}

export default function Dashboard() {
  const [period, setPeriod] = useState('7');
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [sessionData, setSessionData] = useState<SessionData[]>([]);
  const [topPages, setTopPages] = useState<TopPage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, [period]);

  const fetchDashboardData = async () => {
    if (!externalSupabase) return;
    
    setLoading(true);
    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - parseInt(period));

    try {
      // Fetch sessions count
      const { count: sessionsCount } = await externalSupabase
        .from('sessões')
        .select('*', { count: 'exact', head: true })
        .gte('iniciado_em', daysAgo.toISOString());

      // Fetch unique visitors
      const { data: visitorsData } = await externalSupabase
        .from('sessões')
        .select('visitante_id')
        .gte('iniciado_em', daysAgo.toISOString());

      const uniqueVisitors = new Set(visitorsData?.map((s) => s.visitante_id) || []).size;

      // Fetch leads
      const { count: leadsCount } = await externalSupabase
        .from('envios_de_formulários')
        .select('*', { count: 'exact', head: true })
        .gte('enviado_em', daysAgo.toISOString());

      setStats({
        sessions: sessionsCount || 0,
        uniqueVisitors,
        leads: leadsCount || 0,
        conversionRate: sessionsCount ? ((leadsCount || 0) / sessionsCount) * 100 : 0,
      });

      // Fetch sessions by day
      const { data: sessionsRaw } = await externalSupabase
        .from('sessões')
        .select('iniciado_em')
        .gte('iniciado_em', daysAgo.toISOString())
        .order('iniciado_em', { ascending: true });

      const groupedByDay = (sessionsRaw || []).reduce((acc, session) => {
        const date = new Date(session.iniciado_em).toLocaleDateString('pt-BR');
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      setSessionData(
        Object.entries(groupedByDay).map(([date, count]) => ({ date, count }))
      );

      // Fetch top pages
      const { data: pageViewsRaw } = await externalSupabase
        .from('visualizações_de_página')
        .select('page_url: "url_da_página"')
        .gte('visualizado_em', daysAgo.toISOString());

      const groupedByPage = (pageViewsRaw || []).reduce((acc, view) => {
        acc[view.page_url] = (acc[view.page_url] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const sortedPages = Object.entries(groupedByPage)
        .map(([page_url, views]) => ({ page_url, views }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 10);

      setTopPages(sortedPages);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="space-y-6">
          <Skeleton className="h-10 w-64" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
          <Skeleton className="h-80" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-foreground">Dashboard</h2>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">7 dias</SelectItem>
              <SelectItem value="30">30 dias</SelectItem>
              <SelectItem value="90">90 dias</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sessões</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.sessions.toLocaleString('pt-BR')}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Visitantes Únicos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.uniqueVisitors.toLocaleString('pt-BR')}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Leads</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.leads.toLocaleString('pt-BR')}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.conversionRate.toFixed(2)}%</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sessões ao longo do tempo</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={sessionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="hsl(var(--primary))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top 10 Páginas</CardTitle>
            <CardDescription>Páginas mais visualizadas no período</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {topPages.map((page, index) => (
                <div key={index} className="flex items-center justify-between border-b border-border pb-2">
                  <span className="text-sm text-foreground truncate flex-1">{page.page_url}</span>
                  <span className="text-sm font-medium text-muted-foreground ml-4">
                    {page.views} views
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
