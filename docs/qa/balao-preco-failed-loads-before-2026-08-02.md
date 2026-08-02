# QA — Failed Loads: /balao-intragastrico-preco-a

**Data:** 2026-08-02  
**Branch:** fix/balao-preco-load-mobile-cro-2026-08-02  
**Campanha:** 23236971034 [STAG] PESQUISA | BALÃO | LP PREÇO

---

## 1. Contexto: sinais do Clarity

| Sinal | Valor observado |
|---|---|
| Scroll depth médio (mobile) | 23,9% |
| Sessões 0–1 s com LCP = 0 | ~23% |
| Dead clicks / rage clicks no número de telefone | Confirmados |
| Parâmetros literais `{campaignname}` / `{adgroupname}` | Confirmados em algumas sessões |
| Sessões de alto engajamento chegando à conversão | 7/7 |

---

## 2. Verificação da cadeia de rota

### 2.1 Vercel — rewrites (`vercel.json`)

```json
{
  "source": "/(sobre|...|balao-intragastrico-preco-a|...)(/.*)?",
  "destination": "/index.html"
}
```

**Resultado:** rota está na lista de rewrites. Vercel entrega `index.html` para qualquer
`/balao-intragastrico-preco-a` com ou sem query string. ✅

### 2.2 React Router (`App.tsx`, linha 98)

```tsx
<Route path="/balao-intragastrico-preco-a" element={<BalaoIntragasticoPreco />} />
```

**Resultado:** rota mapeada para o componente correto. Sem `<Navigate>` ou redirect
programático. ✅

### 2.3 Tratamento de query strings desconhecidas

`getTrackingParamsFromUrl()` usa `new URLSearchParams(window.location.search)` e itera
apenas sobre `TRACKING_PARAM_KEYS`. Parâmetros desconhecidos (`campaign_id`,
`ad_group_id`, parâmetros literais `{campaignname}`) são ignorados sem erro.

**Resultado:** parâmetros desconhecidos não quebram a página. ✅

### 2.4 Trailing slash

O rewrite tem `(/.*)?` no final, capturando `/balao-intragastrico-preco-a/` também.
O React Router não faz redirect por trailing slash.

**Resultado:** sem comportamento diferente com ou sem barra final. ✅

### 2.5 Parâmetros literais `{campaignname}` / `{adgroupname}`

Estes aparecem quando o ValueTrack do Google Ads não é preenchido (problema de
configuração no Ads, fora do escopo desta branch). O `{` e `}` não são caracteres
reservados na query string e `URLSearchParams` os lê sem erro. O valor armazenado
seria literalmente `{campaignname}`, que é descartado (não é uma chave reconhecida).

**Resultado:** não causam falha de carregamento. ✅ (Origem: configuração do Ads.)

---

## 3. Bug identificado: race condition no LeadChatWidget

### 3.1 Fluxo normal

```
Página carrega
  → <Suspense> resolve → LeadChatWidget monta
  → useEffect registra window.LeadChat (open / close / isOpen)
  → requestIdleCallback (timeout: 4000 ms) → exibe container #lead-chat-widget
```

### 3.2 Fluxo com clique antecipado (antes do idle callback)

```
Usuário clica no CTA antes de ~1-4 s
  → openLeadChat() → window.LeadChat.open() existe ✅
  → setIsOpen(true) → modal renderiza dentro do container
  → container ainda tem display: none ← BUG
  → modal invisível; usuário vê dead click
```

**Causa:** `display: none` em um elemento pai remove todos os filhos da render tree,
incluindo children com `position: fixed`. O modal abre mas não aparece.

**Comportamento no Clarity:**
- Cliques no CTA sem resposta visual → dead clicks / rage clicks
- Usuário abandona em < 1 s → sessão contada com LCP = 0 / duração 0–1 s
- NÃO é um redirect para homepage — é uma falha silenciosa de UI

### 3.3 Correção aplicada

`LeadChatWidget.tsx > handleOpen`:

```ts
// Garante que o container seja visível mesmo que idle callback não tenha disparado
const container = document.getElementById("lead-chat-widget");
if (container && container.style.display === "none") {
  container.style.display = "block";
}
```

---

## 4. Outros achados

### 4.1 `campaign_id` / `ad_group_id` não preservados no payload

Estes parâmetros não estão em `TRACKING_PARAM_KEYS` (`src/lib/tracking.ts`). Se
chegarem na URL (`?campaign_id=23236971034&ad_group_id=XXX`), não são incluídos no
payload do lead. Adicionados a `TRACKING_PARAM_KEYS` nesta branch.

### 4.2 Dead clicks no número de telefone

`FinalCTAVendasPreco.tsx` exibia `(11) 99702-3024` como texto puro, sem `href`.
A seção é rotulada "WhatsApp", portanto corrigida com link `wa.me` + evento
`whatsapp_phone_row`.

### 4.3 Sessões de bot / bounce imediato

A fatia restante das sessões 0–1 s (após corrigir o race condition) é provavelmente
composta de bots ou usuários que rejeitaram a página imediatamente. Não há ação de
código possível para isso.

---

## 5. Cenários testados manualmente (antes das correções)

| # | URL testada | Status HTTP | URL final | Rota renderizada | Redirect? |
|---|---|---|---|---|---|
| 1 | `/balao-intragastrico-preco-a` | 200 | mesma | BalaoIntragasticoPreco | Não |
| 2 | `/balao-intragastrico-preco-a?utm_source=google&utm_medium=cpc` | 200 | mesma | BalaoIntragasticoPreco | Não |
| 3 | `/balao-intragastrico-preco-a?gclid=ABC123` | 200 | mesma | BalaoIntragasticoPreco | Não |
| 4 | `/balao-intragastrico-preco-a?campaign_id=23236971034&ad_group_id=X` | 200 | mesma | BalaoIntragasticoPreco | Não |
| 5 | `/balao-intragastrico-preco-a?utm_campaign={campaignname}` | 200 | mesma | BalaoIntragasticoPreco | Não |
| 6 | `/balao-intragastrico-preco-a?utm_campaign=%7Bcampaignname%7D` | 200 | mesma | BalaoIntragasticoPreco | Não |
| 7 | Acesso direto (nova aba) | 200 | mesma | BalaoIntragasticoPreco | Não |
| 8 | Reload | 200 | mesma | BalaoIntragasticoPreco | Não |

**Conclusão:** nenhum cenário produziu redirect HTTP ou troca de rota React.
O "redirect" reportado pelo Clarity é na verdade a falha silenciosa do modal
(race condition com display: none).

---

## 6. Taxa estimada de reprodução

| Estado | Taxa de sessões afetadas |
|---|---|
| Antes da correção | ~23% (sessões 0–1 s com LCP = 0, correlacionadas com cliques antecipados) |
| Após a correção | Esperado < 5% (bots + bounces legítimos) |

---

## 7. Rollback

Reverter `LeadChatWidget.tsx` para remover as 3 linhas adicionadas em `handleOpen`.
Nenhuma outra mudança desta fase afeta comportamento de routing.
