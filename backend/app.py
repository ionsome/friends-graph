# -*- coding: utf-8 -*-

import os

from flask import Flask
from flask_cors import CORS

from api import bp_api
from lib import SetMiddlewareLogger
from views import index

app = Flask(__name__, static_folder='build', static_url_path='')
app.config.from_pyfile('config.cfg')
CORS(app)

if os.environ.get('SECRET_KEY'):
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')

if os.environ.get('mongodb_log'):
    req_logger = SetMiddlewareLogger(os.environ.get('mongodb_log'))
    app.after_request(req_logger.logging_middleware)

app.add_url_rule('/', 'index', index)
app.register_blueprint(bp_api, url_prefix='/api/')

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
