import { useState, useEffect } from 'react';
import { AppLayout } from '@/components/admin/AppLayout';
import { externalSupabase } from '@/lib/external-supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/hooks/use-toast';
import { AppRole } from '@/types/admin';

interface UserWithRole {
  id: string;
  email: string | null;
  nome_completo: string | null;
  role: AppRole | null;
  criado_em: string;
}

interface Site {
  id: string;
  dominio: string;
  nome: string;
  criado_em: string;
}

export default function Admin() {
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    if (!externalSupabase) return;

    setLoading(true);
    try {
      // Fetch users with roles (manual join)
      const { data: profiles } = await externalSupabase
        .from('perfis')
        .select('*')
        .order('criado_em', { ascending: false });

      const { data: roles } = await externalSupabase
        .from('funções_de_usuário')
        .select('*');

      const rolesMap = new Map(roles?.map((r) => [r.user_id, r.role]) || []);

      const usersWithRoles: UserWithRole[] = (profiles || []).map((p) => ({
        id: p.id,
        email: p.email,
        nome_completo: p.nome_completo,
        role: rolesMap.get(p.id) as AppRole || null,
        criado_em: p.criado_em,
      }));

      setUsers(usersWithRoles);

      // Fetch sites
      const { data: sitesData } = await externalSupabase
        .from('sites')
        .select('*')
        .order('criado_em', { ascending: false });

      setSites(sitesData || []);
    } catch (error) {
      console.error('Error fetching admin data:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao carregar dados de administração',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: AppRole) => {
    if (!externalSupabase) return;

    try {
      const { error } = await externalSupabase
        .from('funções_de_usuário')
        .update({ role: newRole })
        .eq('user_id', userId);

      if (error) throw error;

      toast({
        title: 'Sucesso',
        description: 'Role atualizada com sucesso',
      });

      fetchData();
    } catch (error) {
      console.error('Error updating role:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao atualizar role',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="space-y-6">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-96" />
          <Skeleton className="h-64" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Administração</h2>
          <p className="text-muted-foreground">Gerenciamento de usuários e configurações</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Usuários & Roles</CardTitle>
            <CardDescription>Gerenciar permissões de acesso</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Email</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Nome</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Role</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Criado em</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-border hover:bg-muted/50">
                      <td className="py-3 px-4 text-sm">{user.email}</td>
                      <td className="py-3 px-4 text-sm">{user.nome_completo || '-'}</td>
                      <td className="py-3 px-4">
                        <Select
                          value={user.role || 'readonly'}
                          onValueChange={(value) => updateUserRole(user.id, value as AppRole)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="analyst">Analyst</SelectItem>
                            <SelectItem value="readonly">Readonly</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {new Date(user.criado_em).toLocaleDateString('pt-BR')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sites Cadastrados</CardTitle>
            <CardDescription>Sites sendo rastreados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {sites.map((site) => (
                <div
                  key={site.id}
                  className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50"
                >
                  <div>
                    <p className="font-medium text-foreground">{site.nome}</p>
                    <p className="text-sm text-muted-foreground">{site.dominio}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {new Date(site.criado_em).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              ))}

              {sites.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  Nenhum site cadastrado
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
