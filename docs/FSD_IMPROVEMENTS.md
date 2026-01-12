# Архитектура проекта (Feature-Sliced Design)

## Текущая структура проекта

Проект следует принципам **Feature-Sliced Design (FSD)**:

```
src/
├── app/                    # Инициализация приложения (Next.js App Router)
│   ├── (AdminPages)/       # Группы роутов
│   ├── (UserPages)/
│   ├── layout.tsx          # Корневой layout
│   ├── page.tsx            # Главная страница
│   └── providers/          # Провайдеры приложения (темы, контексты)
│       └── theme.ts
│
├── widgets/                # Крупные самостоятельные блоки
│   └── header/
│       ├── ui/
│       │   ├── Header.tsx
│       │   └── header.module.css
│       └── index.ts
│
├── features/               # Функциональные возможности
│   └── theme-toggle/
│       ├── ui/
│       │   ├── ThemeToggle.tsx
│       │   └── theme.toggle.module.css
│       └── index.ts
│
├── components/             # UI-компоненты
│   └── common/
│       └── Modal/
│           ├── ui/
│           ├── hooks/
│           └── index.ts
│
└── shared/                 # Переиспользуемые части
    ├── config/             # Конфигурация
    ├── constants/          # Константы
    ├── lib/                # Утилиты и хелперы
    ├── store/              # Глобальное состояние (Zustand)
    ├── types/              # Общие типы
    └── assets/             # Статические ресурсы
```

## Описание слоев

### app/

Инициализация приложения, роутинг, страницы и провайдеры. Использует Next.js App Router.

### widgets/

Крупные самостоятельные блоки интерфейса, которые используются на страницах (например, Header).

### features/

Функциональные возможности приложения, которые могут использоваться в разных местах (например, переключение темы).

### components/

Переиспользуемые UI-компоненты (например, Modal).

### shared/

Переиспользуемые части проекта:

- `config/` - Конфигурация приложения
- `constants/` - Константы
- `lib/` - Утилиты и хелперы
- `store/` - Глобальное состояние (Zustand)
- `types/` - Общие типы TypeScript
- `assets/` - Статические ресурсы

## Правила импорта по FSD:

1. **Слои могут импортировать только из нижележащих слоев:**
   - `app` → может импортировать из `widgets`, `features`, `entities`, `shared`
   - `widgets` → может импортировать из `features`, `entities`, `shared`
   - `features` → может импортировать из `entities`, `shared`
   - `entities` → может импортировать только из `shared`
   - `shared` → не может импортировать из других слоев

2. **Внутри слоя можно импортировать только из своей папки или нижележащих слоев**

3. **Публичный API через `index.ts`** - каждый модуль должен экспортировать только то, что нужно снаружи

## Примеры правильных импортов:

```typescript
// ✅ Правильно: app импортирует из widgets
// app/page.tsx
import { Header } from '@/widgets/header';

// ✅ Правильно: widget импортирует из features
// widgets/header/ui/Header.tsx
import { ThemeToggle } from '@/features/theme-toggle';

// ✅ Правильно: feature импортирует из shared
// features/theme-toggle/ui/ThemeToggle.tsx
import { useAppStore } from '@/shared/store';

// ❌ Неправильно: shared импортирует из features
// shared/lib/something.ts
import { Modal } from '@/features/modal'; // ❌
```

## Возможные улучшения в будущем:

1. Создать базовые UI компоненты в `shared/ui/` (Button, Input, Card и т.д.)
2. Добавить папку `entities/` для бизнес-сущностей (если понадобится)
3. Создать `shared/api/` для API клиентов и типов
4. Добавить `shared/config/env.ts` для переменных окружения
