# Агрегатор новостей

---
## Новостные агентства
- Washington Post
- New York Time
- Los Angeles Post
---
## Управление работой приложения с помощью *Docker*.
*Запуск команд производится из директории `/web`*

### Запуск приложения

- `docker compose build` - сборка сервисов.
- `docker compose up -d` - развертывание приложения.

### Остановка и удаление запущенных контейнеров

- `docker compose rm -s -f`

### Удаление собранных образов

- `docker rmi -f parser-client parser-server`
