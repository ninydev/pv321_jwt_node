#!/bin/bash

# Останавливаем и удаляем все существующие контейнеры, чтобы предотвратить конфликты
docker-compose down

# Собираем и запускаем контейнеры в фоновом режиме
docker-compose up --build -d

# Проверяем статус последней команды (сборки и запуска контейнера)
if [ $? -eq 0 ]; then
  echo "Все готово - перейдите по ссылке http://localhost"
else
  echo "Произошла ошибка при сборке и запуске контейнера. Пожалуйста, проверьте логи."
fi