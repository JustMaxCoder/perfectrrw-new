# BHP Perfect - Replit Project

## Поточний стан

Проект повністю функціональний інтернет-магазин з:
- ✅ React frontend (public/src/)
- ✅ Express backend (server/)
- ✅ PostgreSQL база даних
- ✅ Завантаження файлів
- ✅ SEO оптимізація

## Архітектура

**Frontend (public/src/):**
- React 18 + TypeScript + Vite
- Tailwind CSS + Shadcn/ui
- TanStack Query для API
- Wouter для роутингу

**Backend (server/):**
- Express + TypeScript
- Drizzle ORM + PostgreSQL
- JWT аутентифікація
- Multer для файлів

## Останні зміни

### 14 січня 2025
- Очищена структура проекту
- Видалені порожні папки backend/, frontend/
- Видалені тимчасові файли
- Оновлена документація
- Виправлено Yandex.Metrika
- Додано structured data для SEO

## Workflows

**Run button** запускає:
```bash
npm run dev
```

Це запускає одночасно:
- Vite dev server (frontend)
- Express server (backend)

## Deployment на Replit

Використовується автоматичний деплой з Replit:
- Build: `npm run build`
- Start: `npm run start`

## Користувацькі налаштування

- Мова: Польська
- Стиль: Мінімалістичний, чорно-жовтий (#0b0b0b, #ffd000)
- База даних: Neon PostgreSQL

## Система архітектури

**Клієнт-сервер архітектура:**
- SPA на React з client-side routing
- RESTful API на Express
- Shared типи між frontend/backend