# Regerar o pacote de sincronização C1 — HEAD 33a4f99

Apenas exportação. Nenhuma alteração em código, `Glp1Espaco.tsx`, paths de vídeo, Git, branch, GitHub, deploy ou tracking. Working tree permanece limpo.

## Contexto verificado

- Único remote do projeto: git interno do Lovable. Não há remote `AlanLevSer/dra-bruna-institucional`.
- `main` local = `origin/main` = `33a4f99`. Working tree limpo.
- Delta `2a018f5..33a4f99` = 8 commits, **todos** tocando somente `.lovable/plan.md` e `.lovable/plan/*.md`. Nenhum código ou asset da C1 mudou.

## Entrega

Regenerar `/mnt/documents/c1-glp1-sync/` + `.zip`, com:

- `src/pages/TratamentoGlp1.tsx` e `src/components/glp1/*` no estado `33a4f99`.
- Para cada um dos 8 arquivos existentes modificados (`src/App.tsx`, `src/index.css`, `vercel.json`, `eslint.config.js`, `src/lib/tracking.ts`, `src/lib/analytics.ts`, `src/lib/leadChat.ts`, `src/components/LeadChatWidget.tsx`): arquivo completo em `33a4f99`, patch Lovable, commit de origem, descrição funcional e SHA-256.
- Todos os patches marcados **AUDIT REFERENCE ONLY** — comparação semântica contra o `main` oficial do GitHub, sem `git apply`.
- Assets reais revalidados e re-hasheados: `levser-estrutura.mp4`, `levser-estrutura-poster.webp`, foto Dra. Bruna, imagem do hero, 6 logos de mídia; ponteiros `.asset.json` só como referência.

## MANIFESTO.md

- Cabeçalho `SOURCE SNAPSHOT: Lovable HEAD 33a4f99` / `GENERATED FROM: working tree clean` / `PURPOSE: integração semântica no GitHub oficial, não cherry-pick e não aplicação automática de patches`.
- Delta completo `2a018f5..33a4f99` com SHA, data, mensagem e arquivos afetados, classificando cada commit como código/asset da C1 ou apenas metadados `.lovable`.
- Varredura reexecutada no HEAD atual por `__l5e`, `asset.json`, `lovable.app`, `lovable-gcp`, `assets-v1`, com o contador `C1 LOVABLE-ONLY DEPENDENCIES = X` recalculado (sem assumir 2).
- Seção "Diferença Lovable × GitHub": snapshot Lovable `33a4f99`, GitHub auditado `5ef2462`, históricos distintos, sem reconciliar SHAs; verdade visual/funcional da C1 = `33a4f99`, base técnica de integração = HEAD do GitHub no momento da integração.
- Seções A–E (novos, modificados, assets novos, dependências reutilizadas não copiadas, assets Lovable-only a eliminar) e SHA-256 de todos os arquivos.

## Ao concluir

Pasta e ZIP regenerados, SHA-256 do ZIP, contagem de arquivos, contagem de dependências Lovable-only e confirmação de working tree limpo.
