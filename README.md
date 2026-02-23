# Senior Floors LVP Landing Page

Landing page focada em conversão para venda de **LVP (Luxury Vinyl Plank)** + instalação. Mesmo padrão visual da LP e do Sistema Senior Floors.

## Stack

- **Next.js** (App Router, SSR)
- **React** + TypeScript
- **TailwindCSS**
- **PostgreSQL** + **Prisma**
- JWT para painel admin

## Setup

1. **Clone e dependências**
   ```bash
   cd senior-floors-lvp
   npm install
   ```

2. **Variáveis de ambiente**
   - Copie `env.example` para `.env`
   - Defina `DATABASE_URL` (PostgreSQL) e `JWT_SECRET`

3. **Banco de dados**
   ```bash
   npx prisma db push
   npm run db:seed
   ```
   O seed cria um admin padrão (`admin@seniorfloors.com` / `admin123`) e opcionalmente um produto LVP de exemplo. Para customizar: `ADMIN_EMAIL` e `ADMIN_PASSWORD`.

4. **Rodar**
   - **Na raiz do repositório** (para não conflitar com o sistema CRM na porta 3000):
     ```bash
     npm run lvp
     ```
   - **Ou dentro desta pasta:**
     ```bash
     cd senior-floors-lvp
     npm run dev
     ```
   - **Nova LP:** http://localhost:3001  
   - **Admin:** http://localhost:3001/admin (login com o usuário do seed)

## Estrutura

- `src/app/` – Páginas e API routes (Next.js App Router)
- `src/components/` – Hero, Benefits, Catalog, Calculator, LeadForm, SocialProof, StickyCTA
- `src/modules/` – Lógica por domínio: `lvp`, `leads`, `calculator`, `admin`
- `prisma/` – Schema (LVPProduct, Lead, AdminUser, SiteConfig) e seed

## Admin

- **Login:** `/admin`
- **Dashboard:** produtos, leads, config
- **Produtos:** CRUD LVP, ativar/desativar
- **Leads:** listagem e export CSV
- **Config:** labor rate ($/sqft) usado na calculadora

## Design

- Cores alinhadas à LP/Site: primary `#1a2036`, secondary `#d6b598`, fundos neutros
- Mobile first, CTAs fixos (Call Now + Get Free Estimate)
- Pronto para GTM/Meta (incluir scripts no layout conforme necessidade)

## Deploy

- **Node:** Next.js 16 requer Node >= 20.9. Use `nvm use 20` ou atualize o Node.
- Build: `npm run build` (roda `prisma generate` antes)
- Definir `DATABASE_URL` e `JWT_SECRET` no ambiente de produção
