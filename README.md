# Общая информация

Стартовый пакет для разработки на Next JS

## Описание архитектуры

Проект использует архитектуру **Feature-Sliced Design (FSD)**:

- **app/** - Роутинг, страницы и провайдеры приложения
- **widgets/** - Крупные самостоятельные блоки интерфейса (Header и т.д.)
- **features/** - Функциональные возможности (theme-toggle и т.д.)
- **components/** - UI-компоненты (Modal и т.д.)
- **shared/** - Переиспользуемые части:
  - `config/` - Конфигурация приложения
  - `constants/` - Константы
  - `lib/` - Утилиты и хелперы
  - `store/` - Глобальное состояние (Zustand)
  - `types/` - Общие типы
- **assets/** - Статические ресурсы (иконки, изображения)

### Требования

- **Node** v22.17.1
- **npm** v10.9.3

Используется:

- **Nextjs** v15.5.2
- **zustand** - для хранения состояний
- **TypeScript**

## Запуск

1. Клонировать проект:

   ```bash
   # HTTPS
   git clone https://gitflic.ru/project/watchtime24/next-app.git

   # или SSH
   git clone git@gitflic.ru:watchtime24/next-app.git
   ```

2. Установить зависимости:

   ```bash
   npm i
   ```

3. Запустить проект:

   ```bash
   # Режим разработки
   npm run dev

   # Или продакшен сборка
   npm run build
   npm run start
   ```

4. Открыть в браузере [http://localhost:3000](http://localhost:3000/)

## Документация

Дополнительная документация находится в папке [docs/](./docs/):

- [CONTRIBUTING.md](./docs/CONTRIBUTING.md) - Руководство по внесению вклада в проект
- [DEPLOYMENT.md](./docs/DEPLOYMENT.md) - Инструкции по развертыванию приложения
- [CHANGELOG.md](./docs/CHANGELOG.md) - История изменений проекта
- [FSD_IMPROVEMENTS.md](./docs/FSD_IMPROVEMENTS.md) - Рекомендации по архитектуре FSD
