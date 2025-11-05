# Web EMQ Practitioner

Aplicação front-end para médicos/profissionais de saúde na plataforma EMQ, desenvolvida com tecnologias modernas para proporcionar uma experiência fluída e responsiva.

## Tecnologias

- **React 19** - Biblioteca para construção de interfaces
- **TypeScript** - Superset tipado do JavaScript
- **Vite** - Bundler e dev server rápido e moderno
- **Tailwind CSS 3** - Framework CSS utilitário para desenvolvimento rápido
- **React Query Kit** - Ferramenta para gerenciamento de estado do servidor
- **Redux Toolkit** - Gerenciamento de estado global
- **React Router 6** - Sistema de roteamento
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de dados e tipagem
- **Axios** - Cliente HTTP

## Estrutura do Projeto

```
web-emq-practitioner/
├── public/             # Arquivos estáticos
├── src/
│   ├── components/     # Componentes reutilizáveis
│   ├── hooks/          # Hooks personalizados
│   ├── lib/            # Utilitários e configurações de bibliotecas
│   ├── pages/          # Componentes de página
│   ├── routes/         # Configuração de rotas
│   ├── services/       # Serviços e APIs
│   │   ├── api.ts      # Configurações do Axios
│   │   ├── auth/       # Serviços de autenticação
│   │   ├── user/       # Serviços de usuário
│   │   └── appointment/# Serviços de agendamento
│   ├── store/          # Redux store e slices
│   ├── types/          # Definições de tipos e enums
│   └── utils/          # Funções utilitárias
├── .eslintrc.js        # Configuração ESLint
├── postcss.config.js   # Configuração PostCSS
├── tailwind.config.js  # Configuração Tailwind CSS
├── tsconfig.json       # Configuração TypeScript
└── vite.config.ts      # Configuração Vite
```

## Arquitetura

O projeto segue uma arquitetura de camadas bem definidas:

1. **Interface do Usuário**: Páginas e componentes React com Tailwind CSS
2. **Gerenciamento de Estado**:
   - Redux para estado global (autenticação, configurações)
   - React Query para estado do servidor (dados da API)
3. **Comunicação com API**: Axios com interceptors para autenticação
4. **Validação**: Zod para validação de dados e tipagem

## Início Rápido

### Pré-requisitos

- Node.js 18+
- Yarn ou NPM

### Instalação

```bash
# Instalar dependências
yarn install

# Iniciar servidor de desenvolvimento
yarn dev

# Gerar build para produção
yarn build

# Rodar testes
yarn test
```

## Características

- Autenticação com JWT
- Rotas protegidas
- Validação de formulários com Zod
- Cache e gerenciamento eficiente de dados com React Query
- Design responsivo com Tailwind CSS
- Tipagem completa com TypeScript

## Convenções e Padrões

- Componentes usando Function Components e hooks
- Nomes de arquivos em PascalCase para componentes
- Nomes de arquivos em camelCase para utilidades e hooks
- Uso de tipos em vez de interfaces (preferência)
- Estilização usando classes utilitárias do Tailwind
- Serviços organizados por domínio

## Fluxo de Desenvolvimento

1. Criar componentes reutilizáveis na pasta `components`
2. Desenvolver novas páginas na pasta `pages`
3. Definir tipos na pasta `types`
4. Implementar lógica de negócio nos serviços em `services`
5. Gerenciar estado global com Redux em `store`
