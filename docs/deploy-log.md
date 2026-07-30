# Deploy Log

Registro de exceções, incidentes, rollbacks e hotfixes em produção.
Use este arquivo para registrar apenas desvios do fluxo normal de deploy.

---

## 2026-07-30 — deploy/plasma-v2-instrumentation (exceção: QA de preview pendente)

**Commit implantado:** `4e181596fbdcdc385ddc61200863131197b73c89`
**Mensagem:** `feat(plasma): instrumentar origem do CTA, início do formulário e programa`
**Data/hora BRT:** 2026-07-29 22:27
**Ambiente:** produção (origin/main via squash do PR feat/plasma-v2-instrumentation)

### Escopo da mudança

4 arquivos alterados (84 add / 19 del):

- `src/components/LeadChatWidget.tsx` — PATCH_A: `program_selected` via `lc_program_selected` em sessionStorage; PATCH_C: evento `form_start` na primeira digitação no campo nome
- `src/components/LeadChatWidgetRedirect.tsx` — ajuste de tipo TS: `window.LeadChat.open()` aceita `{ cta_source?, program_selected? }`
- `src/components/vendas/ProgramasTratamentoPlasma.tsx` — PATCH_E: `cta_source` via `openLeadChat("plasma_programas", ...)`, slugs canônicos (`plasma_sessao_unica`, `plasma_intermediario`, `plasma_pacote_completo`) gravados em sessionStorage
- `src/lib/leadChat.ts` — `openLeadChat` repassa `cta_source` e `program_selected` para `window.LeadChat.open()`

### Exceção registrada

**Tipo:** merge para `main` ocorreu sem QA visual completo do preview Vercel.
**Motivo:** branch foi merged diretamente; validação visual de preview ficou pendente.
**Impacto:** não detectado risco funcional na revisão técnica post-merge (ver validações abaixo).

### Validações executadas post-merge (2026-07-30)

#### Estáticas e automatizadas

| Verificação | Resultado |
|---|---|
| `deploy:check` (lint + type-check + build + vercel.json) | ✅ passou após correção de lint pré-existente |
| Lint `api/lead.ts` e `api/lead-event.ts` (`no-explicit-any`) | ⚠️ falha pré-existente de `2f32e7e` — corrigida via PR #5, SHA `685e2ce` |
| Bundle client: ausência de `hook.eu2.make.com` / `MAKE_LEAD_WEBHOOK_URL` | ✅ nenhuma exposição |
| Arquitetura: browser → `/api/lead` (proxy same-origin) → Make.com | ✅ confirmado via `leadDelivery.ts` |
| `cta_source`, `program_selected`, `protocol_id` no payload do lead | ✅ confirmado (código) |
| `ProgramasTratamentoPlasma`: mapeamento título → slug canônico → sessionStorage | ✅ correto (código) |
| `LeadChatWidget`: guard `formStartFiredRef.current` para `form_start` único | ✅ correto (PATCH_C, linha 562) |
| `LeadChatWidget`: leitura de sessionStorage `lc_program_selected` | ✅ correto (código) |
| Rollback `.gitattributes` pré-existente: criada política LF via PR #7, SHA `146b517` | ✅ merged |

#### Runtime — dados reais pós-deploy (GA4 + Clarity, 2026-07-30)

| Verificação | Resultado |
|---|---|
| Deployment `4e18159` em produção | ✅ confirmado — 2026-07-30T01:27:50Z UTC |
| Produção atual | ✅ `146b517` (inclui Plasma V2 + lint fix + deploy-log + .gitattributes) |
| URL canônica da campanha 24057499154 | ✅ `/plasma-de-argonio-a` |
| Título da LP Plasma em produção | ✅ "Plasma de Argônio - Tratamento de Reganho Pós-Bariátrica \| Dra. Bruna Durelli" |
| LCP Plasma pós-deploy | ✅ 1.3s–3.2s (sessões Clarity 11:35 e 21:36 de 2026-07-30) |
| `cta_clicked` ativo | ✅ 9 eventos (29–30/07); 1 pós-deploy em 2026-07-30 |
| `chat_open` ativo | ✅ 4 eventos registrados (2026-07-29 pré-deploy) |
| `form_submit` / `lead_converted` / `whatsapp_redirect` | ✅ 1 lead completo registrado em 2026-07-29 |
| `form_start` pós-deploy | ⏳ AGUARDANDO — sem interação suficiente pós-deploy (0 chat_open em 2026-07-30); código validado |
| `programa_clicked` pós-deploy | ⏳ AGUARDANDO — sem card clicado pós-deploy; código validado |
| Regressão LP Balão | ✅ sem evidência — `/balao-intragastrico-preco-a` continua gerando eventos normais |
| Sessão Clarity anômala (02:01 BRT) — título homepage na LP Plasma | ⚠️ provavelmente hydration delay pré-existente da SPA; score 0, LCP 6.2s; investigar se recorrente |
| Clarity: rage clicks / dead clicks | ✅ nenhum detectado nas sessões pós-deploy |
| Chamada direta a `hook.eu2.make.com` | ✅ ausente (bundle scan + arquitetura confirmada) |

#### Bloqueados — requerem browser interativo ou acesso externo

| Verificação | Motivo do bloqueio |
|---|---|
| Testes T01–T15 (clique, modal, form, scroll) | Sem MCP de browser interativo (Playwright/Puppeteer ausente) |
| Screenshots por viewport (360px, 390px, 1366px, 1440px) | Idem |
| Interceptação de `/api/lead` em runtime | Idem |
| Validação WhatsApp com `protocol_id` real | Idem |
| Lead sintético controlado no Kommo | Sem procedimento de QA sintético documentado no projeto |
| Make.com: schema recebido / cta_source / program_selected | Sem acesso MCP ao Make |
| Kommo: confirmação de campos customizados | Sem acesso MCP ao Kommo |

### Ações resultantes

- PR #5 `685e2ce` — lint fix merged ✅
- PR #6 `b06a763` — deploy-log init merged ✅
- PR #7 `146b517` — .gitattributes LF policy merged ✅
- Janela de observação aberta: `form_start` e `programa_clicked` devem aparecer em GA4 nas próximas sessões com interação real
- Sessão Clarity anômala (02:01) deve ser monitorada — se recorrente, investigar hydration do título da SPA na rota `/plasma-de-argonio-a`
- Smoke test visual manual: a ser executado pelo operador em aba anônima na URL `/plasma-de-argonio-a`

### Resultado geral

**Decisão: MANTER DEPLOY.**

Deploy tecnicamente íntegro. Produção ativa desde 2026-07-30T01:27Z. Tráfego real recebendo sem erros detectáveis. Nenhuma regressão confirmada. Novos eventos (`form_start`, `programa_clicked`) aguardam volume pós-deploy para validação em GA4. QA interativo em navegador (T01–T15, Kommo, Make, WhatsApp) permanece pendente — requer MCP de browser ou execução manual pelo operador.
