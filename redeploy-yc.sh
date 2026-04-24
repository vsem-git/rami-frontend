#!/usr/bin/env bash
set -e

YC_HOST="rami-admin@213.165.212.152"

echo "Сборка проекта..."
npm run build

echo "Загрузка на сервер..."
scp -r dist/* $YC_HOST:/tmp/rami-dist/

echo "Деплой на сервере..."
ssh $YC_HOST 'sudo cp -r /tmp/rami-dist/* /var/www/rami/ && rm -rf /tmp/rami-dist'

echo "Готово! http://213.165.212.152"
