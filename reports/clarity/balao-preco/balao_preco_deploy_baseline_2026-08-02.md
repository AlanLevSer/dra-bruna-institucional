# Baseline — LP Balão Intragástrico Preço
## Deploy: 2026-08-02 | SHA: a5e9b0c

---

## 1. Identificação do Deploy

| Campo | Valor |
|---|---|
| SHA publicado | `a5e9b0c` (merge commit PR #10 → main) |
| Branch de origem | `fix/balao-preco-load-mobile-cro-2026-08-02` |
| PR | [#10](https://github.com/levser/dra-bruna-institucional/pull/10) |
| Merge manual em | 2026-08-02 20:01:26 BRT |
| CI concluído em | 2026-08-02 20:03:27 BRT (success) |
| Vercel deploy confirmado | 2026-08-02 20:13 BRT (Vercel ID: `gru1::1785712383-8QHlgS9hha9nkL5VMCQkSmrADtQ7vF63`) |
| URL de produção | https://www.brunadurelli.com.br/balao-intragastrico-preco-a |
| Versão da LP | Plasma V2 — Balão Preço CRO 2026-08-02 |

---

## 2. Escopo das Alterações Publicadas

### Funcionalidades entregues neste deploy:

| # | Componente | Alteração |
|---|---|---|
| 1 | `src/lib/tracking.ts` | `TRACKING_PARAM_KEYS` — adicionados `campaign_id`, `ad_group_id`, `keyword` |
| 2 | `src/components/LeadChatWidget.tsx` | `baseWebhookPayload` — campos `campaign_id`, `ad_group_id`, `keyword` agora propagados ao Make.com |
| 3 | `src/components/vendas/FinalCTAVendasPreco.tsx` | Semântica corrigida: WhatsAppIcon SVG, texto "Falar pelo WhatsApp", remoção de underline e `href tel:` |
| 4 | `src/lib/leadChat.ts` | Deduplicação de `cta_clicked`: exatamente 1× por ação real; fallback renomeado para `leadchat_open_attempt` |
| 5 | `src/components/vendas/HeroVendasPreco.tsx` | CTA acima da dobra em mobile; `id="hero-price-cta"` |
| 6 | `src/components/vendas/StickyPriceCtaMobile.tsx` | Novo componente — sticky CTA mobile (oculto em desktop via `lg:hidden`) |
| 7 | `src/pages/BalaoIntragasticoPreco.tsx` | Título "Valores 2026"; `requestIdleCallback(4000)` para LeadChatWidget; race condition fix |
| 8 | `src/test/api-lead-contract.test.ts` | 37 testes de contrato (passando na build) |

### Integrações não alteradas:

- Google Ads (campanha, ad groups, keywords, budget, lances)
- GTM (tags, triggers, variáveis — publicado)
- GA4 (eventos, key events, dimensões)
- Make.com (webhook URL, protocolo)
- Kommo (pipeline, definição 01-MQL)
- Estrutura do payload de Lead
- `protocol_id`, número oficial de atendimento

---

## 3. Verificações de Pré-Deploy (todas aprovadas)

- [x] 37/37 testes passando (`vitest run`)
- [x] `tsc --noEmit` — zero erros
- [x] `eslint` — zero erros (0 warnings)
- [x] `vite build` — concluído (bundles dentro de limites)
- [x] QA browser headless em staging (`vite preview` porta 4174):
  - Race condition: 5/5 timings (0ms, 500ms, 1s, 2s, 4s) → `cta_clicked=1, chat_open=1`
  - 4 fontes CTA: hero, sticky, section, whatsapp_row → eventos corretos
  - Close/reopen: 2 aberturas independentes → `cc=1, co=1` cada
  - Atribuição: `campaign_id`, `ad_group_id`, `keyword` lidos e propagados
  - Zero erros JS, zero 404s relevantes

---

## 4. Estado do Smoke Test em Produção

**Status:** Inconclusivo via automação — pendente verificação manual.

**Motivo:** O Vercel Security Checkpoint (WAF) apresenta challenge JavaScript que não pode ser resolvido por Playwright headless em WSL2. O challenge não é um indicador de problema na LP — é proteção de bot ativa para todos os crawlers/automações sem sessão de usuário real.

**O que foi confirmado via automação:**
- URL responde sem redirect (HTTP 200, `x-vercel-id` válido)
- Deploy da região `gru1` (São Paulo) está ativo
- Sem redirect para outras rotas

**O que requer verificação manual (browser real):**

| # | Item | Como verificar |
|---|---|---|
| 1 | Rota carrega sem redirect | Abrir URL no Chrome, verificar barra de endereços |
| 2 | Título contém "Valores 2026" | Inspecionar `<title>` ou ver na aba do browser |
| 3 | H1 = "Preço do Balão Gástrico em São Paulo" | Inspecionar o DOM |
| 4 | CTA acima da dobra mobile | Abrir em celular (Chrome mobile) |
| 5 | CTA abre LeadChat visualmente | Clicar e confirmar modal abre |
| 6 | Clique precoce (< 1s) abre modal | Clicar imediatamente após load |
| 7 | WhatsApp row: "Falar pelo WhatsApp" | Scroll até rodapé, confirmar texto do botão |
| 8 | Sem `href tel:` | DevTools → Elements → Ctrl+F → "tel:" |
| 9 | Sticky CTA aparece ao rolar | Rolar para baixo do hero, confirmar botão fixo |
| 10 | `cta_clicked` dispara 1× | DevTools → Console → `dataLayer` após clicar |
| 11 | `chat_open` dispara 1× | DevTools → Console → `dataLayer` após modal abrir |
| 12 | `cta_source` correto | Ver `dataLayer` — campo `cta_source` no evento |
| 13 | UTMs preservadas na sessão | `sessionStorage.getItem("last_touch_tracking")` |
| 14 | `campaign_id`, `ad_group_id`, `keyword` preservados | Mesmo sessionStorage |
| 15 | `protocol_id` presente no payload | DevTools → Network → requisição `/api/lead` |
| 16 | Zero chamadas diretas ao Make.com | DevTools → Network → sem `hook.make.com` |
| 17 | Zero erros JS | DevTools → Console — sem erros vermelhos |
| 18 | Zero 404 relevantes | DevTools → Network → sem 404 |
| 19 | Desktop sem regressão | Abrir em 1366px, confirmar layout normal |

---

## 5. Métricas Pré-Deploy (linha de base)

> Preencher com dados do GA4/Clarity antes do fim da janela de observação.

| Métrica | Período | Valor pré-deploy |
|---|---|---|
| Sessões na rota `/balao-intragastrico-preco-a` | Últimas 2 semanas | — |
| Taxa de conversão (Lead enviado / sessão) | Últimas 2 semanas | — |
| `cta_clicked` por sessão (média) | Últimas 2 semanas | — |
| `chat_open` por sessão (média) | Últimas 2 semanas | — |
| Taxa de bounce mobile | Últimas 2 semanas | — |
| Tempo médio na página (mobile) | Últimas 2 semanas | — |
| CPL STAG (custo por Lead) | Últimas 2 semanas | — |

---

## 6. Configuração Google Ads — Estado no Deploy

> NÃO ALTERADO. Registrado apenas para referência.

| Campo | Valor |
|---|---|
| Campanha STAG | Ativa |
| Budget STAG | R$ 50/dia |
| Strategy de lance | — (não alterar) |
| Match de keywords | — (não alterar) |
| Ads aprovados | — (não alterar) |

---

## 7. Janela de Congelamento (Freeze)

**Início:** 2026-08-02 (deploy concluído)
**Duração:** 7 dias corridos **OU** 40 cliques STAG (o que ocorrer primeiro)
**Término estimado:** 2026-08-09

### Durante o freeze — NÃO ALTERAR:

- Orçamento / strategy de lance Google Ads
- Keywords e match types
- Anúncios ativos
- GTM (nenhuma alteração ou publicação)
- GA4 (eventos, key events)
- LP, formulário, layout, textos
- Make.com (webhook, protocolo, cenários)
- Kommo (pipeline, 01-MQL)
- Definição de Lead qualificado

---

## 8. Checkpoint de Métricas

Verificar em **2026-08-09** (ou quando atingir 40 cliques STAG):

| Métrica | Alerta se... |
|---|---|
| Taxa de conversão | < 80% da linha de base |
| `cta_clicked` / sessão | > 1.1 (possível duplicidade reintroduzida) |
| `chat_open` / sessão | > 1.1 ou < 0.8 da baseline |
| Erros JS em produção | Qualquer novo erro não presente antes do deploy |
| Taxa de bounce mobile | > 110% da baseline |
| Leads no Kommo (01-MQL) | < 70% da baseline proporcional |

---

## 9. Condições de Rollback

Reverter para o commit anterior (`1ddc9b7`) se **qualquer** condição abaixo for verificada:

1. Rota indisponível ou redirect inesperado
2. Modal invisível (falha de abertura)
3. `cta_clicked` disparando > 1× por clique
4. `chat_open` disparando > 1× por abertura
5. Formulário quebrado (campos não funcionam, submit falha)
6. `/api/lead` retornando erro para > 5% das requisições
7. UTMs ou `campaign_id`/`ad_group_id`/`keyword` ausentes no payload
8. `protocol_id` ausente no payload
9. Duplicação de Lead no Kommo
10. Exposição de PII em logs ou responses públicas
11. Regressão grave de layout em mobile (CTA inacessível)

**Como reverter:**
```bash
git revert a5e9b0c --no-commit
git commit -m "revert: rollback LP Balão Preço para pré-deploy 2026-08-02"
git push origin main
```

---

## 10. Responsáveis

| Papel | Responsável |
|---|---|
| Deploy e QA técnico | Alan LevSer |
| Validação de produto | Dra. Bruna Durelli |
| Monitoramento Google Ads | Alan LevSer |
| Decisão de rollback | Alan LevSer |

---

*Documento gerado automaticamente após merge do PR #10 em 2026-08-02.*
*SHA de referência: `a5e9b0c`*
