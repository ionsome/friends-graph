# -*- coding: utf-8 -*-

from flask import Flask

app = Flask(__name__, static_url_path='/static')


@app.route('/')
def index():
    """Возвращает текущий шаблон из static."""
    return app.send_static_file('index.html')


if __name__ == '__main__':
    app.run()
