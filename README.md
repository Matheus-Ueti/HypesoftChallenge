# ShopSense — Frontend

Interface web do sistema de gestão de produtos ShopSense, desenvolvida em React 19 + TypeScript com foco em código limpo, tipagem estrita e boas práticas.

## Tecnologias

| Camada | Tecnologia |
|---|---|
| Framework | React 19 + TypeScript 5 + Vite 7 |
| Estilo | TailwindCSS 3 + shadcn/ui (new-york) |
| Requisições | Axios + TanStack Query 5 |
| Formulários | React Hook Form 7 + Zod 4 |
| Gráficos | Recharts 3 |
| Autenticação | Keycloak-js 26 |
| Roteamento | React Router DOM 7 |
| Testes | Vitest 4 + React Testing Library 16 |

## Estrutura

```
src/
  components/
    auth/        # ProtectedRoute
    charts/      # CategoryChart
    forms/       # CategoryForm, ProductForm
    layout/      # MainLayout, Header, Sidebar
    ui/          # Componentes shadcn/ui
  contexts/      # AuthContext
  hooks/         # useAuth, useProducts, useCategories
  lib/           # api (axios), keycloak, queryClient
  pages/         # Dashboard, Products, Categories, Settings
  services/      # productsService, categoriesService
  types/         # Product, Category, Auth
```

## Pré-requisitos

- Node.js 20+
- Backend rodando em `http://localhost:5000` (ver [shopsense-api](../))
- Keycloak rodando em `http://localhost:8080` (via Docker)

## Instalação

```bash
npm install
```

## Configuração

Copie o arquivo de exemplo e ajuste os valores se necessário:

```bash
cp .env.example .env
```

```env
VITE_API_URL=http://localhost:5000
VITE_KEYCLOAK_URL=http://localhost:8080
VITE_KEYCLOAK_REALM=shopsense
VITE_KEYCLOAK_CLIENT_ID=shopsense-frontend
```

> Em desenvolvimento, se o Keycloak não estiver disponível, o app libera o acesso automaticamente.

## Rodando

```bash
npm run dev
```

Acesse `http://localhost:5173`.

## Testes

```bash
npm test
```

## Infra (Docker)

O `docker-compose.yml` na raiz do repositório sobe MongoDB e Keycloak com o realm pré-configurado:

```bash
docker compose up -d
```

Usuários disponíveis após o boot:

| Usuário | Senha | Role |
|---|---|---|
| admin | Admin@123 | app-admin, app-user |
| user | User@123 | app-user |
