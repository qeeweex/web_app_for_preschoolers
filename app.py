
from flask import Flask, render_template, redirect, request, url_for, send_from_directory
import os 

app = Flask(__name__)

app.config['UPLOAD_FOLDER'] = 'uploads/'
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        return redirect(url_for('home'))
    return render_template('register.html')

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

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/uploads/<filename>')
def uploaded_photo(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == '__main__':
    app.run(debug=True)