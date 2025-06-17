import sqlite3
from flask import Flask, render_template, request, redirect, url_for, session, g

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Замените на свой секретный ключ

DATABASE = 'users.db'

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

def init_db(app):
    with app.app_context():
        db = get_db()
        cursor = db.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL
            )
        ''')
        db.commit()

def add_user(username, email, password):
    db = get_db()
    cursor = db.cursor()
    cursor.execute('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', (username, email, password))
    db.commit()

def user_exists(username, email):
    db = get_db()
    cursor = db.cursor()
    cursor.execute('SELECT id FROM users WHERE username = ? OR email = ?', (username, email))
    return cursor.fetchone() is not None

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    error = None
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']

        db = get_db()
        cursor = db.cursor()
        # Проверка на существующего пользователя
        cursor.execute('SELECT id FROM users WHERE username = ? OR email = ?', (username, email))
        if cursor.fetchone():
            error = 'Пользователь с таким именем или почтой уже существует.'
            return render_template('register.html', error=error)

        # Сохраняем пользователя
        cursor.execute('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', (username, email, password))
        db.commit()
        session['username'] = username
        return redirect(url_for('home_page'))

    return render_template('register.html', error=error)

@app.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        db = get_db()
        cursor = db.cursor()
        cursor.execute('SELECT id FROM users WHERE username = ? AND password = ?', (username, password))
        user = cursor.fetchone()
        if user:
            session['username'] = username
            return redirect(url_for('home_page'))
        else:
            error = 'Неверное имя пользователя или пароль.'
    return render_template('login.html', error=error)

@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('login'))

@app.route('/home_page')
def home_page():
    if 'username' not in session:
        return redirect(url_for('login'))
    return render_template('home_page.html', username=session['username'])

@app.route('/')
def index():
    return redirect(url_for('login'))

def check_user_by_email(email, password):
    db = get_db()
    cursor = db.cursor()
    cursor.execute('SELECT id FROM users WHERE email = ? AND password = ?', (email, password))
    return cursor.fetchone() is not None

def get_username_by_email(email):
    db = get_db()
    cursor = db.cursor()
    cursor.execute('SELECT username FROM users WHERE email = ?', (email,))
    row = cursor.fetchone()
    return row[0] if row else None

if __name__ == '__main__':
    init_db()
    app.run(debug=True)