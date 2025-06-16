from flask import Flask, render_template, request, redirect, url_for, session
import database

app = Flask(__name__)
app.secret_key = 'your_secret_key'

@app.before_request
def before_request():
    pass  # get_db вызывается из database.py

@app.teardown_appcontext
def teardown_db(exception):
    database.close_connection(exception)

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    error = None
    login_error = None
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']

        if database.user_exists(username, email):
            error = 'Пользователь с таким именем или почтой уже существует.'
            return render_template('register.html', error=error, login_error=None)

        database.add_user(username, email, password)
        session['username'] = username
        return redirect(url_for('home_page'))

    return render_template('register.html', error=error, login_error=None)

@app.route('/login', methods=['GET', 'POST'])
def login():
    login_error = None
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        if database.check_user_by_email(email, password):
            username = database.get_username_by_email(email)
            session['username'] = username
            return redirect(url_for('home_page'))
        else:
            login_error = 'Неверная почта или пароль.'
            return render_template('register.html', error=None, login_error=login_error)

    return render_template('register.html', error=None, login_error=None)


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

if __name__ == '__main__':
    database.init_db(app)
    app.run(debug=True)