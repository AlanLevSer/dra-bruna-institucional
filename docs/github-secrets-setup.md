# Configurar GitHub Actions Secrets

## Guia Completo: SUPABASE_ACCESS_TOKEN

### Passo 1: Obter o Token do Supabase

1. **Acesse o Supabase Dashboard**
   - Vá para: https://supabase.com/dashboard/account/tokens
   - Faça login com sua conta Supabase

2. **Gerar Novo Token**
   - Clique em **"Generate new token"**
   - Nome sugerido: `GitHub Actions - Edge Functions Deploy`
   - **IMPORTANTE:** Copie o token imediatamente - ele só será mostrado uma vez!
   - Salve temporariamente em local seguro (gerenciador de senhas)

3. **Token Format**
   ```
   sbp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

### Passo 2: Configurar Secret no GitHub

1. **Acesse o Repositório**
   - Vá para: `https://github.com/SEU_USUARIO/SEU_REPO`

2. **Navegue até Settings**
   ```
   Repositório → Settings (aba superior direita)
   ```

3. **Acesse Secrets and Variables**
   ```
   Settings → Secrets and variables → Actions
   ```

4. **Adicionar Novo Secret**
   - Clique no botão verde **"New repository secret"**
   - **Name:** `SUPABASE_ACCESS_TOKEN` (exatamente assim, case-sensitive)
   - **Secret:** Cole o token copiado do Supabase
   - Clique em **"Add secret"**

### Passo 3: Verificar Configuração

✅ **Checklist de Verificação:**

- [ ] Token obtido do Supabase Dashboard
- [ ] Secret criado com nome exato: `SUPABASE_ACCESS_TOKEN`
- [ ] Token colado corretamente (sem espaços extras)
- [ ] Secret salvo com sucesso

### Passo 4: Testar Pipeline

#### Opção A: Fazer Push de Teste
```bash
# Adicione um comentário em qualquer função
echo "// Test deployment" >> supabase/functions/track/index.ts
git add supabase/functions/track/index.ts
git commit -m "test: trigger CI/CD pipeline"
git push origin main
```

#### Opção B: Executar Manualmente
1. Acesse **Actions** no GitHub
2. Selecione **"Edge Functions CI/CD"**
3. Clique em **"Run workflow"**
4. Selecione branch `main`
5. Clique em **"Run workflow"**

### Monitorar Execução

1. **Acesse Actions Tab**
   ```
   GitHub → Actions → Edge Functions CI/CD
   ```

2. **Clique na execução mais recente**
   - Você verá todos os jobs: Detect, Validate, Analyze, Deploy

3. **Logs Detalhados**
   - Clique em cada job para ver logs completos
   - Job "Deploy to Supabase" mostrará o status do deploy

### Troubleshooting

| Problema | Solução |
|----------|---------|
| ❌ "Invalid token" | Token expirado ou incorreto - gere novo no Supabase |
| ❌ "Secret not found" | Nome do secret incorreto - deve ser exatamente `SUPABASE_ACCESS_TOKEN` |
| ❌ "Project not found" | Verifique `project_id` em `supabase/config.toml` |
| ❌ "Permission denied" | Token precisa ter permissões de deploy de functions |

### Segurança

⚠️ **IMPORTANTE:**

- **NUNCA** compartilhe o token publicamente
- **NUNCA** faça commit do token no código
- Use apenas via GitHub Secrets
- Revogue tokens comprometidos imediatamente em: https://supabase.com/dashboard/account/tokens

### Links Úteis

- [Supabase Access Tokens](https://supabase.com/dashboard/account/tokens)
- [GitHub Secrets Documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Supabase CLI Documentation](https://supabase.com/docs/guides/cli)

---

## Visual Reference

### Supabase Dashboard - Generate Token
```
Dashboard → Account → Access Tokens → Generate new token
┌─────────────────────────────────────────┐
│ Token name: GitHub Actions Deploy      │
│ [Generate token]                        │
└─────────────────────────────────────────┘
```

### GitHub - Add Secret
```
Settings → Secrets and variables → Actions → New repository secret
┌─────────────────────────────────────────┐
│ Name: SUPABASE_ACCESS_TOKEN             │
│ Secret: sbp_xxxxxxxxxxxxx               │
│ [Add secret]                            │
└─────────────────────────────────────────┘
```

### Success Indicator
```
✅ Secret "SUPABASE_ACCESS_TOKEN" was added
   Updated: Just now
   [Update] [Remove]
```

---

## Após Configuração

Com o secret configurado, todo push para `main` que modificar arquivos em `supabase/functions/` disparará automaticamente:

1. ✅ Validação TypeScript
2. ✅ Análise de segurança
3. ✅ Deploy automático para Supabase
4. ✅ Logs disponíveis no GitHub Actions

**Pipeline completo e automatizado! 🚀**
