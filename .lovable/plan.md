# Destravar o deploy:check da LP C1

Escopo mínimo: um ignore de ESLint restrito ao MCP gerado e a revalidação completa do pré-deploy. Nenhuma alteração de produto, copy, layout ou tracking.

## 1. Alteração única de código

`eslint.config.js` — acrescentar ao array `ignores` existente, com comentário:

```text
// Generated Deno MCP function; excluded from frontend ESLint pipeline.
{ ignores: ["dist", "supabase/functions/mcp/**"] }
```

Preferência por `supabase/functions/mcp/**` (cobre o `index.ts` e qualquer arquivo gerado irmão). Nada de `supabase/**` ou `supabase/functions/**`; as demais Edge Functions continuam sob lint. `supabase/functions/mcp/index.ts` não é tocado (sem trocar `var`, sem formatar, sem refatorar).

Warning `react-refresh/only-export-components` em `Glp1Avaliacoes.tsx`: não será corrigido, a menos que o `deploy:check` volte a falhar por causa dele.

## 2. Revalidação

`npm run deploy:check` com o resultado de cada etapa reportado integralmente: lint, type-check, build, validação do `vercel.json`, rotas/nomes ASCII e caracteres de substituição.

## 3. Reconfirmações

- `vercel.json` contém apenas a inclusão de `tratamento-glp1-a` no grupo de rewrites SPA.
- `eslint.config.js` contém apenas o ignore específico do MCP.
- Nenhuma outra Edge Function excluída do lint (verificação explícita do padrão).
- MCP inalterado (comparação com o versionado).
- Build gera o chunk/rota `TratamentoGlp1`.
- Servindo `dist/` com fallback SPA: acesso direto `/tratamento-glp1-a` = 200 e refresh = 200.
- `noindex,nofollow` presente na rota; `sitemap.xml` inalterado.

## 4. Diff final

Diff completo de `vercel.json` e `eslint.config.js` e listagem do working tree. Qualquer outro arquivo modificado interrompe o processo e é reportado sem correção.

## 5. Status

`PRÉ-DEPLOY APROVADO — AGUARDANDO GIT/PR/VERCEL` se o `deploy:check` passar; caso contrário `PRÉ-DEPLOY BLOQUEADO — [erro exato]`. Publicação segue apenas por Git/PR/Vercel, sem caminho paralelo do Lovable.
