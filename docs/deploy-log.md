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

| Verificação | Resultado |
|---|---|
| `deploy:check` (lint + type-check + build + vercel.json) | ✅ passou após correção de lint pré-existente |
| Lint `api/lead.ts` e `api/lead-event.ts` (`no-explicit-any`) | ⚠️ falha pré-existente de `2f32e7e` — corrigida em `fix/lint-api-no-explicit-any` |
| Bundle client: ausência de `hook.eu2.make.com` / `MAKE_LEAD_WEBHOOK_URL` | ✅ nenhuma exposição |
| Arquitetura: browser → `/api/lead` (proxy same-origin) → Make.com | ✅ confirmado via `leadDelivery.ts` |
| `cta_source`, `program_selected`, `protocol_id` no payload do lead | ✅ confirmado |
| `ProgramasTratamentoPlasma`: mapeamento título → slug canônico → sessionStorage | ✅ correto |
| LeadChatWidget: leitura de sessionStorage `lc_program_selected` | ✅ correto |
| Smoke test visual em navegador (rotas P0) | ⏳ PENDENTE — requer navegador |
| Chegada de lead de QA no Kommo | ⏳ PENDENTE — requer navegador e procedimento seguro de QA |
| WhatsApp abre com `protocol_id` correto | ⏳ PENDENTE — requer navegador |

### Ações resultantes

- `fix/lint-api-no-explicit-any` — corrigido e merged via PR #5, squash SHA `685e2ce` em main
- Smoke test funcional: deve ser realizado em navegador na URL de produção com aba anônima + UTMs de teste
- Após smoke test: atualizar este registro com resultado

### Resultado geral

Deploy tecnicamente íntegro. Nenhum risco crítico identificado nas validações automatizadas.
QA visual e funcional pendente — executar antes de considerar este deploy encerrado.
