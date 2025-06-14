# Веб-приложение для дошкольников — онлайн обучение на Flask

Это дошкольное приложение для обучение в котором вы сможете:
- Зарегестрироваться и авторизовываться
- Проходить игры , решать легчие задачи и отгадывать предметы
- Узнать свой результат по окончанию игры


---

## Установка и запуск (подробная инструкция)

### 1. Клонирование репозитория

```sh
git clone (`https://github.com/qeeweex/web_app_for_preschoolers.git`)
cd test
```

### 2. Создание и активация виртуального окружения (рекомендуется)

#### Windows

```sh
python -m venv venv
venv\Scripts\activate
```

#### macOS/Linux

```sh
python3 -m venv venv
source venv/bin/activate
```

### 3. Установка зависимостей

```sh
pip install -r requirements.txt
```

### 4. Инициализация базы данных

**Внимание:**  
База данных создаётся по структуре из файла `schema.sql`.  
Если вы уже создавали базу ранее — этот шаг можно пропустить.

#### Через flask CLI

**Windows (PowerShell):**
```sh
$env:FLASK_APP = "app.py"
python -m flask init-db
```

**Windows (cmd):**
```cmd
set FLASK_APP=app.py
python -m flask init-db
```
#### Если flask CLI не работает

- Откройте SQLite Browser (или любой SQLite-клиент)
- Создайте файл базы данных `pasta_pizza.db` (или с нужным именем)
- Вставьте содержимое `schema.sql` и выполните

### 5. Запуск приложения

```sh
python app.py
```
По умолчанию сайт откроется на: [http://127.0.0.1:5000/](http://127.0.0.1:5000/)

---

## Доступ к приложению

- Приветственная страница: [http://127.0.0.1:5000/](http://127.0.0.1:5000/)
- Страница с играми: [http://127.0.0.1:5000/home](http://127.0.0.1:5000/home)
- Регистрация: [http://127.0.0.1:5000/signup](http://127.0.0.1:5000/signup)
- Вход: [http://localhost:8088/login](http://localhost:8088/login)

---

## Структура проекта

- `app.py` — Flask-приложение, все маршруты и логика
- `database.py` — подключение к базе данных и вспомогательные функции
- `schema.sql` — структура базы данных SQLite
- `templates/` — все HTML-шаблоны (обязательны: `register.html`, `index.html`, `examples.html`, `numbers.html`, `login.html`, `figures.html`, `home_page.html`, `letters.html` шаблоны для админки)
- `static/` — стили, картинки, JS 

---
