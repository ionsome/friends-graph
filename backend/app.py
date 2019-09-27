from flask import Flask

app = Flask(__name__)


@app.route("/test")
def test():
    return "response"

if __name__ == '__main__':
    app.config.from_pyfile("config.cfg")
    app.run(host='0.0.0.0', port=80)