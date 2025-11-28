# Guia Completo: Deploy via CLI no Supabase Externo (Opção A)

## Pré-requisitos

- Node.js 18+ instalado
- Conta Supabase com projeto `levser-analytics-core` (myiczzzzmzodljgmhogmt)
- Acesso ao terminal/linha de comando
- Git configurado no projeto

## 1. Instalação do Supabase CLI

### macOS/Linux
```bash
brew install supabase/tap/supabase
```

### Windows (via Scoop)
```bash
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase
```

### NPM (alternativa universal)
```bash
npm install -g supabase
```

### Verificar instalação
```bash
supabase --version
```

## 2. Login no Supabase CLI

```bash
supabase login
```

Isso abrirá o navegador para autenticação. Após autenticar, você verá uma mensagem de sucesso no terminal.

## 3. Linkar Projeto Local ao Supabase Externo

Na raiz do projeto (onde está o `package.json`):

```bash
supabase link --project-ref myiczzzzmzodljgmhogmt
```

**O que esse comando faz:**
- Conecta seu repositório local ao projeto `levser-analytics-core`
- Cria arquivo `.supabase/` local (não commitar no git)
- Permite deploy de funções e migrações via CLI

**Confirmação esperada:**
```
Linked to project: levser-analytics-core
```

## 4. Configurar Secrets no Supabase Externo

As Edge Functions precisam de secrets para funcionar. Configure via CLI:

```bash
# Secret para conectar ao próprio Supabase (URL do projeto externo)
supabase secrets set EXTERNAL_SUPABASE_URL=https://myiczzzzmzodljgmhogmt.supabase.co

# Secret para service role key (pegar em Settings → API)
supabase secrets set EXTERNAL_SUPABASE_SERVICE_KEY=sua_service_role_key_aqui
```

**⚠️ IMPORTANTE:** A `EXTERNAL_SUPABASE_SERVICE_KEY` você encontra em:
- Painel Supabase → Settings → API → Project API Keys → `service_role` (secret)

**Listar secrets configurados:**
```bash
supabase secrets list
```

## 5. Deploy da Edge Function `track`

Confirme que existe o arquivo `supabase/functions/track/index.ts` no repositório.

### Deploy com verificação JWT desabilitada (função pública)
```bash
supabase functions deploy track --no-verify-jwt
```

**O que esse comando faz:**
- Faz upload do código de `supabase/functions/track/index.ts`
- Configura a função como pública (sem JWT)
- Disponibiliza a função em `https://myiczzzzmzodljgmhogmt.supabase.co/functions/v1/track`

**Confirmação esperada:**
```
Deploying function track...
Function track deployed successfully!
```

### Deploy sem desabilitar JWT (caso precise)
```bash
supabase functions deploy track
```

## 6. Atualizar `supabase/config.toml` (opcional mas recomendado)

Edite o arquivo `supabase/config.toml` para refletir o projeto externo:

```toml
project_id = "myiczzzzmzodljgmhogmt"

[functions.get-google-reviews]
verify_jwt = false

[functions.track]
verify_jwt = false
```

**⚠️ ATENÇÃO:** Commite essa mudança no git para manter sincronia entre repositório e deploy.

## 7. Testar a Função Deployada

### Teste via cURL
```bash
curl -X POST https://myiczzzzmzodljgmhogmt.supabase.co/functions/v1/track \
  -H "Content-Type: application/json" \
  -H "apikey: sua_anon_key_aqui" \
  -d '{
    "event_type": "page_view",
    "visitor_id": "test-visitor-123",
    "session_id": "test-session-456",
    "site_slug": "brunadurelli",
    "page_url": "https://brunadurelli.com.br/test",
    "page_title": "Test Page",
    "referrer": "",
    "device_type": "desktop",
    "user_agent": "curl-test"
  }'
```

**Resposta esperada:**
```json
{"success": true}
```

### Teste no navegador
1. Recarregue a aplicação (`https://brunadurelli.com.br`)
2. Abra DevTools → Console
3. Deve ver: `[Tracking] Page view tracked successfully`
4. Abra DevTools → Network → Filtre por "track"
5. Deve ver request 200 OK para `functions/v1/track`

## 8. Verificar Logs da Função

```bash
supabase functions logs track
```

Ou no painel web: Supabase → Edge Functions → track → Logs

## 9. Troubleshooting Comum

### Erro: "Function not found"
**Causa:** Deploy não completou ou nome da função errado.
**Solução:**
```bash
supabase functions list
supabase functions deploy track --no-verify-jwt
```

### Erro: "Missing environment variables"
**Causa:** Secrets não configurados.
**Solução:**
```bash
supabase secrets list  # verificar quais estão faltando
supabase secrets set EXTERNAL_SUPABASE_URL=https://myiczzzzmzodljgmhogmt.supabase.co
supabase secrets set EXTERNAL_SUPABASE_SERVICE_KEY=sua_key
```

### Erro: "CORS error" no navegador
**Causa:** Headers CORS não configurados na função.
**Solução:** Confirme que `supabase/functions/track/index.ts` tem:
```typescript
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

if (req.method === 'OPTIONS') {
  return new Response(null, { headers: corsHeaders });
}
```

### Erro: "Invalid JWT" (mesmo com --no-verify-jwt)
**Causa:** Config.toml não sincronizado ou deploy sem flag.
**Solução:**
```bash
# Editar supabase/config.toml:
[functions.track]
verify_jwt = false

# Re-deploy
supabase functions deploy track --no-verify-jwt
```

### Erro: "Site not found" nos logs
**Causa:** Tabela `sites` não tem entrada para `brunadurelli`.
**Solução:** Inserir via SQL Editor no Supabase:
```sql
INSERT INTO public.sites (slug, name, domain)
VALUES ('brunadurelli', 'Site Dra. Bruna', 'brunadurelli.com.br')
ON CONFLICT (slug) DO NOTHING;
```

## 10. CI/CD Automático (Opcional - GitHub Actions)

Crie `.github/workflows/deploy-functions.yml`:

```yaml
name: Deploy Supabase Edge Functions

on:
  push:
    branches: [main]
    paths:
      - 'supabase/functions/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Supabase CLI
        uses: supabase/setup-cli@v1
        
      - name: Deploy Functions
        run: |
          supabase link --project-ref ${{ secrets.SUPABASE_PROJECT_REF }}
          supabase functions deploy track --no-verify-jwt
        env:
          SUPABASE_ACCESS_TOKEN: ${{ secrets.SUPABASE_ACCESS_TOKEN }}
```

**Secrets necessários no GitHub:**
- `SUPABASE_PROJECT_REF`: `myiczzzzmzodljgmhogmt`
- `SUPABASE_ACCESS_TOKEN`: Gerar em Supabase → Account → Access Tokens

## 11. Verificação Final

✅ **Checklist de sucesso:**
- [ ] `supabase link` conectado ao projeto correto
- [ ] `supabase secrets list` mostra `EXTERNAL_SUPABASE_URL` e `EXTERNAL_SUPABASE_SERVICE_KEY`
- [ ] `supabase functions deploy track --no-verify-jwt` retorna sucesso
- [ ] cURL test retorna `{"success": true}`
- [ ] App no navegador dispara tracking sem erros no console
- [ ] `supabase functions logs track` mostra eventos sendo processados
- [ ] Tabelas `visitors`, `sessions`, `page_views` recebem dados no Supabase

## 12. Comandos Úteis de Referência

```bash
# Ver todas as funções deployadas
supabase functions list

# Ver logs em tempo real
supabase functions logs track --follow

# Deletar uma função
supabase functions delete track

# Re-deploy após mudanças no código
supabase functions deploy track --no-verify-jwt

# Ver configuração do link
cat .supabase/config.toml

# Deslinkar projeto (se necessário resetar)
supabase unlink
```

## 13. Próximos Passos

Após deploy bem-sucedido da função `track`:

1. **Integrar outras páginas:** Adicionar `initTracking()` em todas as landing pages
2. **Deploy função `get-google-reviews`:** Mesmo processo com `supabase functions deploy get-google-reviews`
3. **Monitorar performance:** Usar logs e tabelas do Supabase para validar tracking
4. **Configurar alertas:** Supabase → Project Settings → Webhooks para notificações de erro

---

## Suporte

- **Documentação oficial:** https://supabase.com/docs/guides/functions
- **CLI Reference:** https://supabase.com/docs/reference/cli
- **Discord Supabase:** https://discord.supabase.com

---

**Última atualização:** 2025-01-28  
**Projeto:** Plataforma de Dados Dra. Bruna  
**Supabase Externo:** levser-analytics-core (myiczzzzmzodljgmhogmt)
