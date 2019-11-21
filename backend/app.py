# -*- coding: utf-8 -*-

import os

from flask import Flask
from flask_cors import CORS

from api import bp_api
from views import index

app = Flask(__name__, static_folder='build', static_url_path='')
app.config.from_pyfile('config.cfg')

if os.environ.get('SECRET_KEY'):
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')

CORS(app)

app.add_url_rule('/', 'index', index)
app.register_blueprint(bp_api, url_prefix='/api/')

if __name__ == '__main__':
    app.run(debug=True)
