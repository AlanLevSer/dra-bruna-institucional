import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { externalSupabase } from '@/lib/external-supabase';
import { AppRole, Profile } from '@/types/admin';
import { toast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  role: AppRole | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<AppRole | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async (userId: string) => {
    try {
      // Buscar role
      const { data: userRole, error: roleError } = await externalSupabase
        .from('funções_de_usuário')
        .select('role')
        .eq('user_id', userId)
        .single();

      if (roleError) {
        console.error('Error fetching role:', roleError);
        setRole(null);
      } else {
        setRole(userRole?.role as AppRole);
      }

      // Buscar profile
      const { data: userProfile, error: profileError } = await externalSupabase
        .from('perfis')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileError) {
        console.error('Error fetching profile:', profileError);
        setProfile(null);
      } else {
        setProfile(userProfile);
      }
    } catch (error) {
      console.error('Error in fetchUserData:', error);
    }
  };

  useEffect(() => {
    if (!externalSupabase) {
      setLoading(false);
      return;
    }

    // Setup auth state listener
    const { data: { subscription } } = externalSupabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        if (currentSession?.user) {
          await fetchUserData(currentSession.user.id);
        } else {
          setRole(null);
          setProfile(null);
        }
        setLoading(false);
      }
    );

    // Check for existing session
    externalSupabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);

      if (currentSession?.user) {
        fetchUserData(currentSession.user.id);
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    if (!externalSupabase) {
      return { error: new Error('Supabase not configured') };
    }

    try {
      const { error } = await externalSupabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: 'Erro ao fazer login',
          description: error.message,
          variant: 'destructive',
        });
        return { error };
      }

      return { error: null };
    } catch (error) {
      const err = error as Error;
      toast({
        title: 'Erro ao fazer login',
        description: err.message,
        variant: 'destructive',
      });
      return { error: err };
    }
  };

  const signOut = async () => {
    if (!externalSupabase) return;

    try {
      await externalSupabase.auth.signOut();
      setUser(null);
      setSession(null);
      setRole(null);
      setProfile(null);
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: 'Erro ao sair',
        description: 'Ocorreu um erro ao fazer logout',
        variant: 'destructive',
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, role, profile, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
