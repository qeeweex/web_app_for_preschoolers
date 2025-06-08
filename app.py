from flask import (
    Flask, 
    render_template, 
    redirect, 
    request, 
    url_for, 
    send_from_directory, 
    abort, 
    flash, 
    session)
import os
from database import Database

app = Flask(__name__, template_folder='templates')

app.config['UPLOAD_FOLDER'] = 'images/'
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)


@app.route('/')
def index():
    return render_template('index.html')

@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "GET":
        return render_template('register.html', error=request.args.get("error"))
    

    user_name = request.form.get("user_name")
    email = request.form.get("email")
    password = request.form.get("password")
    password_repeat = request.form.get("password_repeat")
    print(password_repeat)

    if not user_name:
        flash("Имя пользователя не может быть пустым!")
        return redirect(request.url)

    if not email:
        flash("Email не может быть пустым!")
        return redirect(request.url)

    if not password:
        flash("Password не может быть пустым!")
        return redirect(request.url)

    if not password_repeat:
        flash("Password не может быть пустым!")
        return redirect(request.url)

    if password != password_repeat:
        flash("Пароли не совпадают!")
        return redirect(request.url)
    
    saved = Database.register_user(user_name, email, password)
    if not saved:
        flash("Пользователем с таким user_name или почтой есть!!")
        return redirect(request.url)
    return redirect(url_for('login'))

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "GET":
        return render_template('login.html', error=request.args.get("error"))
    user_name = request.form.get("user_name")
    password = request.form.get("password")

    if not Database.can_be_logged_in(user_name,password):
        flash("Такой пользователь не существует или нет такого пользователя")
        return redirect(request.url)
    
    session['user_id'] = Database.find_user_id_by_name_or_email(user_name)
    return redirect(url_for('index'))


@app.route('/home')
def home():
    return render_template('home_page.html')

@app.route('/examples')
def example():
    return render_template('examples.html')

@app.route('/letters')
def letter():
    return render_template('letters.html')

@app.route('/numbers')
def number():
    return render_template('numbers.html')

@app.route('/figures')
def figure():
    return render_template('figures.html')

if __name__ == '__main__':
    app.run(debug=True)
