# MiniApp Forge
MiniApp Forge — стартовый шаблон для разработки Telegram Mini Apps на Nuxt 3 с архитектурой Feature-Sliced Design (FSD).
---
## Быстрый старт
### 1. Создание проекта из шаблона
Создай репозиторий через **Use this template** или сделай Fork, затем клонируй его:

```text
git clone <your-repo-url>
cd your-project
```

### 2. Установка зависимостей

```text
npm install
```

### 3. Инициализация Nuxt-проекта (если требуется)

```text
npx nuxi@latest init .
```

### 4. Настройка package.json

Задай имя проекта:

```text
{
  "name": "your-app-name"
}
```

Формат: lowercase, без пробелов.

## Стек

* Nuxt 3 (SSR + UI)
* TypeScript
* Pinia
* Telegram Web App SDK (@telegram-apps/sdk)
* Zod
* Storybook
* Vitest + @nuxt/test-utils

## Архитектура (Feature-Sliced Design)

Проект построен по FSD.

## Слои

* app — инициализация приложения (plugins, layouts, styles, конфигурация)
* pages — страницы приложения
* widgets — крупные UI-блоки
* features — пользовательские сценарии
* entities — бизнес-логика и модели
* shared — переиспользуемые компоненты, утилиты, API

## Правило зависимостей

shared → entities → features → widgets → pages → app

Каждый слой может импортировать только нижележащие слои.

## Структура проекта

src/
  app/
    layouts/
    plugins/
    routes/
    styles/
    public/
  pages/
  widgets/
  features/
  entities/
  shared/
    api/
    ui/
    lib/
    config/
.storybook/

## Алиасы

```ts
import { fileURLToPath } from 'node:url'
export default {
  alias: {
    '@shared': fileURLToPath(new URL('./src/shared', import.meta.url)),
    '@entities': fileURLToPath(new URL('./src/entities', import.meta.url)),
    '@features': fileURLToPath(new URL('./src/features', import.meta.url)),
    '@widgets': fileURLToPath(new URL('./src/widgets', import.meta.url)),
    '@pages': fileURLToPath(new URL('./src/pages', import.meta.url))
  }
}
```

## Скрипты

```json
{
  "scripts": {
    "dev": "nuxt dev",
    "build": "nuxt build",
    "typecheck": "nuxi typecheck",
    "postinstall": "nuxt prepare",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "storybook": "storybook dev -p 6006",
    "storybook:build": "storybook build",
    "test": "vitest",
    "test:run": "vitest run"
  }
}
```

## Telegram Web App

Mini App использует официальный Telegram Web App API:

https://telegram.org/js/telegram-web-app.js

Инициализация выполняется через @telegram-apps/sdk в client plugin Nuxt.

В разработке рекомендуется:

* мокать window.Telegram.WebApp
* или использовать import.meta.dev

## Testing (Vitest)

```ts
import { defineVitestConfig } from '@nuxt/test-utils/config'
export default defineVitestConfig({
  test: {
    environment: 'nuxt'
  }
})
```

## Storybook

Запуск
```text
npm run storybook
```

Сборка

```text
npm run storybook:build
```

### Рекомендации

* Писать сторисы только для UI-компонентов
* Не использовать Nuxt runtime внутри stories
* Использовать *.stories.ts

## Zod

Используется для:

* валидации форм
* проверки API-ответов
* описания доменных схем

Схемы хранятся в entities или shared/lib/validation.
