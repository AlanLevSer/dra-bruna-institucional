# Deploy Checklist & Automação Manual

Use esta sequência sempre que for publicar alterações no site ou em uma landing page. Ela evita problemas de acentuação, service worker e falhas de deploy.

## 1. Preparar o ambiente local

1. Certifique-se de que o editor está gravando arquivos em **UTF-8 sem BOM**.
2. Antes de commitar, execute:
   ```bash
   npm install
   npm run lint
   npm run build
   ```
   Se falhar, corrija antes de seguir.
3. Valide arquivos JSON críticos (ex.: `vercel.json`):
   ```bash
   node -e "JSON.parse(require('fs').readFileSync('vercel.json','utf8'))"
   ```

## 2. Revisar conteúdo e acentuação

- Execute as correções de acentuação **apenas** nos arquivos editados.
- Faça uma revisão visual (VS Code Preview ou browser) para garantir que não existem caracteres quebrados (`Ã`, `�`, etc).

## 3. Commit e Push

1. Verifique o status:
   ```bash
   git status
   ```
2. Commite apenas o que foi revisado.
3. Execute `git push origin main` **após** todas as validações acima.

## 4. Verificar build na Vercel

1. Acompanhe o dashboard da Vercel até o deploy ficar **Ready**.
2. Abra o log do deployment se houver qualquer falha.
3. Se houver erro de parse em `vercel.json`, valide o arquivo localmente conforme passo 1.

## 5. Testar no navegador (QA rápido)

Após o deploy ficar “Ready”:

1. Abra uma aba anônima com UTMs (ex.: `?utm_source=instagram...`).
2. No DevTools → Application → Service Workers, clique em **Unregister** e depois **Clear storage**. Isso garante que o bundle novo carregue.
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
6. Confirme que o pixel do Facebook e o GA/Clarity estão disparando (verificar no Network ou nas extensões de debug).

## 6. Registrar (opcional)

- Adicione observações no `docs/deploy-log.md` ou no dashboard interno caso algo fora da rotina aconteça.

Seguindo esse checklist, evitamos regressões nas rotas e os deploys chegam na Vercel sem surpresas.
