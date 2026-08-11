# Publicação da LP C1 (/tratamento-glp1-a) — procedimento oficial do projeto

## Fase 1 — Arquivo de referência de deploy encontrado

- **Arquivo vigente:** `docs/deploy-checklist.md` ("Deploy Checklist & Automação Guiada")
- **Complementares:** `docs/deploy-log.md` (registro histórico de releases), `EDGE_FUNCTION_DEPLOY.md` e `docs/supabase-cli-deployment-guide.md` (apenas edge functions — fora de escopo aqui)
- **Fluxo determinado:** alteração local → `npm run deploy:check` → commit → push da branch → PR → preview Vercel → QA em preview → merge na branch de produção → deploy de produção pelo caminho padrão do repositório → smoke test
- **Plataforma:** Vercel (deploy disparado por commit na branch de produção; `vercel --prod` só como exceção documentada)
- **Host de produção:** `https://www.brunadurelli.com.br` (demais hosts redirecionam via `vercel.json`)
- **Obrigatório antes:** lint, type-check, build, validação do `vercel.json`, rotas/nomes ASCII, ausência de caracteres de substituição, working tree auditado, envs `MAKE_LEAD_WEBHOOK_URL` presentes em Production
- **Obrigatório depois:** smoke test em produção (LP P0, console/network, `POST /api/lead`, ausência de chamada direta ao Make) e registro em `docs/deploy-log.md`
- **Git:** produção deve sair de commit rastreável; sem force push, sem reset destrutivo

## Bloqueio identificado (precisa de decisão antes de publicar)

`vercel.json` tem uma lista explícita de rewrites de SPA e **`tratamento-glp1-a` não está nela**. A rota existe em `src/App.tsx:116`, funciona no preview do Lovable (dev server), mas em produção na Vercel o acesso direto a `https://www.brunadurelli.com.br/tratamento-glp1-a` cairia fora do `index.html`. Isso é exatamente o tipo de "correção estritamente necessária para o processo de build/deploy" previsto no seu escopo congelado.

**Correção proposta (única alteração de código desta tarefa):** acrescentar `tratamento-glp1-a` ao grupo de rotas do rewrite existente em `vercel.json`. Nada de copy, layout, tracking, sitemap ou MCP é tocado.

## Limite operacional desta tarefa

Não executo comandos de git (add/commit/push/merge) nem disparo deploy na Vercel a partir daqui. O que consigo fazer é:

1. aplicar a correção do `vercel.json`;
2. rodar `npm run deploy:check` (lint + type-check + build + validações do próprio script) e reportar o resultado;
3. validar a build de produção localmente (rota, hero, mídia, avaliações, FAQ, sticky CTA, aberturas do LeadChat por `cta_source`, `lp_view` único, `noindex,nofollow`, console limpo) via navegador headless;
4. confirmar `public/sitemap.xml` e arquivos de MCP inalterados;
5. entregar o relatório técnico com os 24 itens, marcando como pendentes os que dependem de Git/Vercel.

O commit, o PR, o merge na branch de produção e o deploy Vercel ficam com você (ou eu publico na URL Lovable, que é um caminho paralelo ao documentado — só faço se você pedir).

## Rollback

Conforme `docs/deploy-log.md`, o rollback é por redeploy do último commit estável na Vercel. Último estado estável registrado: **`146b517`** (Plasma V2 + lint fix + deploy-log + .gitattributes). Em falha crítica de smoke test: promover esse deployment anterior na Vercel, sem tentar correções ad-hoc em produção.

## Status final esperado

`PRODUÇÃO PUBLICADA — AGUARDANDO QA E2E KOMMO` após o merge/deploy na Vercel. Enquanto isso, ao fim da minha execução o status será `DEPLOY BLOQUEADO — publicação em produção depende de Git/Vercel fora do sandbox`, com todo o pré-deploy aprovado.
