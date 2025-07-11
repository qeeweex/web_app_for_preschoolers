# Web App for Preschoolers

**Web App for Preschoolers** — это современное образовательное веб-приложение для детей дошкольного возраста. Здесь собраны интерактивные игры и задания для развития памяти, внимания, логики, а также изучения букв, цифр и фигур.

## Возможности

- 🎮 Интерактивные обучающие игры: угадай предмет, цифры, фигуры, примеры
- 🧠 Развитие памяти, логики и внимания
- 🅰️ Изучение букв, цифр и форм
- 👦👧 Яркий и понятный интерфейс для детей

## Технологии

- **Python (Flask)** — серверная часть
- **HTML, CSS, JavaScript** — клиентская часть
- **FontAwesome** — иконки
- **SQLite** — хранение пользователей

## Структура проекта

```
web_app_for_preschoolers/
├── app.py
├── users.db
├── README.md
├── src/
│   ├── static/        # CSS, JS, изображения
│   ├── templates/     # HTML-шаблоны Flask
│   ├── uploads/       # Картинки для игр
│   └── database.py    # Работа с БД
```

## Быстрый старт

1. Клонируйте репозиторий:
   ```sh
   git clone https://github.com/qeeweex/web_app_for_preschoolers.git
   cd web_app_for_preschoolers
   ```

2. Установите зависимости:
   ```sh
   pip install -r requirements.txt
   ```

3. Запустите приложение:
   ```sh
   python app.py
   ```

4. Откройте в браузере [http://localhost:5000](http://localhost:5000)

## Как добавить свои задания и картинки

- Добавьте новые изображения в папку `src/uploads`
- Измените или добавьте вопросы в соответствующих HTML/JS-файлах в `src/templates` и `src/static`

## Авторы и контакты

- Автор: [qeeweex](https://github.com/qeeweex)
- Email: [garmashkir09@mail.ru]

---

**Web App for Preschoolers** — учиться весело!