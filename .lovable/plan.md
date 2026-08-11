# Divergência Lovable x GitHub — auditoria e plano de sincronização

## Resultado da auditoria (fase 1)

O projeto Lovable **não está conectado a nenhum repositório GitHub**. O único remoto `origin` configurado é o armazenamento Git interno do Lovable:

```text
origin  https://git.private.lovable-gcp.code.storage/07dbc8fe-430e-432c-9aaa-d633440ed6e3.git
```

| Item | Valor |
| --- | --- |
| Repositório conectado | Git interno do Lovable (não GitHub) |
| Owner/repository GitHub | nenhum |
| Branch atual | `edit/edt-260d1462-...` (working branch), `main` local existe |
| HEAD | `2a018f5` — "Ignorou EdgeFuncs MCP do ESLint" |
| `main` / `origin/main` | `2a018f5` (idênticos ao HEAD) |
| Working tree | limpo, tudo commitado |

**Motivo da divergência `8d2f451` vs `5ef2462`:** são históricos de dois repositórios diferentes. `8d2f451` é um commit do Git interno do Lovable (aparece no histórico local, antes de `7b40ad9` "Adicionou /tratamento-glp1-a"). `5ef2462` é o HEAD do GitHub auditado pelo Claude Code, que nunca recebeu esses commits porque a sincronização GitHub não está ativa neste projeto. Nenhum commit da C1 jamais saiu do ambiente Lovable.

## Inventário da C1 (fase 2) — tudo presente e commitado

- `src/pages/TratamentoGlp1.tsx`
- `src/components/glp1/`: `Glp1Hero`, `Glp1Sections`, `Glp1Cta`, `Glp1StickyCta`, `Glp1Midia`, `Glp1Avaliacoes`, `Glp1Espaco`
- `src/App.tsx` — rota `/tratamento-glp1-a` presente
- `vercel.json` — rewrite `tratamento-glp1-a` presente
- `eslint.config.js` — `{ ignores: ["dist", "supabase/functions/mcp/**"] }`
- `src/index.css` — tokens de contraste dos CTAs
- Infra reutilizada: `src/lib/tracking.ts`, `src/lib/analytics.ts`, `src/components/LeadChatWidget.tsx`, `src/hooks/useGoogleReviews.ts`
- Logos de mídia: `src/assets/media/*.avif` — binários versionados, OK

## Estado do vídeo (fase 5) — risco alto para produção

```text
COMPONENTE:            src/components/glp1/Glp1Espaco.tsx
CAMINHO DO ASSET:      src/assets/levser-estrutura.mp4.asset.json
                       src/assets/levser-estrutura-poster.webp.asset.json
TIPO DE REFERÊNCIA:    ponteiro JSON para CDN do Lovable (import do .asset.json, uso de .url)
URL/PATH:              /__l5e/assets-v1/<id>/levser-estrutura.mp4  (caminho relativo, mesma origem)
VERSIONADO NO GIT?     SIM, apenas os arquivos .asset.json (492 B e 468 B)
BINÁRIO NO GIT?        NÃO — o MP4 (2,9 MB) e o WebP (184 KB) não existem em public/ nem em src/assets/
PRESENTE NA BRANCH?    o ponteiro sim; o arquivo de mídia não
```

O caminho `/__l5e/assets-v1/...` é servido pela infraestrutura de hospedagem do Lovable. Não há plugin no `vite.config.ts` que reescreva esse caminho no build, e o `vercel.json` não tem rewrite/proxy para `/__l5e/*`. **Em produção na Vercel, o vídeo e o poster devem retornar 404.** Esta é a causa provável do problema de mídia no deploy externo. Conforme instruído, nada será corrigido agora — a decisão fica para depois da auditoria do Claude Code (opções futuras: versionar os binários em `public/` ou usar a URL absoluta do CDN).

## Fases 3, 4 e 6 — bloqueio

Não é possível criar e enviar a branch `feat/glp-c1-sync` para o GitHub a partir daqui: não existe remoto GitHub configurado e o ambiente não executa operações Git de escrita fora do Git interno do Lovable. Nenhum push, force push, reset ou reescrita de histórico foi executado.

## Plano de sincronização proposto

1. Conectar o GitHub no editor Lovable: menu `+` no chat > GitHub > Connect project, autorizando a conta/organização dona do repositório que alimenta o Claude Code/Vercel (o que está em `5ef2462`).
2. Se o Lovable não permitir vincular um repositório já existente com histórico próprio, a alternativa não destrutiva é: clonar o Git interno do Lovable, adicionar o GitHub como segundo remoto e empurrar apenas uma branch nova `feat/glp-c1-sync`, sem tocar em `main`. Como as duas histórias não têm ancestral comum, o PR precisará ser aberto como comparação de conteúdo (ou a branch construída a partir de `origin/main` do GitHub, aplicando por cima somente os arquivos da C1 listados acima).
3. Com a branch no GitHub, o fluxo segue como planejado: auditoria do Claude Code, `deploy:check`, auditoria do vídeo, PR, Vercel Preview, QA, merge, produção.

Confirme como quer prosseguir: conectar o GitHub pela interface do Lovable, ou receber o pacote exato de arquivos e comandos para você mesmo criar a branch localmente.

## STATUS

`SINCRONIZAÇÃO BLOQUEADA — projeto Lovable não está conectado a nenhum repositório GitHub; origin aponta apenas para o Git interno do Lovable (HEAD 2a018f5). Risco adicional: vídeo/poster referenciados por URL exclusiva do CDN Lovable, sem binário versionado.`
