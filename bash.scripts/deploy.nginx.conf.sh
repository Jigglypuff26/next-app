# удаление (опционально) т.к ещё на этом сервере тестируется другое приложение
# Пример запуска sh ./bash.scripts/deploy.nginx.conf.sh из корнегоко каталога проекта
sudo  rm -f /etc/nginx/sites-enabled/*

# удаление старого конфига
sudo rm -rf /etc/nginx/sites-available/next.conf

# копирование nginx файла конфигурации
sudo cp -r nginx/next.conf /etc/nginx/sites-available/
# создание ссылки на nginx файл конфигурации
sudo ln -s /etc/nginx/sites-available/next.conf /etc/nginx/sites-enabled/
# перезапус nginx
sudo systemctl restart nginx

echo "NGINX конфигурация для приложения установленна"