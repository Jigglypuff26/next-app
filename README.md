# Общая информация

Стартовый пакет для разработки на Next JS

## Описание архитектуры

- app/ # Роутинг и страницы
- assets/ # Изображения, шрифты
- components/ # UI-компоненты (Button, Input, ...)
- constants/ # Константы
- hooks/ # Кастомные хуки
- services/ # API и внешние сервисы
- shared/ # Общие утилиты и типы
- store/ # Глобальные состояния (Mobx / Redux)
- providers/ # Контексты (темы, авторизация)
- config/ # Настройки
- external/ # Интеграции
- utils/ # Вспомогательные функции
- service-actions/ # Сервисные действия

### Требования

- **Node** v22.17.1
- **npm** v10.9.3

Используется:

- **Nextjs** v15.5.2
- **zustand** - для хранения состояний
- **TypeScript**

## Запуск

1. Клонировать проект:
   HTTPS [https://gitflic.ru/project/watchtime24/next-app.git](https://gitflic.ru/project/watchtime24/next-app.git)

- или -
  SSH [git@gitflic.ru:watchtime24/next-app.git](git@gitflic.ru:watchtime24/next-app.git)

3. `npm i`
4. `npm run start`
5. После запуска открыть в браузере [localhost:3000](http://localhost:3000/)

## Документация

- [CONTRIBUTING.md](./CONTRIBUTING.md) - Руководство по внесению вклада в проект
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Инструкции по развертыванию приложения
- [CHANGELOG.md](./CHANGELOG.md) - История изменений проекта
- [FSD_IMPROVEMENTS.md](./FSD_IMPROVEMENTS.md) - Рекомендации по архитектуре FSD
