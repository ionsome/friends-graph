# -*- coding: utf-8 -*-

from flask import Flask
import os

from api.core import bp_api

app = Flask(__name__)

app.register_blueprint(bp_api, url_prefix="/api")


app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY")
app.config.from_pyfile("config.cfg")


if __name__ == "__main__":
    app.run('0.0.0.0', port=8000)
