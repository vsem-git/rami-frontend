#!/usr/bin/env bash
set -e

echo "Сборка проекта..."
npm run build

echo "Загрузка на сервер..."
zip -r dist.zip dist/
scp dist.zip ramispb@45.130.41.154:~/ramiclinic-residence.ru/dist.zip
rm dist.zip

echo "Деплой на сервере..."
ssh ramispb@45.130.41.154 'bash -lc "~/deploy.sh"'

echo
read -rp "Press Enter to close this window... " _
