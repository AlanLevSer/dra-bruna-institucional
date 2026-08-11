# Deploy Log

Registro de exceções, incidentes, rollbacks e hotfixes em produção.
Use este arquivo para registrar apenas desvios do fluxo normal de deploy.

---

## 2026-08-11 — C1 GLP-1/GIP: portabilidade de vídeo + merge para produção

**Commit em produção:** `cc54f3b`
**PR:** #12 (squash merge, branch `fix/glp1-video-portability`)
**Data/hora deploy Vercel (UTC):** 2026-08-11
**URL canônica:** `https://www.brunadurelli.com.br/tratamento-glp1-a`
**LP:** C1 GLP-1/GIP (`LP_VARIANT = GLP_C1_V1`, `ROUTE_INTENT = GLP`)

### Escopo da mudança

3 arquivos alterados / 2 binários adicionados:

| Arquivo | Tipo | Alteração |
|---|---|---|
| `src/components/glp1/Glp1Espaco.tsx` | PATCH | Substituição de imports `.asset.json` (CDN Lovable `/__l5e/`) por constantes estáticas locais (`/media/`) |
| `public/media/levser-estrutura.mp4` | BINARY | Vídeo H.264 1080×1920, 16.67s, 2.91 MB (SHA-256: `f2ba10c7…`) |
| `public/media/levser-estrutura-poster.webp` | BINARY | Poster 720×1280, 183 KB (SHA-256: `9ceee7cd…`) |

**Motivação:** arquivos `.asset.json` do Lovable apontavam para CDN privado `/__l5e/assets-v1/` — inacessível no Vercel. Solução cirúrgica: constantes estáticas + binários em `public/media/`.

### Smoke test — produção (2026-08-11)

| Verificação | Resultado |
|---|---|
| `GET /tratamento-glp1-a` | ✅ HTTP 200 |
| `GET /media/levser-estrutura.mp4` | ✅ HTTP 200, `video/mp4`, `Accept-Ranges: bytes` |
| `GET /media/levser-estrutura-poster.webp` | ✅ HTTP 200, `image/webp` |
| Referências CDN Lovable no bundle | ✅ ZERO (`/__l5e/` ausente) |
| Make webhook exposto no HTML | ✅ ZERO |
| `noindex, nofollow` injetado | ✅ confirmado via `<meta name="robots">` no DOM |
| Sitemap exclui C1 | ✅ rota ausente em `/sitemap.xml` |

### QA de vídeo — Vercel Preview

QA manual do vídeo aprovado pelo operador na rota `/tratamento-glp1-a` no preview Vercel (SSO protegido — não testável via curl). Vídeo carregou e reproduziu corretamente.

### Rollback

Reverter para commit imediatamente anterior ao PR #12. O vídeo voltará a não carregar no Vercel (dependência Lovable CDN), mas a página ficará funcional sem a seção de vídeo. Alternativa: desabilitar `<Glp1Espaco />` em `TratamentoGlp1.tsx`.

### Auditoria de tracking — resultado

Auditoria READ-ONLY realizada em 2026-08-11. Relatório completo disponível em: `https://claude.ai/code/artifact/8eda6cbb-5085-4266-b586-08e62c06dd0f`

| Tecnologia | Status |
|---|---|
| GTM-WZFMV5R7 (published) | ✅ Funcionando |
| GA4 G-KMMT4DTVQF | ⚠️ Problema — key event `whatsapp_click` ausente |
| Google Ads conversão "Lead" | ✅ Funcionando |
| Conversion Linker (T27) | ⚠️ Problema — GTM carrega com atraso 1.5–2s |
| Microsoft Clarity (idm2xm22st) | ✅ Funcionando |
| Meta Pixel 3581322512114101 | ⚠️ Problema — dupla inicialização (código + GTM) |
| Consent Mode v2 | ❌ Não instalado |
| dataLayer | ✅ Funcionando |
| UTMs/GCLID atribuição | ✅ Funcionando |
| LeadChat (5 cta_source) | ⏳ Não validado em runtime |
| /api/lead proxy | ✅ Funcionando |
| Kommo | ⏳ Sem acesso MCP |
| 01-MQL offline conversion | ⚠️ Problema — sem campanha GLP-1 ativa |

**Gate:** C1 NÃO declarada pronta para tráfego pago. Pendências: LeadChat runtime, Kommo end-to-end, campanha GLP-1, Meta Pixel duplo, Consent Mode v2.

---

## 2026-07-31 — Plasma V2: encerramento do ciclo de QA e início da janela de observação

**Commit em produção (no momento do QA):** `afd979f01754a3af862e7d2c82582ae970f6e57a`
**Commit funcional Plasma V2:** `4e181596fbdcdc385ddc61200863131197b73c89`
**Data/hora do QA (UTC):** 2026-07-31 00:07
**Data/hora do QA (BRT):** 2026-07-30 21:07
**URL canônica testada:** `/plasma-de-argonio-a`
**Viewports testados:** mobile 390px, desktop 1440px
**Tipo:** encerramento formal de ciclo — sem alteração funcional, sem alteração de LP, sem alteração de campanha.

### Resultado do QA automatizado

| Categoria | Quantidade |
|---|---|
| PASS | 95 |
| FAIL (artefatos de teste — não falhas de produção) | 5 |
| WARN (não bloqueantes) | 2 |
| Falhas de produção confirmadas | 0 |

**Decisão: MANTER DEPLOY.**

### Cobertura T01–T15

| Teste | Escopo | Resultado |
|---|---|---|
| T01 | CTA click no hero — abertura do modal LeadChat | ✅ PASS |
| T02 | `chat_open` disparado no dataLayer ao abrir o modal | ✅ PASS |
| T03 | `cta_source` gravado em sessionStorage na abertura | ✅ PASS |
| T04 | Clique em card de programa (ProgramasTratamentoPlasma) | ✅ PASS |
| T05 | `program_selected` / `lc_program_selected` gravado em sessionStorage | ✅ PASS |
| T06 | `form_start` disparado na primeira digitação no campo nome | ✅ PASS |
| T07 | Progressão de steps do chat (chat_step) | ✅ PASS |
| T08 | POST `POST /api/lead` interceptado com payload correto | ✅ PASS |
| T09 | Ausência de chamada direta a `hook.eu2.make.com` | ✅ PASS |
| T10 | `protocol_id` presente no payload e na URL de redirecionamento WhatsApp | ✅ PASS |
| T11 | Abertura de URL `wa.me/` validada sem envio real | ✅ PASS |
| T12 | `cta_source` presente no payload de `POST /api/lead` | ✅ PASS |
| T13 | `program_selected` presente no payload de `POST /api/lead` | ✅ PASS |
| T14 | Comportamento do botão Back entre steps | ⚠️ WARN — cobertura automatizada parcial por limitação do seletor; fluxo funcional não invalidado |
| T15 | Regressão da LP Balão Intragástrico (`/balao-intragastrico-preco-a`) | ✅ PASS |

### Pontos validados

| Item | Resultado |
|---|---|
| `cta_source` no front-end e em sessionStorage | ✅ validado |
| `program_selected` no front-end e em sessionStorage | ✅ validado |
| `program_selected` no payload de `/api/lead` | ✅ validado |
| sessionStorage limpo e consistente entre aberturas | ✅ validado |
| `POST /api/lead` interceptado — proxy same-origin ativo | ✅ validado |
| Ausência de chamada direta ao Make.com | ✅ validado |
| `protocol_id` no payload e no link WhatsApp | ✅ validado |
| Abertura do WhatsApp sem envio real | ✅ validado |
| Regressão LP Balão | ✅ sem regressão detectada |
| Tráfego real sendo recebido sem erros visíveis | ✅ confirmado |

### Limitações explícitas desta execução de QA

- **T14**: cobertura automatizada parcial — o seletor do botão Back não atingiu o elemento correto em todos os estados do modal; o fluxo de produção não foi invalidado, mas o cenário de regressão do Back não está coberto com garantia automatizada.
- **Make.com e Kommo**: não validados end-to-end nesta execução — sem acesso MCP ao Make.com e ao Kommo.
- **`program_selected` no Kommo**: campo recebido pelo Make.com e enviado no payload, mas **não confirmado como persistido no Kommo** (requer verificação manual ou acesso MCP).
- **5 FAILs**: artefatos da suíte de testes — race condition de timing em asserções de redirect, listener de evento registrado antes do evento no ciclo React, e resolução de seletor em viewport mobile 360px. Nenhum representa falha de comportamento em produção.
- **2 WARNs**: (1) seletor do Back em T14; (2) spy de `dataLayer` sensível a objetos circulares em evento específico de GTM — não bloqueia produção.

### Status do primeiro lead real pós-deploy

| Etapa | Status |
|---|---|
| Confirmado no front-end (cta_clicked, chat_open, form_submit, whatsapp_redirect) | ✅ 1 lead completo registrado em 2026-07-29 (pré-deploy Plasma V2) |
| Confirmado no payload `/api/lead` | ⏳ Aguardando lead real pós-deploy com Plasma V2 ativo |
| Recebido pelo Make.com | ⏳ Aguardando — sem acesso MCP ao Make |
| Persistido no Kommo | ⏳ Aguardando — sem acesso MCP ao Kommo |
| Descartado ou sem campo de destino | — |

### Pendências técnicas não bloqueantes (melhorias opcionais da suíte)

1. **Corrigir seletor do botão Back no T14** — identificar o seletor estável do elemento de navegação entre steps do modal e atualizar o script de teste.
2. **Tornar o spy de dataLayer tolerante a objetos circulares** — envolver o interceptador em `try/catch` com serialização segura, evitando falha do spy em eventos GTM com referências circulares.

Nenhuma dessas pendências afeta o comportamento de produção. Nenhum PR funcional deve ser aberto por causa desses pontos antes do checkpoint.

### Janela de observação

| Item | Valor |
|---|---|
| Início | 2026-07-29 22:27 BRT (momento do deploy) |
| Checkpoint | 2026-08-05 22:27 BRT **ou** 15 `chat_open` na rota `/plasma-de-argonio-a`, o que ocorrer primeiro |
| Campanha monitorada | `24057499154` |
| Rota monitorada | `/plasma-de-argonio-a` |

**Funil a monitorar:**
sessões → `cta_clicked` → `chat_open` → `form_start` → `chat_step` → `form_submit` → `whatsapp_redirect` → Lead Kommo → MQL → avaliação → venda

**Congelamento até o checkpoint** — não executar antes do checkpoint sem falha técnica confirmada, exposição de PII, duplicação de leads, indisponibilidade de `/api/lead` ou regressão relevante:
- aumento de orçamento
- pausa de grupos de anúncios
- alteração de keywords ou correspondência
- remoção do campo e-mail
- alteração de CTA
- redesenho do formulário
- ativação da campanha Reganho
- mudança estrutural da LP

### Métricas a consolidar no checkpoint (campanha 24057499154 / rota /plasma-de-argonio-a)

Impressões · cliques · custo · 01-MQL · CPA/MQL · sessões Clarity · `cta_clicked` · `chat_open` · `form_start` · `form_submit` · `whatsapp_redirect` · Leads Kommo · MQL Kommo · avaliações · vendas

Taxas: clique→sessão · sessão→CTA · CTA→chat_open · chat_open→form_start · form_start→form_submit · form_submit→Lead · Lead→MQL · MQL→avaliação

Segmentações: `cta_source` · `program_selected` · dispositivo · grupo de anúncio · termo de pesquisa

### Status Make.com e Kommo

| Sistema | Status nesta execução |
|---|---|
| Make.com | Sem acesso MCP — não validado end-to-end |
| Kommo | Sem acesso MCP — campos customizados não confirmados |

### Confirmação de ausência de alterações funcionais e de campanha

Nenhuma alteração foi feita em: código funcional · LP · Google Ads · GTM · GA4 · Make.com · Kommo.

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
