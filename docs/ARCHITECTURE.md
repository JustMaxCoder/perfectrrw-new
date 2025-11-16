# 🏗️ Архітектура проекту BHP PERFECT

## 📋 Зміст
1. [Огляд проекту](#огляд-проекту)
2. [Frontend](#1-frontend)
3. [Backend](#2-backend)
4. [База даних](#3-база-даних)
5. [Структура файлів](#4-структура-файлів-проекту)
6. [Deployment](#5-deployment-хостинг)
7. [Технології та рекомендації](#6-технології-та-рекомендації)

---

## Огляд проекту

**BHP PERFECT** - це повнофункціональний e-commerce магазин професійного одягу та засобів індивідуального захисту (BHP).

### Ключові характеристики:
- **Тип проекту**: Full-stack монорепозиторій
- **Архітектура**: Monolithic (Frontend + Backend в одному репозиторії)
- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Node.js + Express + TypeScript
- **База даних**: PostgreSQL + Drizzle ORM
- **Стилізація**: Tailwind CSS + Shadcn/ui
- **Деплой**: Replit Autoscale (рекомендовано Vercel/Railway для продакшну)

---

## 1. Frontend

### 🎨 Технологічний стек

```json
{
  "framework": "React 18",
  "language": "TypeScript",
  "bundler": "Vite 7.1.10",
  "routing": "Wouter",
  "state": "React Query (TanStack Query v5)",
  "styling": "Tailwind CSS + Shadcn/ui",
  "forms": "React Hook Form + Zod",
  "icons": "Lucide React"
}
```

### 📁 Структура Frontend

```
public/
├── src/
│   ├── components/          # UI компоненти
│   │   ├── ui/             # Базові Shadcn компоненти
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── form.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── select.tsx
│   │   │   └── ... (30+ компонентів)
│   │   ├── Header.tsx      # Хедер з навігацією
│   │   ├── Footer.tsx      # Футер
│   │   ├── SearchBar.tsx   # Пошукова панель
│   │   ├── ProductCard.tsx # Картка товару
│   │   └── PromoBanner.tsx # Промо-банер
│   │
│   ├── pages/              # Сторінки додатку
│   │   ├── Home.tsx        # Головна сторінка
│   │   ├── Shop.tsx        # Каталог товарів
│   │   ├── ProductDetail.tsx # Деталі товару
│   │   ├── Cart.tsx        # Кошик
│   │   ├── Checkout.tsx    # Оформлення замовлення
│   │   ├── Favorites.tsx   # Обрані товари
│   │   ├── AdminPanel.tsx  # Адмін-панель
│   │   ├── Dashboard.tsx   # Дашборд
│   │   ├── OrderHistory.tsx # Історія замовлень
│   │   ├── TrackOrder.tsx  # Відстеження замовлення
│   │   ├── About.tsx       # Про нас
│   │   ├── Contact.tsx     # Контакти
│   │   ├── Gallery.tsx     # Галерея
│   │   └── not-found.tsx   # 404 сторінка
│   │
│   ├── hooks/              # Custom React hooks
│   │   └── use-toast.ts
│   │
│   ├── lib/                # Утиліти
│   │   ├── queryClient.ts  # React Query конфігурація
│   │   └── utils.ts        # Допоміжні функції
│   │
│   ├── App.tsx             # Головний компонент + роутинг
│   ├── main.tsx            # Точка входу
│   └── index.css           # Глобальні стилі + CSS змінні
│
├── uploads/                # Завантажені файли (картинки товарів)
└── index.html              # HTML шаблон
```

### 🛣️ Маршрутизація (Routes)

| Маршрут | Компонент | Опис |
|---------|-----------|------|
| `/` | Home | Головна сторінка |
| `/sklep` | Shop | Каталог товарів (+ фільтри по категоріях) |
| `/sklep?category=odziez-robocza` | Shop | Фільтр по категорії |
| `/produkt/:id` | ProductDetail | Деталі товару |
| `/koszyk` | Cart | Кошик покупок |
| `/zamowienie` | Checkout | Оформлення замовлення |
| `/ulubione` | Favorites | Обрані товари (localStorage) |
| `/admin` | AdminPanel | Адмін-панель (управління товарами) |
| `/dashboard` | Dashboard | Статистика |
| `/zamowienia` | OrderHistory | Історія замовлень |
| `/sledzenie` | TrackOrder | Відстеження замовлення |
| `/o-nas` | About | Про компанію |
| `/kontakt` | Contact | Контактна інформація |
| `/galeria` | Gallery | Фотогалерея |

### 🎯 Основні функції Frontend

1. **Каталог товарів**
   - Фільтрація по категоріях, ціні, наявності
   - Сортування (ціна, назва, популярність)
   - Перегляд (сітка/список)
   - Пошук з автодоповненням

2. **Товар**
   - Деталі товару з галереєю зображень
   - Вибір розміру (якщо є)
   - Додавання в кошик/обране
   - Відгуки клієнтів

3. **Кошик та Checkout**
   - Управління кількістю товарів
   - Розрахунок вартості
   - Форма оформлення замовлення
   - Валідація через Zod

4. **Адмін-панель**
   - CRUD операції з товарами
   - Завантаження фото (Multer)
   - Управління розмірами та складом
   - Перегляд замовлень

5. **Обрані товари**
   - Збереження в localStorage
   - Швидке додавання в кошик

### 📦 Збірка та деплой Frontend

```bash
# Development
npm run dev          # Запуск dev сервера (Vite)

# Production Build
npm run build        # Збірка в dist/public/

# Preview
npm run preview      # Перегляд production збірки
```

**Рекомендації по деплою:**
- **Vercel** - ідеально для React + Vite (безкоштовний SSL, CDN)
- **Netlify** - альтернатива з подібними можливостями
- **Cloudflare Pages** - дуже швидкий CDN
- **GitHub Pages** - для статичного контенту (потрібен роутинг fallback)

---

## 2. Backend

### ⚙️ Технологічний стек

```json
{
  "runtime": "Node.js 20",
  "framework": "Express 4.x",
  "language": "TypeScript",
  "orm": "Drizzle ORM",
  "database": "PostgreSQL (Neon)",
  "fileUpload": "Multer",
  "validation": "Zod",
  "sessions": "express-session + connect-pg-simple"
}
```

### 📁 Структура Backend

```
server/
├── index.ts         # Точка входу сервера
├── routes.ts        # API маршрути + middleware
├── storage.ts       # Інтерфейс роботи з даними (IStorage)
└── vite.ts          # Vite middleware (dev режим)
```

### 🔌 API Endpoints

#### **Products (Товари)**

| Method | Endpoint | Опис |
|--------|----------|------|
| GET | `/api/products` | Отримати всі товари |
| GET | `/api/products/search?q=query` | Пошук товарів (8 результатів) |
| GET | `/api/products/:id` | Отримати товар з розмірами |
| POST | `/api/products` | Створити товар (+ multer upload) |
| PUT | `/api/products/:id` | Оновити товар |
| DELETE | `/api/products/:id` | Видалити товар |
| PATCH | `/api/products/bulk-stock` | Масове оновлення складу |
| POST | `/api/products/:id/photo` | Завантажити фото |
| DELETE | `/api/products/:productId/photos/:photoIndex` | Видалити фото |

#### **Sizes (Розміри)**

| Method | Endpoint | Опис |
|--------|----------|------|
| GET | `/api/sizes` | Отримати всі розміри |
| POST | `/api/products/:id/sizes` | Додати розмір до товару |
| PATCH | `/api/products/:id/sizes/:sizeId` | Оновити склад розміру |
| DELETE | `/api/products/:id/sizes/:sizeId` | Видалити розмір з товару |

#### **Orders (Замовлення)**

| Method | Endpoint | Опис |
|--------|----------|------|
| POST | `/api/orders` | Створити замовлення |
| GET | `/api/orders` | Отримати всі замовлення |
| PATCH | `/api/orders/:id/status` | Оновити статус замовлення |

#### **Gallery (Галерея)**

| Method | Endpoint | Опис |
|--------|----------|------|
| GET | `/api/gallery` | Отримати всі зображення галереї |
| POST | `/api/gallery` | Завантажити зображення |
| DELETE | `/api/gallery/:id` | Видалити зображення |

#### **Settings (Налаштування)**

| Method | Endpoint | Опис |
|--------|----------|------|
| GET | `/api/settings` | Отримати всі налаштування |
| GET | `/api/settings/:key` | Отримати налаштування по ключу |
| PUT | `/api/settings/:key` | Оновити налаштування |

#### **Reviews (Відгуки)**

| Method | Endpoint | Опис |
|--------|----------|------|
| GET | `/api/products/:productId/reviews` | Отримати відгуки товару |
| POST | `/api/products/:productId/reviews` | Створити відгук |
| DELETE | `/api/reviews/:id` | Видалити відгук |

### 🔐 Безпека та валідація

1. **Валідація даних**
   - Zod схеми для всіх InsertSchemas
   - Перевірка типів файлів (file-type library)
   - Обмеження розміру файлів (5MB)

2. **Завантаження файлів**
   - Multer з diskStorage
   - Валідація MIME типів: `jpeg|jpg|png|gif|webp`
   - Унікальні імена файлів: `timestamp-nanoid.ext`
   - Збереження в `public/uploads/`

3. **Обробка помилок**
   - Try-catch блоки для всіх endpoint'ів
   - Структуровані помилки з деталями
   - HTTP статус коди (200, 201, 400, 404, 500)

### 📊 Storage Layer (Абстракція даних)

**IStorage Interface** - уніфікований інтерфейс роботи з даними:

```typescript
interface IStorage {
  // Products
  getAllProducts(): Promise<Product[]>
  getProduct(id: string): Promise<Product | undefined>
  createProduct(product: InsertProduct): Promise<Product>
  updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product>
  deleteProduct(id: string): Promise<void>
  
  // Sizes
  getAllSizes(): Promise<Size[]>
  addProductSize(productId: string, sizeId: string, stock: number): Promise<ProductSize>
  
  // Orders
  createOrder(order: InsertOrder): Promise<Order>
  getAllOrders(): Promise<Order[]>
  
  // Gallery, Settings, Reviews...
}
```

**Переваги:**
- Легко перейти з MemStorage на DatabaseStorage
- Тестування через mock storage
- Чистий код в routes.ts

### 🚀 Запуск Backend

```bash
# Development (з автоперезавантаженням)
npm run dev

# Production
npm run build     # Збірка TypeScript
npm run start     # Запуск з dist/
```

**Деплой рекомендації:**
- **Railway** - простий PostgreSQL + Node.js деплой
- **Render** - безкоштовний tier для стартапів
- **DigitalOcean App Platform** - масштабування
- **VPS (Ubuntu)** - повний контроль (nginx + pm2)
- **Docker** - контейнеризація для будь-якого хостингу

---

## 3. База даних

### 🗄️ Технології

- **СУБД**: PostgreSQL 14+ (використовується Neon Serverless)
- **ORM**: Drizzle ORM + drizzle-kit
- **Міграції**: `drizzle-kit generate` + `npm run db:push`
- **Валідація**: Zod (drizzle-zod для створення схем)

### 📊 Схема таблиць

#### **users** - Користувачі
```sql
CREATE TABLE users (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  is_admin BOOLEAN NOT NULL DEFAULT false
);
```

#### **products** - Товари
```sql
CREATE TABLE products (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  image VARCHAR(1000) NOT NULL,
  additional_images VARCHAR(5000),
  available BOOLEAN DEFAULT true NOT NULL,
  shipping VARCHAR(50) DEFAULT 'standard' NOT NULL,
  category TEXT NOT NULL,
  stock INTEGER DEFAULT 0 NOT NULL,
  popularity INTEGER DEFAULT 0 NOT NULL,
  has_sizes BOOLEAN DEFAULT false NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL
);
```

#### **sizes** - Розміри
```sql
CREATE TABLE sizes (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  display_order INTEGER DEFAULT 0 NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL
);
```

#### **product_sizes** - Зв'язок товарів та розмірів
```sql
CREATE TABLE product_sizes (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id VARCHAR NOT NULL,
  size_id VARCHAR NOT NULL,
  stock INTEGER DEFAULT 0 NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL
);
```

#### **orders** - Замовлення
```sql
CREATE TABLE orders (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_address TEXT NOT NULL,
  items TEXT NOT NULL,  -- JSON string
  total NUMERIC(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' NOT NULL,
  created_at TEXT NOT NULL
);
```

#### **gallery** - Галерея
```sql
CREATE TABLE gallery (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  filename TEXT NOT NULL,
  path TEXT NOT NULL,
  uploaded_at TEXT NOT NULL
);
```

#### **settings** - Налаштування
```sql
CREATE TABLE settings (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL
);
```

#### **reviews** - Відгуки
```sql
CREATE TABLE reviews (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id VARCHAR NOT NULL,
  user_id VARCHAR,
  customer_name TEXT NOT NULL,
  rating INTEGER NOT NULL,
  comment TEXT NOT NULL,
  created_at TEXT NOT NULL
);
```

#### **wishlist** - Обрані товари
```sql
CREATE TABLE wishlist (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR NOT NULL,
  product_id VARCHAR NOT NULL,
  created_at TEXT NOT NULL
);
```

### 🔗 Зв'язки (Relationships)

```
users (1) ─────< (N) orders
users (1) ─────< (N) wishlist
users (1) ─────< (N) reviews

products (1) ───< (N) product_sizes  >─── (1) sizes
products (1) ───< (N) reviews
products (1) ───< (N) wishlist

orders.items = JSON array of { productId, name, quantity, price }
```

### 📈 Індекси та оптимізація

**Рекомендовані індекси:**
```sql
-- Products
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_available ON products(available);
CREATE INDEX idx_products_created_at ON products(created_at);

-- Product Sizes
CREATE INDEX idx_product_sizes_product_id ON product_sizes(product_id);
CREATE INDEX idx_product_sizes_size_id ON product_sizes(size_id);

-- Orders
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);

-- Reviews
CREATE INDEX idx_reviews_product_id ON reviews(product_id);

-- Wishlist
CREATE INDEX idx_wishlist_user_id ON wishlist(user_id);
CREATE INDEX idx_wishlist_product_id ON wishlist(product_id);
```

### 🔌 Підключення БД до Backend

**Файл**: `shared/schema.ts`
```typescript
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString);
export const db = drizzle(client);
```

**Міграції**:
```bash
# Генерація міграцій
npm run db:generate

# Застосування міграцій (force push)
npm run db:push --force

# Drizzle Studio (GUI для БД)
npm run db:studio
```

### 💾 Поточна реалізація

**Зараз використовується**: MemStorage (in-memory)
- Швидке прототипування
- Не потрібна БД для розробки
- Дані губляться при перезапуску

**Для продакшну треба**:
- Створити DatabaseStorage клас
- Реалізувати IStorage з Drizzle ORM
- Налаштувати PostgreSQL на хостингу
- Запустити міграції

---

## 4. Структура файлів проекту

### 📂 Повна структура монорепозиторію

```
bhp-perfect/
│
├── public/                     # Frontend (React + TypeScript)
│   ├── src/
│   │   ├── components/         # UI компоненти
│   │   │   ├── ui/            # Shadcn базові компоненти (30+ файлів)
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   └── PromoBanner.tsx
│   │   │
│   │   ├── pages/             # Сторінки додатку (15 сторінок)
│   │   │   ├── Home.tsx
│   │   │   ├── Shop.tsx
│   │   │   ├── ProductDetail.tsx
│   │   │   ├── Cart.tsx
│   │   │   ├── Checkout.tsx
│   │   │   ├── Favorites.tsx
│   │   │   ├── AdminPanel.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── OrderHistory.tsx
│   │   │   ├── TrackOrder.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Contact.tsx
│   │   │   ├── Gallery.tsx
│   │   │   └── not-found.tsx
│   │   │
│   │   ├── hooks/             # Custom hooks
│   │   │   └── use-toast.ts
│   │   │
│   │   ├── lib/               # Утиліти
│   │   │   ├── queryClient.ts
│   │   │   └── utils.ts
│   │   │
│   │   ├── App.tsx            # Роутинг + Layout
│   │   ├── main.tsx           # React root
│   │   └── index.css          # Глобальні стилі + CSS vars
│   │
│   ├── uploads/               # Завантажені картинки
│   └── index.html             # HTML entry point
│
├── server/                    # Backend (Express + TypeScript)
│   ├── index.ts              # Сервер entry point
│   ├── routes.ts             # API endpoints
│   ├── storage.ts            # Data layer (IStorage)
│   └── vite.ts               # Vite dev middleware
│
├── shared/                    # Спільний код (Frontend + Backend)
│   └── schema.ts             # Drizzle схеми + Zod типи
│
├── docs/                      # Документація
│   ├── ARCHITECTURE.md       # Ця документація
│   └── API.md                # API специфікація
│
├── migrations/                # SQL міграції (Drizzle)
│   └── 0000_*.sql
│
├── attached_assets/           # Статичні ресурси (логотипи, картинки)
│   ├── hero-bhp.jpg
│   ├── workwear-jacket.jpg
│   └── ...
│
├── .local/                    # Локальні налаштування Replit
│   └── state/replit/agent/
│       └── progress_tracker.md
│
├── dist/                      # Build output (production)
│   ├── public/               # Frontend build
│   └── server/               # Backend build
│
├── node_modules/              # Dependencies (734 packages)
│
├── .gitignore
├── package.json               # Dependencies + Scripts
├── package-lock.json
├── tsconfig.json              # TypeScript конфігурація
├── vite.config.ts             # Vite налаштування
├── tailwind.config.ts         # Tailwind конфігурація
├── drizzle.config.ts          # Drizzle ORM конфігурація
├── postcss.config.js          # PostCSS
├── components.json            # Shadcn/ui config
├── README.md                  # Основна документація
└── replit.nix                 # Replit environment
```

### 🔄 Як Frontend та Backend пов'язані

**Development режим** (`npm run dev`):
```
┌─────────────────────────────────────┐
│  Express Server (port 5000)         │
│  ├── API Routes (/api/*)            │
│  └── Vite Middleware                │
│      └── Frontend Dev Server        │
│          └── HMR (Hot Reload)       │
└─────────────────────────────────────┘

Frontend requests → http://localhost:5000/api/*
Static files → Vite serves from public/
```

**Production режим** (`npm run build && npm start`):
```
┌─────────────────────────────────────┐
│  Express Server (port 5000)         │
│  ├── API Routes (/api/*)            │
│  └── Static Files (dist/public/)    │
│      └── index.html + assets        │
└─────────────────────────────────────┘

All requests → Express
- /api/* → Backend routes
- /* → dist/public/index.html (SPA)
```

**Алясы імпорту**:
```typescript
// Frontend
import { Button } from "@/components/ui/button"       // → public/src/components/ui/button
import type { Product } from "@shared/schema"          // → shared/schema.ts
import heroImg from "@assets/hero-bhp.jpg"            // → attached_assets/hero-bhp.jpg

// Backend
import { products, insertProductSchema } from "../shared/schema"
```

---

## 5. Deployment (Хостинг)

### 🚀 Крок 1: Збірка проекту

```bash
# 1. Встановити залежності
npm install

# 2. Зібрати TypeScript
npm run build

# Результат:
# dist/
#   ├── public/    # Frontend (HTML, CSS, JS)
#   └── server/    # Backend (compiled JS)
```

### 📦 Крок 2: Frontend деплой

#### **Опція A: Vercel (рекомендовано для статики)**

```bash
# 1. Встановити Vercel CLI
npm i -g vercel

# 2. Деплой
cd dist/public
vercel --prod

# Vercel автоматично:
# - Налаштує CDN
# - Додасть SSL (HTTPS)
# - Забезпечить SPA routing
```

**vercel.json** (для SPA):
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

#### **Опція B: Netlify**

```bash
# netlify.toml
[build]
  publish = "dist/public"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist/public
```

### 🖥️ Крок 3: Backend деплой

#### **Опція A: Railway (найпростіше з PostgreSQL)**

1. Зареєструватись на [railway.app](https://railway.app)
2. Створити новий проект
3. Додати PostgreSQL сервіс
4. Додати Node.js сервіс:
   ```bash
   # Build command
   npm install && npm run build
   
   # Start command
   npm run start
   
   # Environment variables
   DATABASE_URL=${{Postgres.DATABASE_URL}}
   PORT=5000
   ```
5. Railway автоматично додасть домен з SSL

#### **Опція B: Render**

1. Створити Web Service на [render.com](https://render.com)
2. Підключити GitHub репозиторій
3. Налаштувати:
   ```yaml
   Build Command: npm install && npm run build
   Start Command: npm run start
   Environment: Node
   ```
4. Створити PostgreSQL database
5. Додати змінну `DATABASE_URL`

#### **Опція C: DigitalOcean App Platform**

```yaml
# .do/app.yaml
name: bhp-perfect
services:
- name: web
  github:
    repo: your-username/bhp-perfect
    branch: main
  build_command: npm install && npm run build
  run_command: npm run start
  envs:
  - key: DATABASE_URL
    value: ${db.DATABASE_URL}
databases:
- name: db
  engine: PG
  version: "14"
```

#### **Опція D: VPS (Ubuntu) - Повний контроль**

```bash
# 1. Підключитись до VPS
ssh root@your-server-ip

# 2. Встановити Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# 3. Встановити PostgreSQL
apt-get install postgresql postgresql-contrib

# 4. Клонувати проект
git clone https://github.com/your-repo/bhp-perfect.git
cd bhp-perfect

# 5. Встановити залежності і зібрати
npm install
npm run build

# 6. Встановити PM2 (process manager)
npm install -g pm2

# 7. Запустити додаток
pm2 start dist/server/index.js --name bhp-perfect
pm2 save
pm2 startup

# 8. Встановити Nginx (reverse proxy)
apt-get install nginx

# 9. Налаштувати Nginx
nano /etc/nginx/sites-available/bhp-perfect
```

**Nginx конфігурація**:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Активувати конфігурацію
ln -s /etc/nginx/sites-available/bhp-perfect /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx

# 10. Встановити SSL (Let's Encrypt)
apt-get install certbot python3-certbot-nginx
certbot --nginx -d your-domain.com
```

### 🗄️ Крок 4: Налаштування бази даних

#### **Railway PostgreSQL**:
```bash
# Автоматично отримаєте DATABASE_URL
# Запустити міграції:
npm run db:push --force
```

#### **Neon Serverless (безкоштовний)**:
1. Зареєструватись на [neon.tech](https://neon.tech)
2. Створити проект
3. Скопіювати DATABASE_URL
4. Додати в .env:
   ```
   DATABASE_URL=postgres://user:password@host/database?sslmode=require
   ```
5. Запустити міграції:
   ```bash
   npm run db:push --force
   ```

#### **Supabase (безкоштовний tier)**:
- PostgreSQL + Storage + Auth
- Хороша альтернатива Neon

### 🌐 Крок 5: Налаштування домену та SSL

#### **Cloudflare (безкоштовний SSL + CDN)**:
1. Додати домен на Cloudflare
2. Змінити NS записи у реєстратора
3. Налаштувати DNS:
   ```
   A record:  @  →  your-server-ip
   CNAME:  www  →  your-domain.com
   ```
4. Включити SSL/TLS (Full або Flexible)
5. Cloudflare автоматично додасть SSL сертифікат

#### **Let's Encrypt (безкоштовний SSL)**:
```bash
# Для Nginx
certbot --nginx -d your-domain.com -d www.your-domain.com

# Автооновлення
certbot renew --dry-run
```

### ⚙️ Крок 6: CI/CD (Автоматичне оновлення)

#### **GitHub Actions** (.github/workflows/deploy.yml):
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Vercel (Frontend)
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: ./dist/public
      
      - name: Deploy to Railway (Backend)
        run: |
          npm i -g @railway/cli
          railway up
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
```

#### **Railway автодеплой**:
- Підключити GitHub репозиторій
- Railway автоматично деплоїть при push в main

---

## 6. Технології та рекомендації

### ✅ Що використовується зараз

| Категорія | Технологія | Чому? |
|-----------|------------|-------|
| **Frontend Framework** | React 18 | Найпопулярніший, великий ecosystem |
| **Build Tool** | Vite | Дуже швидкий, HMR, ESM |
| **Routing** | Wouter | Легкий (1.3KB), простий API |
| **State Management** | TanStack Query v5 | Server state, caching, автоматичний refetch |
| **Styling** | Tailwind CSS | Utility-first, швидка розробка |
| **UI Components** | Shadcn/ui | Красиві, доступні, легко кастомізувати |
| **Forms** | React Hook Form + Zod | Валідація, performance |
| **Icons** | Lucide React | 1000+ іконок, tree-shakeable |
| **Backend** | Express + TypeScript | Простий, гнучкий, багато middleware |
| **ORM** | Drizzle | Type-safe, легкий, швидкий |
| **Database** | PostgreSQL | Надійний, SQL, ACID |
| **File Upload** | Multer | Стандарт для Express |
| **Validation** | Zod | Type-safe, зручний API |

### 🎯 Критично важливо

#### **Зараз (MVP)**:
1. ✅ Працюючий frontend (React + Vite)
2. ✅ REST API (Express + Routes)
3. ✅ Валідація даних (Zod)
4. ✅ Файлові завантаження (Multer)
5. ✅ In-memory storage (MemStorage)
6. ✅ Адмін-панель (базова)

#### **Для продакшну (обов'язково)**:
1. 🔴 **Підключити PostgreSQL** (замінити MemStorage)
2. 🔴 **Автентифікація користувачів** (JWT або sessions)
3. 🔴 **Платіжна система** (Stripe, PayPal, Przelewy24)
4. 🔴 **Email нотифікації** (Nodemailer, SendGrid)
5. 🔴 **Логування помилок** (Sentry, LogRocket)
6. 🔴 **Rate limiting** (express-rate-limit)
7. 🔴 **CORS налаштування** (для production)
8. 🔴 **Environment variables** (.env для secrets)

### 🚀 Можна додати пізніше

#### **Nice to have**:
- 📧 **Email маркетинг** (Mailchimp, Brevo)
- 📊 **Аналітика** (Google Analytics, Plausible)
- 🔍 **SEO оптимізація** (Next.js для SSR)
- 💬 **Чат підтримки** (Tawk.to, Crisp)
- 🌐 **Мультимовність** (i18next)
- 📱 **Mobile App** (React Native)
- 🤖 **Chatbot** (OpenAI API)
- 🎨 **Конструктор товарів** (3D preview)
- 📦 **Інтеграція з постачальниками** (API)
- 🚚 **Tracking відправлень** (API Нової Пошти)

### 🔧 Альтернативні стеки

#### **Якщо потрібен SSR/SEO**:
```
Next.js 14 (App Router)
  └── tRPC або Server Actions
  └── Prisma ORM
  └── PostgreSQL (Vercel Postgres)
  └── Vercel деплой (одна команда)
```

#### **Якщо потрібна масштабованість**:
```
Remix або Next.js
  └── GraphQL (Apollo Server)
  └── Redis (кешування)
  └── PostgreSQL (read replicas)
  └── S3 (файли)
  └── Kubernetes (оркестрація)
```

#### **Якщо потрібна простота**:
```
SvelteKit
  └── Supabase (БД + Auth + Storage)
  └── Vercel або Netlify
  └── Просто і швидко
```

### 📈 Рекомендації по масштабуванню

#### **100-1000 користувачів/день**:
- ✅ Поточний стек підходить
- Один сервер (Railway, Render)
- PostgreSQL (Neon безкоштовний tier)
- Cloudflare CDN для статики

#### **1000-10000 користувачів/день**:
- 🔄 Додати Redis для кешування
- 🔄 Розділити frontend і backend
- 🔄 PostgreSQL (платний tier з більше з'єднань)
- 🔄 CDN для uploads/ (S3 + CloudFront)

#### **10000+ користувачів/день**:
- 🚀 Horizontal scaling (кілька backend серверів)
- 🚀 Load balancer (Nginx, AWS ALB)
- 🚀 PostgreSQL read replicas
- 🚀 Redis Cluster
- 🚀 Microservices архітектура (опціонально)

---

## 📝 Підсумок

### Ваш проект BHP PERFECT - це:

**Архітектура**: 
- Monolithic full-stack додаток
- Frontend (React) + Backend (Express) + Database (PostgreSQL)
- Монорепозиторій з спільними типами (shared/schema.ts)

**Сильні сторони**:
- ✅ Сучасний tech stack
- ✅ Type-safe (TypeScript + Zod)
- ✅ Швидкий розробка (Vite + HMR)
- ✅ Красивий UI (Shadcn/ui + Tailwind)
- ✅ Легко деплоїти

**Що треба зробити для продакшну**:
1. Підключити PostgreSQL (замінити MemStorage)
2. Додати автентифікацію користувачів
3. Інтегрувати платіжну систему
4. Налаштувати email нотифікації
5. Задеплоїти на хостинг (Railway/Vercel)
6. Підключити домен + SSL

**Рекомендований стек для деплою**:
- **Frontend**: Vercel (безкоштовно, швидко, CDN, SSL)
- **Backend**: Railway (простий деплой, включає PostgreSQL)
- **Database**: Neon або Railway PostgreSQL
- **CDN**: Cloudflare (безкоштовний SSL + DDoS захист)
- **Домен**: Namecheap, GoDaddy (~5-10$/рік)

**Бюджет на хостинг**:
- Безкоштовно (hobby): Vercel Free + Railway Free + Neon Free
- Стартап (~20$/міс): Vercel Pro + Railway Starter + Cloudflare
- Бізнес (~100$/міс): Dedicated VPS + PostgreSQL + CDN

---

Ця документація створена для швидкого розуміння структури проекту та успішного деплою вашого e-commerce магазину BHP PERFECT! 🚀
