# 🧪 Rotas de Teste - Web EMQ Prospect

## 📋 Rotas Disponíveis para Teste

Agora que todas as páginas foram convertidas para a estrutura correta (lowercase + pasta + index.tsx), você pode testar todas as páginas através das seguintes rotas:

### 🏠 Páginas Principais

- **Login:** `/login`
- **Seleção de Empresa:** `/company-selection`

### 🧪 Páginas de Teste (Novas Estruturas)

#### 1. **Seleção de Empresa (Nova)**

- **URL:** `/test/company-selection-page`
- **Descrição:** Página de seleção de empresa com interface melhorada
- **Componente:** `CompanySelectionPage`

#### 2. **Declaração de Saúde**

- **URL:** `/test/health-declaration`
- **Descrição:** Formulário completo de declaração de saúde com múltiplas etapas
- **Componente:** `HealthDeclaration`

#### 3. **Agendamento de Entrevista**

- **URL:** `/test/schedule-interview`
- **Descrição:** Página para agendar entrevista médica
- **Componente:** `ScheduleInterview`

#### 4. **Assinatura de Contrato**

- **URL:** `/test/contract-signature`
- **Descrição:** Processo de assinatura de contrato com upload de documentos
- **Componente:** `ContractSignature`

#### 5. **Verificação Facial**

- **URL:** `/test/facial-verification`
- **Descrição:** Sistema de verificação facial com captura de foto
- **Componente:** `FacialVerification`

#### 6. **Aceitação de Proposta**

- **URL:** `/test/proposal-acceptance`
- **Descrição:** Página para aceitar propostas de contratação
- **Componente:** `ProposalAcceptance`

#### 7. **Seleção de Empresa (Original)**

- **URL:** `/test/company-selection`
- **Descrição:** Versão original da seleção de empresa
- **Componente:** `CompanySelection`

#### 8. **Beneficiários**

- **URL:** `/test/beneficiaries`
- **Descrição:** Gerenciamento de beneficiários
- **Componente:** `Beneficiaries`

#### 9. **Dashboard**

- **URL:** `/test/dashboard`
- **Descrição:** Dashboard principal do sistema
- **Componente:** `Dashboard`

#### 10. **Perfil**

- **URL:** `/test/profile`
- **Descrição:** Página de perfil do usuário
- **Componente:** `Profile`

#### 11. **Sucesso**

- **URL:** `/test/success`
- **Descrição:** Página de confirmação de sucesso
- **Componente:** `Success`

#### 12. **Login (Teste)**

- **URL:** `/test/login`
- **Descrição:** Página de login para testes
- **Componente:** `Login`

## 🚀 Como Testar

1. **Inicie o servidor de desenvolvimento:**

   ```bash
   npm run dev
   ```

2. **Acesse as rotas no navegador:**
   - Exemplo: `http://localhost:5173/test/health-declaration`

3. **Navegue entre as páginas:**
   - Use os links internos das páginas
   - Ou digite diretamente as URLs no navegador

## 📁 Estrutura de Arquivos

```
src/pages/
├── company-selection-page/
│   └── index.tsx ✅
├── health-declaration/
│   └── index.tsx ✅
├── schedule-interview/
│   └── index.tsx ✅
├── contract-signature/
│   └── index.tsx ✅
├── facial-verification/
│   └── index.tsx ✅
├── proposal-acceptance/
│   └── index.tsx ✅
├── company-selection/
│   └── index.tsx ✅
├── beneficiaries/
│   └── index.tsx ✅
├── dashboard/
│   └── index.tsx ✅
├── profile/
│   └── index.tsx ✅
└── public/
    ├── login/
    │   └── index.tsx ✅
    └── company-selection/
        └── index.tsx ✅
```

## ✅ Status

- **Build:** ✅ Funcionando perfeitamente
- **Nomenclatura:** ✅ 100% padronizada (lowercase)
- **Estrutura:** ✅ 100% consistente (pasta + index.tsx)
- **Imports:** ✅ 100% corrigidos
- **TypeScript:** ✅ Sem erros
- **Rotas:** ✅ Todas funcionando

## 🎯 Próximos Passos

1. **Teste todas as páginas** usando as rotas `/test/*`
2. **Verifique a navegação** entre as páginas
3. **Teste os formulários** e funcionalidades
4. **Reporte bugs** se encontrar algum problema
5. **Sugira melhorias** para a interface

---

**Data de Criação:** 20/12/2024  
**Status:** ✅ Pronto para Testes  
**Build:** ✅ Funcionando
