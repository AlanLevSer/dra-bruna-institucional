# Pré-deploy da LP C1 (/tratamento-glp1-a)

Correção de deploy aprovada. Esta execução vai até o pré-deploy; commit, PR, merge e deploy Vercel ficam para execução externa.

## 1. Correção única de código

`vercel.json` — acrescentar `tratamento-glp1-a` ao grupo de rewrites SPA já existente (nenhuma regra nova, nenhum redirect, header, domínio ou fallback alterado):

```text
...|plasma-de-argonio-a|tratamento-glp1-a|politica-privacidade|...
```

Diff antes/depois será mostrado no relatório.

## 2. Validações (docs/deploy-checklist.md)

- `npm run deploy:check` com resultado separado por etapa: lint, type-check, build, validação do `vercel.json`, rotas/nomes ASCII, caracteres de substituição.
- Qualquer erro interrompe o processo com comando, mensagem completa, arquivo/linha e causa provável. Nenhuma correção fora do escopo.

## 3. Validação da build de produção

- Servir `dist/` com fallback SPA equivalente ao `vercel.json` e testar `GET /tratamento-glp1-a` direto e refresh na rota (sem 404, sem página institucional errada, sem redirect indevido).
- Testar também com a URL parametrizada de aquisição (utm_*, gclid, campaign_id, ad_group_id, ad_id, intent_cluster).

## 4. QA local sobre a build

Desktop e mobile 390px via navegador headless: hero, para quem é, método, pilares, GLP-1/GIP, avaliação, Dra. Bruna, mídia (6 logos, zero `<a>`), estrutura, espaço, reviews (nota/total, sem navegação externa, falha de API não quebra), FAQ, CTA final, sticky CTA, contraste dos CTAs, ausência de overflow, console limpo. LeadChat abrindo por `hero_primary`, `journey_section`, `evaluation_section`, `final_cta`, `sticky_mobile` com `cta_source` correto. `lp_view` único, page context preservado, `noindex,nofollow` presente, `sitemap.xml` e arquivos MCP inalterados.

## 5. Auditoria e ambiente

- Lista de todos os arquivos modificados em relação ao versionado; esperado apenas `vercel.json` além dos arquivos da LP já no release. Qualquer arquivo inesperado é listado e explicado.
- Verificação de existência de `MAKE_LEAD_WEBHOOK_URL` em produção (apenas PRESENTE/AUSENTE, sem valor). Observação: essa variável é gerida na Vercel, fora deste sandbox — se não for legível daqui, será reportada como "não verificável aqui, confirmar no painel Vercel".

## 6. Entrega

Instruções exatas de branch, arquivos do commit, mensagem, push, PR, QA no Preview Vercel, condição de merge, comportamento pós-merge, smoke test de produção e atualização de `docs/deploy-log.md` (somente após a publicação real). Rollback de referência: `146b517`, a reconfirmar no Vercel antes da publicação. `docs/deploy-log.md` não será alterado agora.

Status final desta execução: `PRÉ-DEPLOY APROVADO — AGUARDANDO GIT/PR/VERCEL` ou `PRÉ-DEPLOY BLOQUEADO — [motivo]`.
