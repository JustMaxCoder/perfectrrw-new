# 🏗️ План реструктуризації проекту BHP PERFECT

## 📋 Поточна структура (Working)

```
bhp-perfect/
├── public/                 # Frontend (React + Vite)
│   ├── src/               # Код фронтенду
│   ├── uploads/           # Завантажені файли
│   └── index.html
├── server/                # Backend (Express)
│   ├── index.ts
│   ├── routes.ts
│   ├── storage.ts
│   └── vite.ts
├── shared/                # Спільні типи
│   └── schema.ts
├── docs/                  # Документація
├── scripts/               # Скрипти деплою
├── attached_assets/       # Статичні ресурси
└── конфіги (root)         # vite.config.ts, tsconfig.json...
```

## 🎯 Нова структура (Clean Architecture)

```
bhp-perfect/
│
├── apps/                           # Додатки (frontend + backend окремо)
│   ├── frontend/                   # Frontend модуль
│   │   ├── src/
│   │   │   ├── components/        # UI компоненти
│   │   │   │   ├── ui/           # Shadcn компоненти (30+ файлів)
│   │   │   │   ├── layout/       # Header, Footer
│   │   │   │   └── features/     # SearchBar, ProductCard
│   │   │   ├── pages/            # Сторінки (15 сторінок)
│   │   │   ├── hooks/            # Custom React hooks
│   │   │   ├── lib/              # Утиліти (queryClient, utils)
│   │   │   ├── config/           # Конфігурація (branding.ts)
│   │   │   ├── App.tsx           # Головний компонент + роутинг
│   │   │   ├── main.tsx          # Entry point
│   │   │   └── index.css         # Глобальні стилі
│   │   ├── public/               # Статичні файли
│   │   │   ├── favicon.svg
│   │   │   ├── robots.txt
│   │   │   └── index.html
│   │   ├── vite.config.ts        # Vite конфігурація
│   │   ├── tsconfig.json         # TypeScript для frontend
│   │   └── package.json          # Frontend dependencies (опціонально)
│   │
│   └── backend/                   # Backend модуль
│       ├── src/
│       │   ├── routes/           # API маршрути
│       │   │   ├── products.routes.ts
│       │   │   ├── orders.routes.ts
│       │   │   ├── gallery.routes.ts
│       │   │   └── index.ts
│       │   ├── controllers/      # Бізнес-логіка
│       │   │   ├── products.controller.ts
│       │   │   ├── orders.controller.ts
│       │   │   └── gallery.controller.ts
│       │   ├── services/         # Сервіси (data layer)
│       │   │   ├── storage.service.ts
│       │   │   └── database.service.ts
│       │   ├── middleware/       # Middleware
│       │   │   ├── upload.middleware.ts
│       │   │   ├── validation.middleware.ts
│       │   │   └── error.middleware.ts
│       │   ├── utils/            # Допоміжні функції
│       │   │   └── validators.ts
│       │   ├── config/           # Конфігурація
│       │   │   ├── app.config.ts
│       │   │   └── multer.config.ts
│       │   ├── vite.ts           # Vite middleware (dev)
│       │   └── index.ts          # Server entry point
│       ├── uploads/              # Завантажені файли
│       ├── tsconfig.json         # TypeScript для backend
│       └── package.json          # Backend dependencies (опціонально)
│
├── packages/                      # Shared пакети
│   ├── database/                 # Database модуль
│   │   ├── schema/              # Drizzle схеми
│   │   │   ├── products.schema.ts
│   │   │   ├── orders.schema.ts
│   │   │   ├── users.schema.ts
│   │   │   └── index.ts
│   │   ├── migrations/          # SQL міграції
│   │   │   └── 0000_*.sql
│   │   ├── seeds/               # Seed data
│   │   │   └── products.seed.ts
│   │   ├── drizzle.config.ts    # Drizzle конфігурація
│   │   └── index.ts             # DB connection
│   │
│   ├── shared/                   # Спільний код
│   │   ├── types/               # TypeScript типи
│   │   │   ├── product.types.ts
│   │   │   ├── order.types.ts
│   │   │   └── index.ts
│   │   ├── constants/           # Константи
│   │   │   ├── categories.ts
│   │   │   └── shipping.ts
│   │   ├── utils/               # Утиліти
│   │   │   └── validators.ts
│   │   └── index.ts
│   │
│   └── config/                   # Конфігурація
│       ├── env/                 # Environment variables
│       │   ├── .env.example
│       │   ├── .env.development
│       │   └── .env.production
│       ├── api/                 # API конфігурація
│       │   └── endpoints.ts
│       └── index.ts
│
├── public/                        # Загальні статичні ресурси
│   └── assets/                   # Зображення, логотипи
│       ├── hero-bhp.jpg
│       ├── category-*.jpg
│       └── generated_images/
│
├── docs/                          # Документація
│   ├── ARCHITECTURE.md           # Архітектура проекту
│   ├── API.md                    # API документація
│   ├── DATABASE.md               # База даних
│   ├── INSTALLATION.md           # Інструкція встановлення
│   ├── DEPLOYMENT.md             # Деплой
│   └── RESTRUCTURING_PLAN.md     # Цей документ
│
├── scripts/                       # Скрипти
│   ├── build/                    # Build скрипти
│   │   ├── build-frontend.sh
│   │   └── build-backend.sh
│   ├── deploy/                   # Deploy скрипти
│   │   ├── deploy_github.ps1
│   │   └── deploy_railway.sh
│   └── db/                       # Database скрипти
│       ├── migrate.ts
│       └── seed.ts
│
├── .github/                       # GitHub workflows
│   └── workflows/
│       └── ci-cd.yml
│
├── dist/                          # Build output (gitignored)
│   ├── frontend/
│   └── backend/
│
├── node_modules/                  # Dependencies (gitignored)
│
├── .gitignore
├── .env                          # Environment variables (gitignored)
├── .env.example                  # Приклад env
├── package.json                  # Root package.json (monorepo)
├── package-lock.json
├── tsconfig.json                 # Root TypeScript config
├── tailwind.config.ts            # Tailwind конфігурація
├── postcss.config.cjs            # PostCSS
├── eslint.config.cjs             # ESLint
├── components.json               # Shadcn/ui config
├── README.md                     # Головна документація
└── replit.nix                    # Replit environment
```

---

## 🔄 Мапінг файлів: Старе → Нове

### Frontend (public/ → apps/frontend/)

| Поточний шлях | Новий шлях | Причина |
|---------------|------------|---------|
| `public/src/components/**` | `apps/frontend/src/components/**` | Чистіша структура frontend |
| `public/src/pages/**` | `apps/frontend/src/pages/**` | Групування всіх сторінок |
| `public/src/hooks/**` | `apps/frontend/src/hooks/**` | Custom hooks разом |
| `public/src/lib/**` | `apps/frontend/src/lib/**` | Frontend утиліти |
| `public/src/config/**` | `apps/frontend/src/config/**` | Frontend конфігурація |
| `public/src/assets/**` | `apps/frontend/src/assets/**` | Локальні ресурси |
| `public/src/App.tsx` | `apps/frontend/src/App.tsx` | Головний компонент |
| `public/src/main.tsx` | `apps/frontend/src/main.tsx` | Entry point |
| `public/src/index.css` | `apps/frontend/src/index.css` | Глобальні стилі |
| `public/index.html` | `apps/frontend/public/index.html` | HTML шаблон |
| `public/favicon.svg` | `apps/frontend/public/favicon.svg` | Favicon |
| `public/robots.txt` | `apps/frontend/public/robots.txt` | SEO |

### Backend (server/ → apps/backend/)

| Поточний шлях | Новий шлях | Причина |
|---------------|------------|---------|
| `server/index.ts` | `apps/backend/src/index.ts` | Entry point сервера |
| `server/routes.ts` | `apps/backend/src/routes/*.routes.ts` | Розділити routes по модулях |
| `server/storage.ts` | `apps/backend/src/services/storage.service.ts` | Сервісний шар |
| `server/vite.ts` | `apps/backend/src/vite.ts` | Vite middleware |
| `public/uploads/*` | `apps/backend/uploads/*` | Завантажені файли належать backend |

### Database (shared/schema.ts → packages/database/)

| Поточний шлях | Новий шлях | Причина |
|---------------|------------|---------|
| `shared/schema.ts` | `packages/database/schema/*.schema.ts` | Розділити схеми по таблицях |
| Немає | `packages/database/migrations/` | SQL міграції |
| Немає | `packages/database/seeds/` | Seed data |
| `drizzle.config.ts` | `packages/database/drizzle.config.ts` | DB конфігурація |

### Shared (shared/ → packages/shared/)

| Поточний шлях | Новий шлях | Причина |
|---------------|------------|---------|
| `shared/schema.ts` (типи) | `packages/shared/types/**` | Тільки TypeScript типи |
| Немає | `packages/shared/constants/` | Категорії, константи |
| Немає | `packages/shared/utils/` | Загальні утиліти |

### Config (Root → packages/config/)

| Поточний шлях | Новий шлях | Причина |
|---------------|------------|---------|
| Немає | `packages/config/env/.env.example` | Приклад env |
| Немає | `packages/config/env/.env.development` | Dev environment |
| Немає | `packages/config/env/.env.production` | Prod environment |
| Немає | `packages/config/api/endpoints.ts` | API endpoints |

### Static Assets (attached_assets/ → public/assets/)

| Поточний шлях | Новий шлях | Причина |
|---------------|------------|---------|
| `attached_assets/**` | `public/assets/**` | Загальні статичні ресурси |

### Docs (docs/ → docs/)

| Поточний шлях | Новий шлях | Причина |
|---------------|------------|---------|
| `docs/ARCHITECTURE.md` | `docs/ARCHITECTURE.md` | ✅ Вже на місці |
| Немає | `docs/API.md` | Новий API документ |
| Немає | `docs/DATABASE.md` | Новий DB документ |
| Немає | `docs/INSTALLATION.md` | Новий інструкція |
| Немає | `docs/DEPLOYMENT.md` | Новий деплой гід |

### Scripts (scripts/ → scripts/)

| Поточний шлях | Новий шлях | Причина |
|---------------|------------|---------|
| `scripts/deploy_github.ps1` | `scripts/deploy/deploy_github.ps1` | Групування deploy скриптів |
| Немає | `scripts/build/build-frontend.sh` | Новий build скрипт |
| Немає | `scripts/build/build-backend.sh` | Новий build скрипт |
| Немає | `scripts/db/migrate.ts` | Новий міграція скрипт |
| Немає | `scripts/db/seed.ts` | Новий seed скрипт |

### Root конфіги (залишаються в root)

| Файл | Локація | Причина |
|------|---------|---------|
| `package.json` | Root | Monorepo управління |
| `tsconfig.json` | Root | Базова TypeScript конфігурація |
| `tailwind.config.ts` | Root | Загальна Tailwind конфігурація |
| `postcss.config.cjs` | Root | PostCSS конфігурація |
| `eslint.config.cjs` | Root | ESLint конфігурація |
| `components.json` | Root | Shadcn/ui конфігурація |
| `.gitignore` | Root | Git ignore |
| `README.md` | Root | Головна документація |

---

## ⚠️ Зміни в конфігураціях

### 1. vite.config.ts

**Було:**
```typescript
export default defineConfig({
  root: path.resolve(__dirname, "public"),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "public/src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
  },
});
```

**Стане:**
```typescript
// apps/frontend/vite.config.ts
export default defineConfig({
  root: path.resolve(__dirname, "."),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@shared": path.resolve(__dirname, "../../packages/shared"),
      "@database": path.resolve(__dirname, "../../packages/database"),
      "@assets": path.resolve(__dirname, "../../public/assets"),
    },
  },
  build: {
    outDir: path.resolve(__dirname, "../../dist/frontend"),
  },
});
```

### 2. tsconfig.json

**Було:**
```json
{
  "include": [
    "public/src/**/*",
    "shared/**/*",
    "server/**/*"
  ]
}
```

**Стане (Root):**
```json
{
  "extends": "./tsconfig.base.json",
  "references": [
    { "path": "./apps/frontend" },
    { "path": "./apps/backend" },
    { "path": "./packages/database" },
    { "path": "./packages/shared" }
  ]
}
```

**apps/frontend/tsconfig.json:**
```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@shared/*": ["../../packages/shared/*"],
      "@assets/*": ["../../public/assets/*"]
    }
  },
  "include": ["src/**/*"]
}
```

**apps/backend/tsconfig.json:**
```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "module": "ESNext",
    "target": "ESNext",
    "baseUrl": ".",
    "paths": {
      "@shared/*": ["../../packages/shared/*"],
      "@database/*": ["../../packages/database/*"]
    }
  },
  "include": ["src/**/*"]
}
```

### 3. package.json scripts

**Було:**
```json
{
  "scripts": {
    "dev": "cross-env NODE_ENV=development tsx server/index.ts & vite",
    "build": "vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist",
    "start": "cross-env NODE_ENV=production node dist/index.js"
  }
}
```

**Стане:**
```json
{
  "scripts": {
    "dev": "npm run dev:backend & npm run dev:frontend",
    "dev:frontend": "cd apps/frontend && vite",
    "dev:backend": "cross-env NODE_ENV=development tsx apps/backend/src/index.ts",
    
    "build": "npm run build:frontend && npm run build:backend",
    "build:frontend": "cd apps/frontend && vite build",
    "build:backend": "esbuild apps/backend/src/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist/backend",
    
    "start": "cross-env NODE_ENV=production node dist/backend/index.js",
    
    "db:generate": "drizzle-kit generate --config=packages/database/drizzle.config.ts",
    "db:push": "drizzle-kit push --config=packages/database/drizzle.config.ts",
    "db:studio": "drizzle-kit studio --config=packages/database/drizzle.config.ts",
    "db:migrate": "tsx scripts/db/migrate.ts",
    "db:seed": "tsx scripts/db/seed.ts"
  }
}
```

---

## 📦 Нові файли які треба створити

### 1. packages/database/schema/index.ts
Експортує всі схеми з окремих файлів

### 2. packages/shared/types/index.ts
Експортує всі типи

### 3. packages/config/env/.env.example
```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/bhp_perfect

# Server
PORT=5000
NODE_ENV=development

# Frontend
VITE_API_URL=http://localhost:5000/api
```

### 4. apps/backend/src/routes/index.ts
Імпортує та реєструє всі routes

### 5. scripts/db/migrate.ts
Скрипт для запуску міграцій

### 6. scripts/db/seed.ts
Скрипт для seed даних

---

## ✅ Переваги нової структури

### 1. **Чіткий розділ відповідальностей**
- Frontend не бачить backend код
- Backend не бачить frontend код
- Database - окремий пакет
- Shared - спільні типи/утиліти

### 2. **Легше масштабувати**
- Можна винести frontend в окремий репозиторій
- Можна винести backend в окремий репозиторій
- Можна додати мікросервіси

### 3. **Краща організація**
- Всі routes в одному місці
- Всі схеми БД в одному місці
- Всі типи в одному місці
- Всі конфіги в одному місці

### 4. **Легше тестувати**
- Кожен модуль можна тестувати окремо
- Мок-дані в seeds/
- Міграції відокремлені від коду

### 5. **Готово до monorepo**
- Можна легко перейти на pnpm workspaces
- Можна легко перейти на Nx/Turborepo
- Кожен пакет має свій package.json (опціонально)

---

## ⚠️ Важливо!

### Це велика реструктуризація!

**Що зламається після переміщення:**
1. ❌ Всі імпорти в frontend
2. ❌ Всі імпорти в backend
3. ❌ Vite конфігурація
4. ❌ TypeScript шляхи
5. ❌ Build скрипти

**Що треба буде зробити:**
1. ✅ Перемістити файли
2. ✅ Оновити vite.config.ts
3. ✅ Оновити tsconfig.json
4. ✅ Оновити package.json scripts
5. ✅ Оновити всі імпорти (автоматично через IDE)
6. ✅ Перевірити що все працює
7. ✅ Запустити тести
8. ✅ Задеплоїти

**Час на реструктуризацію:** ~2-4 години

---

## 🤔 Рекомендація

### Варіант 1: Повна реструктуризація (Clean Architecture)
✅ Ідеальна структура для продакшну
✅ Легко масштабувати
❌ Велика робота (2-4 години)
❌ Ризик зламати поточну роботу

### Варіант 2: Часткова реструктуризація (Hybrid)
✅ Покращити поточну структуру
✅ Менше роботи (30-60 хвилин)
✅ Менше ризиків
❌ Не так ідеально як Варіант 1

**Що робити в Варіанті 2:**
- Залишити `public/` та `server/` як є
- Розділити `server/routes.ts` на окремі файли
- Розділити `shared/schema.ts` на окремі схеми
- Створити `config/` папку з env файлами
- Створити додаткову документацію

### Варіант 3: Залишити як є
✅ Працює зараз
✅ Не треба нічого міняти
❌ Важче масштабувати в майбутньому

---

## 🎯 Що я рекомендую?

**Для MVP/Прототипу**: Варіант 3 або Варіант 2
**Для Production**: Варіант 1

Якщо ви хочете щоб я зробив реструктуризацію, скажіть який варіант вибираєте і я почну роботу! 🚀
