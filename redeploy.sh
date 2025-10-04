#!/usr/bin/env bash
set -e
ssh root@ramiclinic-residence.ru 'bash -lc "~/deploy.sh"'
echo
read -rp "Press Enter to close this window... " _
