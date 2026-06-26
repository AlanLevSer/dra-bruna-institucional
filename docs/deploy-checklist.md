# Deploy Checklist & Automação Guiada

Use esta sequência sempre que for publicar alterações no site ou em uma landing page. O objetivo é garantir um fluxo rastreável entre desenvolvimento local, CI, preview, produção e smoke test.

## 1. Fluxo normal de desenvolvimento

O fluxo padrão deve seguir esta ordem:

1. alteração local;
2. validação local;
3. commit;
4. push da branch;
5. PR;
6. preview Vercel;
7. QA em preview;
8. merge para a branch de produção;
9. deploy de produção;
10. smoke test pós-produção.

Regra principal:

- produção deve sair de um commit rastreável;
- evite publicar produção direto de uma árvore local não commitada;
- preview Vercel deve ser a base de QA antes de produção sempre que possível.

## 2. Preparar o ambiente local

1. Confirme que o editor salva arquivos em **UTF-8 sem BOM**.
2. Execute a verificação automatizada:
   ```bash
   npm install
   npm run deploy:check
   ```
   O script roda lint, type-check, build, validação do `vercel.json`, inspeção das rotas e outras checagens que já evitaram falhas de produção.
3. Se precisar rodar o fluxo manualmente, siga a ordem:
   ```bash
   npm run lint
   npm run type-check
   npm run build
   node -e "JSON.parse(require('fs').readFileSync('vercel.json','utf8'))"
   ```
4. Antes de pensar em produção, audite o estado local:
   ```bash
   git status --short
   git diff --stat
   git diff --name-status
   ```
5. O working tree deve estar limpo ou com diff explicitamente auditado.

## 3. Revisar conteúdo, rotas e escopo

- Limite as correções de acentuação **aos arquivos realmente editados**.
- Faça revisão visual para garantir que não existem caracteres quebrados (`�`, `?`, etc.).
- Evite nomes de arquivos e rotas com acentuação. Use apenas caracteres ASCII; se precisar de fallback, trate via redirects.
- Commits devem ter escopo claro.
- Evite misturar patch técnico de tracking, QA temporário e alterações de copy no mesmo commit.
- Não commite `.env`, `.env.*`, `.vercel`, `dist`, logs, prints ou scripts temporários não planejados.

## 4. Commit, push e PR

1. Commite apenas o que já passou nas validações locais.
2. Faça push da branch de trabalho.
3. Abra ou atualize o PR.
4. Use o preview Vercel do PR ou da branch como base para QA.

Regra de governança:

- o estado que vai para produção deve estar representado em commit;
- se um hotfix precisar ser publicado antes do commit, isso é exceção e deve ser regularizado imediatamente depois.

## 5. CI/CD atual

O pipeline atual do projeto web está em:

- `.github/workflows/ci.yml`

Hoje o CI deve validar, no mínimo:

- instalação de dependências;
- lint;
- type-check;
- build;
- análise básica de bundle.

Observação:

- o CI é uma barreira de qualidade, mas não substitui QA funcional em preview;
- preview Vercel continua sendo a referência para validação manual antes de produção.

## 6. Checklist de Vercel e variáveis de ambiente

Antes de publicar preview ou produção:

1. confirme o projeto e ambiente corretos na Vercel;
2. valide se as envs necessárias estão configuradas no ambiente certo;
3. confirme que secrets não aparecem no bundle client;
4. acompanhe o dashboard até o deployment ficar **Ready**.

Regras para envs sensíveis:

- configure valores sensíveis diretamente na Vercel;
- nunca cole secrets em chat, logs, commit ou documentação;
- nunca exponha webhooks ou tokens em screenshots ou relatórios.

Para o fluxo LeadChat/CORS:

- `MAKE_LEAD_WEBHOOK_URL` é obrigatória em Preview e Production quando `/api/lead` estiver ativo;
- `MAKE_LEAD_EVENT_WEBHOOK_URL` é opcional;
- `MAKE_LEAD_EVENT_WEBHOOK_URL` só deve ser configurada quando existir um cenário separado para eventos auxiliares;
- nunca aponte `MAKE_LEAD_EVENT_WEBHOOK_URL` para o webhook principal de criação de lead.

## 7. Checklist antes de produção

Execute e revise:

```bash
git status --short
git diff --stat
git diff --name-status
npm run type-check
npm run build
```

Se a mudança envolver integrações, tracking ou endpoints:

```bash
rg "hook\.eu2\.make\.com|MAKE_LEAD_WEBHOOK_URL|MAKE_LEAD_EVENT_WEBHOOK_URL" dist
```

Critérios:

- `type-check` deve passar;
- `build` deve passar;
- a busca no `dist` não deve expor webhook ou env sensível no client;
- as envs necessárias devem estar configuradas no ambiente correto da Vercel.

## 8. Checklist de QA em preview

Depois que o preview estiver **Ready**:

1. abra uma aba anônima com UTMs de teste;
2. no DevTools → Application → Service Workers, clique em **Unregister** e depois **Clear storage** quando necessário;
3. teste as rotas P0 e as rotas alteradas no patch;
4. observe console e network;
5. valide tracking e integrações externas.

Se o patch envolver LeadChat, proxy same-origin ou envio de lead:

- validar `POST /api/lead`;
- validar `POST /api/lead-event`;
- validar ausência de chamada client direta para `hook.eu2.make.com`;
- validar ausência de CORS relacionado ao Make;
- validar abertura do WhatsApp com `protocol_id`;
- validar chegada do lead no Kommo;
- validar UTMs e IDs de mídia:
  - `utm_source`
  - `utm_medium`
  - `utm_campaign`
  - `utm_content`
  - `utm_term`
  - `gclid`
  - `gclientid`
  - `ga_utm`
  - `utm_referrer`

## 9. Produção

Fluxo recomendado:

1. aprovar o preview;
2. garantir que o estado aprovado está em commit e branch rastreável;
3. fazer merge pelo fluxo normal;
4. deixar a produção sair pelo caminho padrão do repositório/Vercel.

Regra de produção:

- produção deve sair de commit rastreável;
- evitar `vercel --prod` direto de árvore local não commitada;
- se `vercel --prod` for usado, deve ser tratado como exceção operacional ou hotfix crítico.

Se houver exceção via CLI:

1. documente o motivo;
2. faça smoke test completo;
3. crie o commit imediatamente depois;
4. registre o hash do commit que representa o estado publicado.

## 10. Smoke test pós-produção

Depois do deploy em produção:

1. testar pelo menos 1 landing P0 relevante;
2. testar 1 página institucional ou homepage se usar o mesmo componente crítico;
3. usar UTMs de QA quando fizer sentido;
4. observar network, console e comportamento do usuário final.

Se o patch envolver LeadChat ou captura de lead:

- validar `POST /api/lead` com `2xx`;
- validar `POST /api/lead-event` no comportamento esperado;
- validar chegada no Kommo;
- validar WhatsApp com `protocol_id`;
- validar ausência de CORS relacionado ao Make;
- validar que o browser não chama o webhook Make diretamente.

## 11. Hotfix excepcional

Deploy direto via Vercel CLI só deve acontecer quando houver risco operacional relevante, por exemplo:

- incidente em produção;
- quebra de captação;
- regressão crítica em rota principal;
- falha que impeça o fluxo comercial essencial.

Nesse caso:

1. documente a exceção;
2. publique apenas o mínimo necessário;
3. execute smoke test logo após;
4. crie o commit posterior imediato;
5. registre o hash que representa o estado publicado.

## 12. Registrar

- Adicione observações no `docs/deploy-log.md` ou no sistema interno quando houver exceção, incidente, rollback ou hotfix.
- Se algo fugir do fluxo normal, registre o motivo, o ambiente afetado e o commit correspondente.

Seguindo este checklist, o deploy do site e das landing pages fica mais previsível, auditável e seguro na Vercel.
