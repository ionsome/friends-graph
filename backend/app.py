# -*- coding: utf-8 -*-

import os

from flask import Flask, send_from_directory

from api import bp_api
from flask_cors import CORS

app = Flask(__name__, static_folder='build', static_url_path='')
app.config.from_pyfile('config.cfg')

if os.environ.get('SECRET_KEY'):
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')

CORS(app)
@app.route('/')
def index():
    """Позволяет проверить работоспособность приложения."""
#    return 'Backend: working fine!'
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/auth')
def auth():
    return send_from_directory(app.static_folder, 'index.html')

app.register_blueprint(bp_api, url_prefix='/api/')


if __name__ == '__main__':
    app.run()
