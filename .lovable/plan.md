# Regerar o pacote de sincronização C1 a partir do HEAD atual

## Contexto verificado

- O único remote deste projeto é o git interno do Lovable (`git.private.lovable-gcp.code.storage/07dbc8fe-...`). Não há remote para `AlanLevSer/dra-bruna-institucional`.
- `main` local = `origin/main` = `33a4f99` ("Integrou pacotes C1 no projeto"). O `5ef2462` do GitHub pertence a outra árvore de histórico, que nunca recebeu estes commits.
- O pacote entregue antes foi gerado no HEAD `2a018f5`; houve commits depois disso, então ele está defasado.

## O que será feito

Regerar `/mnt/documents/c1-glp1-sync/` (mais o `.zip`) a partir do HEAD atual `33a4f99`, mantendo a mesma estrutura já aprovada:

- Código-fonte da C1: `src/pages/TratamentoGlp1.tsx` e `src/components/glp1/*`.
- Arquivos modificados com versão completa + patch de auditoria.
- Binários reais do vídeo e do poster baixados do CDN.
- `MANIFESTO.md` com seções A–E, hashes SHA-256 de todos os arquivos e o contador `C1 LOVABLE-ONLY DEPENDENCIES`.

Adições em relação ao pacote anterior:

- Seção "Diferença Lovable × GitHub" no manifesto explicando que `main` do Lovable e `main` do GitHub são históricos distintos, e que a integração é semântica (não cherry-pick por SHA).
- Delta de commits entre `2a018f5` e `33a4f99`, para o Claude Code saber o que mudou desde o pacote anterior.

## Fora do escopo

Nenhuma alteração no código do projeto, nenhum branch, push, deploy ou conexão com o GitHub.
