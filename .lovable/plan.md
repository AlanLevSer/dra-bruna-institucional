# Publicar a LP C1 (GLP-1/GIP)

A LP já está implementada e validada no preview em `/tratamento-glp1-a`. O próximo passo é deixá-la acessível no domínio de produção para receber tráfego pago.

## O que será feito

1. Rodar a verificação de segurança do projeto antes do deploy.
2. Publicar o projeto (deploy do frontend).
3. Confirmar que a rota responde em produção e reportar a URL final.

## Resultado esperado

- URL de campanha: `https://www.brunadurelli.com.br/tratamento-glp1-a`
- URL Lovable equivalente também disponível.
- Rota permanece fora do índice orgânico (`noindex, nofollow`) e fora do sitemap.
- Site institucional, menus e demais rotas inalterados.

## Detalhes técnicos

- Publicação envia apenas o frontend já construído; nenhuma alteração de backend, webhook, GTM/GA4 ou Kommo é feita.
- Nada de MCP ou integrações de agentes é habilitado nesta etapa.
- Parâmetros de aquisição (UTMs, `gclid`, `ad_id`, `intent_cluster`) continuam sendo capturados pela infraestrutura existente e enviados no payload do lead junto de `cta_source`, `route_intent=GLP` e `lp_variant=GLP_C1_V1`.
