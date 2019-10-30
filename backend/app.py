# -*- coding: utf-8 -*-

from flask import Flask
import requests
import os

from api.core import bp_api

app = Flask(__name__)
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY")
app.config.from_pyfile("config.cfg")


@app.route('/')
def index():
    try:
        respond = requests.get('http://localhost:31337/').text
    except:
        respond = 'No connection :('
    return respond

app.register_blueprint(bp_api, url_prefix="/api")


if __name__ == "__main__":
    app.run('0.0.0.0', port=8000)
