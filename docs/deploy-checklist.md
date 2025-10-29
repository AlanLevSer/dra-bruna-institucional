# Deploy Checklist & Automação Guiada

Use esta sequência sempre que for publicar alterações no site ou em uma landing page. Ela evita problemas de acentuação, service worker e falhas de deploy.

## 1. Preparar o ambiente local

1. Confirme que o editor salva arquivos em **UTF-8 sem BOM**.
2. Execute a verificação automatizada:
   ```bash
   npm install
   npm run deploy:check
   ```
   O script roda lint, type-check, build, validação do `vercel.json`, inspeção das rotas e outras checagens que já evitaram falhas de produção. Corrija qualquer erro antes de seguir.
3. Se precisar rodar algo manualmente, siga a ordem:
   ```bash
   npm run lint
   npm run type-check
   npm run build
   node -e "JSON.parse(require('fs').readFileSync('vercel.json','utf8'))"
   ```

## 2. Revisar conteúdo e acentuação

- Limite as correções de acentuação **aos arquivos realmente editados**.
- Faça uma revisão visual (VS Code Preview ou browser) para garantir que não existem caracteres quebrados (`�`, `?`, etc.).
- Evite nomes de arquivos e rotas com acentuação. Use apenas caracteres ASCII; se precisar de fallback, trate via redirects (como `/bal\u00e3o-intragastrico` ➜ `/balao-intragastrico`).

## 3. Commit e Push

1. Verifique o status:
   ```bash
   git status
   ```
2. Commite apenas o que já passou pelas validações.
3. Execute `git push origin main` **após** todas as checagens.

## 4. Verificar build na Vercel

1. Acompanhe o dashboard da Vercel até o deploy ficar **Ready**.
2. Abra o log do deployment se houver qualquer falha.
3. Se aparecer erro de parse em `vercel.json`, revalide o arquivo com o comando da seção 1.

## 5. Testar no navegador (QA rápido)

Depois que o deploy estiver "Ready":

1. Abra uma aba anônima com UTMs (ex.: `?utm_source=instagram...`).
2. No DevTools → Application → Service Workers, clique em **Unregister** e depois **Clear storage** para garantir que o bundle novo seja carregado.
3. Acesse as rotas principais:
   - `/`
   - `/balao-intragastrico`
   - `/balao-intragastrico-a`
   - `/balao-intragastrico-b`
   - `/programa-levser`
   - demais páginas institucionais.
4. Observe no console se há erros de encoding ou de scripts externos.
5. Valide o envio do webhook (`trackWhatsAppClick`):
   - Marque *Preserve log*, clique num CTA e verifique se aparece `[WhatsApp webhook] payload ...`.
6. Confirme que o pixel do Facebook, GA4 e Clarity estão disparando (Network tab ou extensões de debug).

## 6. Registrar (opcional)

- Adicione observações no `docs/deploy-log.md` ou no dashboard interno caso algo fora da rotina aconteça.

Seguindo esse checklist e rodando o `npm run deploy:check`, evitamos regressões nas rotas e entregamos deploys confiáveis na Vercel.
