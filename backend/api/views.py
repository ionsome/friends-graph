from flask import request, session
from flask.views import MethodView
import random

from .core import bp_api

class AuthView(MethodView):

    def get(self):
        act = request.args.get('act', None)
        if act == 'logout':
            session.pop('id', None)
            return 'success'

    def post(self):
        act = request.args.get('act', None)
        if act == 'login':
            session['id'] = random.random(0, 9999)
            return 'success'

bp_api.add_url_rule('auth', view_func=AuthView.as_view('auth'))