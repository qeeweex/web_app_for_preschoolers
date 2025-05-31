from flask import Flask, render_template, redirect, request, url_for

app = Flask(__name__)

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

if __name__ == '__main__':
    app.run(debug=True)
