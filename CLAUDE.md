# Café del Roble — Ecommerce

## Stack
- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 + componentes UI propios (estilo shadcn)
- Prisma 7 + PostgreSQL (con `@prisma/adapter-pg`)
- NextAuth.js v5 (beta)
- Stripe (API version: `2026-05-27.dahlia`)
- Cloudinary + Zustand + React Query + Sonner

## Estructura principal
```
src/
├── app/
│   ├── (store)/         # Tienda pública: home, productos, carrito, checkout
│   ├── (auth)/          # Login, registro
│   ├── (dashboard)/     # Panel admin (requiere rol ADMIN)
│   └── api/             # Route handlers: auth, checkout/stripe, webhooks, admin/*
├── components/
│   ├── ui/              # Button, Input, Badge, Card, Sheet, Select, etc.
│   ├── layout/          # Navbar, Footer
│   ├── home/            # Secciones de la landing page
│   ├── product/         # ProductCard, ProductDetail, ProductsGrid, Filters
│   ├── cart/            # CartPageClient
│   ├── checkout/        # CheckoutPageClient
│   ├── auth/            # LoginForm, RegisterForm
│   └── dashboard/       # Sidebar, Header, OrderStatusUpdater, DeleteProductButton
├── lib/                 # prisma.ts, auth.ts, stripe.ts, cloudinary.ts, utils.ts
├── store/               # cart-store.ts (Zustand con persistencia localStorage)
├── validators/          # auth.ts, product.ts, order.ts (Zod)
├── types/               # index.ts, next-auth.d.ts
├── providers/           # SessionProvider, QueryProvider
└── generated/prisma/    # Cliente Prisma generado (NO editar)
```

## Notas críticas de arquitectura

### Prisma 7 (breaking change)
Requiere adapter explícito. Ver `src/lib/prisma.ts`:
```ts
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });
```
Importar siempre desde `@/generated/prisma/client` (NO `@prisma/client`).

### Next.js 16 (breaking change)
- `fetch` requests NO se cachean por defecto. Usar `use cache` para cachear.
- Usar `refresh()` desde `next/cache` para refrescar UI después de mutaciones.
- `params` y `searchParams` son `Promise<>` en Next.js 16 — siempre `await params`.

### Tailwind CSS v4
- Sintaxis: `@import "tailwindcss"` (NO directivas `@tailwind base/components/utilities`)
- Tokens con `@theme inline { ... }`

### Stripe API
Versión: `2026-05-27.dahlia`

### Zod v4
Usar `.issues` en lugar de `.errors` al acceder a errores de validación.

## Comandos principales
```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run db:generate  # Generar cliente Prisma
npm run db:push      # Sincronizar schema con BD
npm run db:migrate   # Migración con historial
npm run db:seed      # Poblar datos de prueba
npm run db:studio    # Prisma Studio (GUI)
```

## Variables de entorno requeridas
Ver `.env.example` para la lista completa.
Credenciales a configurar: DATABASE_URL, AUTH_SECRET, AUTH_GOOGLE_ID/SECRET, STRIPE_SECRET_KEY, CLOUDINARY_*.

## Roles de usuario
- `CUSTOMER` (default): acceso a tienda, perfil, pedidos
- `ADMIN`: acceso completo incluyendo `/dashboard/*`

## Rutas protegidas (middleware)
- `/dashboard/*` → requiere sesión + rol ADMIN
- `/perfil`, `/pedidos` → requiere sesión
- `/auth/*` → redirige si ya autenticado
