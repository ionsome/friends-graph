# -*- coding: utf-8 -*-

from flask import Flask
import os

app = Flask(__name__)

@app.route('/')
def index():
    return 'working fine!'

if __name__ == "__main__":
    app.run('0.0.0.0', port=31337)
