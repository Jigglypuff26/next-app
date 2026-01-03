# Рекомендации по улучшению структуры проекта по FSD

## Текущая структура vs FSD

### Проблемы текущей структуры:

1. **components/common** - смешивает UI компоненты и виджеты
2. **stores** - глобальное состояние не структурировано
3. **config** - конфигурация не в shared
4. **providers** - провайдеры не в app
5. **utils** - утилиты не в shared/lib
6. **constants** - константы не в shared
7. Нет четкого разделения на **features**, **entities**, **widgets**

## Предлагаемая структура FSD:

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
├── widgets/                 # Крупные самостоятельные блоки
│   └── header/             # Header - это виджет, а не просто компонент
│       ├── ui/
│       │   ├── Header.tsx
│       │   └── header.module.css
│       └── index.ts
│
├── features/               # Функциональные возможности
│   ├── theme-toggle/        # Переключение темы - это фича
│   │   ├── ui/
│   │   │   ├── ThemeToggle.tsx
│   │   │   └── theme.toggle.module.css
│   │   └── index.ts
│   └── modal/              # Модальное окно - это фича
│       ├── ui/
│       ├── hooks/
│       └── index.ts
│
├── entities/               # Бизнес-сущности (если будут)
│   └── user/               # Пример: сущность пользователя
│       ├── model/
│       ├── ui/
│       └── index.ts
│
└── shared/                 # Переиспользуемые части
    ├── ui/                 # Базовые UI компоненты (Button, Input и т.д.)
    │   └── modal/          # Базовые части модального окна
    │
    ├── lib/                # Утилиты и хелперы
    │   ├── modal/
    │   │   └── constrain-position.ts
    │   └── storage/
    │       └── local-storage.ts
    │
    ├── config/             # Конфигурация
    │   ├── app.settings.ts
    │   ├── app.css
    │   └── color.scheme.css
    │
    ├── constants/          # Константы
    │   └── index.ts
    │
    ├── types/              # Общие типы
    │   ├── modal.types.ts
    │   └── index.ts
    │
    ├── store/              # Глобальное состояние (Zustand)
    │   └── app-store.ts
    │
    └── assets/             # Статические ресурсы
        └── icons/
```

## Конкретные улучшения:

### 1. Переместить базовые UI компоненты в `shared/ui/`

- `components/common/Modal` → `shared/ui/modal` (базовые части)
- Или оставить Modal как feature, но базовые UI части вынести в `shared/ui`

### 2. Header → `widgets/header/`

Header - это виджет, так как он:

- Используется на всех страницах
- Имеет свою логику (навигация, варианты)
- Является самостоятельным блоком

### 3. ThemeToggle → `features/theme-toggle/`

Переключение темы - это фича, так как:

- Это функциональная возможность
- Может использоваться в разных местах
- Имеет свою логику

### 4. Modal → `features/modal/` или оставить в `shared/ui/`

В зависимости от использования:

- Если модальное окно специфично для бизнес-логики → `features/modal/`
- Если это универсальный UI компонент → `shared/ui/modal/`

### 5. Переместить конфигурацию

- `config/` → `shared/config/`

### 6. Переместить провайдеры

- `providers/` → `app/providers/`

### 7. Переместить утилиты

- `utils/` → `shared/lib/`

### 8. Переместить константы

- `constants/` → `shared/constants/`

### 9. Структурировать store

- `stores/app-store.ts` → `shared/store/app-store.ts`
- Или создать `entities/app/model/store.ts` если это бизнес-логика

## Приоритет улучшений:

### Высокий приоритет:

1. ✅ Переместить `config/` → `shared/config/`
2. ✅ Переместить `providers/` → `app/providers/`
3. ✅ Переместить `utils/` → `shared/lib/`
4. ✅ Переместить `constants/` → `shared/constants/`
5. ✅ Переместить `stores/` → `shared/store/`

### Средний приоритет:

6. Header → `widgets/header/`
7. ThemeToggle → `features/theme-toggle/`

### Низкий приоритет:

8. Реорганизация Modal (уже хорошо структурирован)
9. Создание базовых UI компонентов в `shared/ui/` (Button, Input и т.д.)

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

## Дополнительные улучшения:

1. **Создать базовые UI компоненты в `shared/ui/`:**
   - Button
   - Input
   - Card
   - и т.д.

2. **Добавить папку `processes/` для сложных бизнес-процессов** (если нужно)

3. **Создать `shared/api/` для API клиентов и типов**

4. **Добавить `shared/config/env.ts` для переменных окружения**
