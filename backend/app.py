from flask import Flask

from api.core import bp_api

app = Flask(__name__)

app.register_blueprint(bp_api, url_prefix="/api")

if __name__ == '__main__':
    app.config.from_pyfile("config.cfg")
    print(app.url_map)
    app.run(host='0.0.0.0', port=80)
