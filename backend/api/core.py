from flask import Blueprint
from views import AuthView

bp_api = Blueprint('api', __name__)
bp_api.json_encoder = None

bp_api.add_url_rule('auth', view_func=AuthView.as_view('auth'))
