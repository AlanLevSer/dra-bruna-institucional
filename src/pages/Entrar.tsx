import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function safeNext(raw: string | null): string {
  if (!raw) return "/";
  if (!raw.startsWith("/") || raw.startsWith("//")) return "/";
  return raw;
}

export default function Entrar() {
  const [params] = useSearchParams();
  const next = safeNext(params.get("next"));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) window.location.href = next;
    });
  }, [next]);

  const redirectTo = `${window.location.origin}${next}`;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setMessage(null);

    if (mode === "signin") {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      setBusy(false);
      if (signInError) {
        setError(signInError.message);
        return;
      }
      window.location.href = next;
      return;
    }

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: redirectTo },
    });
    setBusy(false);
    if (signUpError) {
      setError(signUpError.message);
      return;
    }
    setMessage("Conta criada. Verifique seu e-mail para confirmar e depois entre.");
    setMode("signin");
  }

  async function handleGoogle() {
    setBusy(true);
    setError(null);
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo },
    });
    if (oauthError) {
      setBusy(false);
      setError(oauthError.message);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-6 py-16">
      <div className="w-full max-w-md space-y-6 rounded-3xl border border-border/60 bg-card p-8 shadow-lg">
        <div className="space-y-2">
          <h1 className="font-serif text-2xl text-foreground">
            {mode === "signin" ? "Entrar" : "Criar conta"}
          </h1>
          <p className="text-sm text-muted-foreground">
            Acesso usado para autorizar integrações de agentes de IA com este site.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            type="email"
            placeholder="seuemail@exemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            autoComplete={mode === "signin" ? "current-password" : "new-password"}
          />
          <Button type="submit" className="w-full" disabled={busy}>
            {mode === "signin" ? "Entrar" : "Criar conta"}
          </Button>
        </form>

        <Button variant="outline" className="w-full" onClick={handleGoogle} disabled={busy}>
          Continuar com Google
        </Button>

        {error && <p className="text-sm text-destructive">{error}</p>}
        {message && <p className="text-sm text-muted-foreground">{message}</p>}

        <button
          type="button"
          className="text-xs text-muted-foreground underline"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
        >
          {mode === "signin" ? "Não tenho conta — criar agora" : "Já tenho conta — entrar"}
        </button>
      </div>
    </main>
  );
}
