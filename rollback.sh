#!/usr/bin/env bash
set -e

echo "Доступные архивы на сервере:"
ssh ramispb@45.130.41.154 'ls -t ~/ramiclinic-residence.ru/archive_*.zip 2>/dev/null | nl -w2 -s") "'

echo ""
read -rp "Введи номер архива (Enter = последний): " choice

if [[ -z "$choice" ]]; then
  ssh ramispb@45.130.41.154 'bash -lc "
    cd ~/ramiclinic-residence.ru
    LAST=\$(ls -t archive_*.zip | head -1)
    echo \"Откатываю на: \$LAST\"
    unzip -o \"\$LAST\"
    echo Готово!
  "'
else
  ssh ramispb@45.130.41.154 "bash -lc \"
    cd ~/ramiclinic-residence.ru
    ARCHIVE=\\\$(ls -t archive_*.zip | sed -n '${choice}p')
    if [[ -z \\\"\\\$ARCHIVE\\\" ]]; then
      echo 'Архив не найден'
      exit 1
    fi
    echo \\\"Откатываю на: \\\$ARCHIVE\\\"
    unzip -o \\\"\\\$ARCHIVE\\\"
    echo Готово!
  \""
fi

echo ""
read -rp "Press Enter to close this window... " _
