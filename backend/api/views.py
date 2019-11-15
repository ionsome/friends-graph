from uuid import uuid4

from flask import jsonify, request, session
from flask.views import MethodView


class AuthView(MethodView):

    def get(self):
        """Реализует простую авторизацию."""
        act = request.args.get('act', None)
        if act == 'login':
            session['id'] = uuid4().int
            return 'sign up'
        elif act == 'logout':
            session.pop('id', None)
            return 'logged off'
        if session.get('id'):
            return str(session['id'])
        return 'you are not authorized'


class FriendsGetView(MethodView):

    def get(self):
        """Обработка GET запроса."""
        user_id = request.args.get('user_id', None)
        try:
            user_id = int(user_id)
        except ValueError:
            return 'user_id is not provided'
        if user_id < 1:
            return 'user id is not valid'
        return jsonify([1, 2, 3])
