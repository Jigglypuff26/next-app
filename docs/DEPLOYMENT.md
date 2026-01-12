# Руководство по развертыванию

Это руководство описывает процесс развертывания Next.js приложения в различных средах.

## Требования

- **Node.js** v22.17.1 или выше
- **Docker** и **Docker Compose** (для контейнеризованного развертывания)
- **Nginx** (опционально, для reverse proxy)

## Локальное развертывание

### Разработка

```bash
# Установка зависимостей
npm i

# Запуск в режиме разработки
npm run dev

# Приложение будет доступно на http://localhost:3000
```

### Продакшен (локально)

```bash
# Сборка приложения
npm run build

# Запуск продакшен сервера
npm start

# Приложение будет доступно на http://localhost:3000
```

## Развертывание с Docker

### Разработка

```bash
# Запуск контейнера разработки
npm run docker:dev

# Или напрямую
docker compose -f docker-compose.dev.yml -p nextjs-dev up

# Приложение будет доступно на http://localhost:4000
```

Особенности dev контейнера:

- Hot reload включен
- Volume монтирование для быстрой разработки
- Port 4000

### Продакшен

```bash
# Сборка и запуск продакшен контейнера
npm run docker:prod

# Или напрямую
docker compose -f docker-compose.prod.yml -p nextjs-prod up

# Приложение будет доступно на http://localhost:3000
```

Особенности prod контейнера:

- Многоэтапная сборка (builder + runner)
- Оптимизированный размер образа
- Только production зависимости
- Автоматический перезапуск при падении
- Health checks

### Остановка контейнеров

```bash
# Остановка dev контейнера
docker compose -f docker-compose.dev.yml -p nextjs-dev down

# Остановка prod контейнера
docker compose -f docker-compose.prod.yml -p nextjs-prod down
```

## Развертывание с Nginx

Для production окружения рекомендуется использовать Nginx в качестве reverse proxy.

### Настройка Nginx

1. Скопируйте конфигурацию Nginx:

   ```bash
   # Используйте скрипт деплоя (если доступен)
   bash bash.scripts/deploy.nginx.conf.sh

   # Или скопируйте вручную
   cp nginx/next.conf /etc/nginx/sites-available/next-app
   ln -s /etc/nginx/sites-available/next-app /etc/nginx/sites-enabled/
   ```

2. Отредактируйте конфигурацию под ваше окружение:
   - Измените `server_name` на ваш домен
   - Настройте SSL сертификаты (Let's Encrypt рекомендуется)
   - Проверьте пути к статическим файлам

3. Проверьте конфигурацию:

   ```bash
   nginx -t
   ```

4. Перезагрузите Nginx:
   ```bash
   systemctl reload nginx
   ```

### Пример конфигурации с Docker

```yaml
# docker-compose.nginx.yml
services:
  nginx:
    image: nginx:alpine
    ports:
      - '80:80'
      - '443:443'
    volumes:
      - ./nginx/next.conf:/etc/nginx/conf.d/default.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - nextjs-prod
```

## Переменные окружения

Создайте файл `.env.local` для локальной разработки или `.env.production` для продакшена:

```env
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://api.example.com
# Добавьте другие необходимые переменные
```

## Мониторинг и логи

### Docker логи

```bash
# Просмотр логов dev контейнера
docker compose -f docker-compose.dev.yml -p nextjs-dev logs -f

# Просмотр логов prod контейнера
docker compose -f docker-compose.prod.yml -p nextjs-prod logs -f
```

### Health Checks

Оба контейнера (dev и prod) настроены с health checks, которые проверяют доступность приложения каждые 30 секунд.

## Troubleshooting

### Порт уже занят

Если порт 3000 или 4000 уже занят, измените порт в:

- `docker-compose.dev.yml` (порт 4000)
- `docker-compose.prod.yml` (порт 3000)
- `package.json` скрипты

### Ошибки сборки Docker

```bash
# Очистка Docker кэша
docker system prune -a

# Пересборка без кэша
docker compose -f docker-compose.prod.yml build --no-cache
```

### Проблемы с правами доступа

```bash
# Если есть проблемы с правами на файлы
sudo chown -R $USER:$USER .
```

## Рекомендации для продакшена

1. ✅ Используйте HTTPS (SSL/TLS сертификаты)
2. ✅ Настройте мониторинг и логирование
3. ✅ Используйте процесс-менеджер (PM2) или systemd для управления процессами
4. ✅ Настройте резервное копирование
5. ✅ Используйте CDN для статических файлов
6. ✅ Настройте rate limiting в Nginx
7. ✅ Регулярно обновляйте зависимости: `npm audit` и `npm update`
