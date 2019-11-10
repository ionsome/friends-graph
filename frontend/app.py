# -*- coding: utf-8 -*-

from flask import Flask, send_from_directory

from flask_cors import CORS

app = Flask(__name__, static_url_path='')
app.config['CORS_HEADERS'] = 'Content-Type'

cors = CORS(app, resources={'/auth': {"origins": "http://http://2.94.11.10:5000/"}})

@app.route('/')
def index():
    """Возвращает текущий шаблон из static."""
    return send_from_directory('static', 'index.html')


@app.route('/auth')
def auth():
    """Возвращает текущий шаблон из static."""
    return send_from_directory('static', 'auth.html')


if __name__ == '__main__':
    app.run('0.0.0.0')
