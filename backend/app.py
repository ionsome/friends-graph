# -*- coding: utf-8 -*-

import os

from flask import Flask

from api import bp_api

app = Flask(__name__)
app.config.from_pyfile('config.cfg')

if os.environ.get('SECRET_KEY'):
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')


@app.route('/')
def index():
    """Позволяет проверить работоспособность приложения."""
    return 'Backend: working fine!'


app.register_blueprint(bp_api, url_prefix='/api')

if __name__ == '__main__':
    app.run()
