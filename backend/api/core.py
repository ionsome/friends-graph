from flask import Blueprint

from api.decorators import auth_required
from api.views import AuthView, FriendsGetView

bp_api = Blueprint('api', __name__)
bp_api.json_encoder = None

rules = [
    {
        'name': 'auth',
        'view': AuthView,
        'auth_required': False,
    },
    {
        'name': 'friends.get',
        'view': FriendsGetView,
        'auth_required': True,
    },
]

for rule in rules:
    view_func = rule['view'].as_view(rule['name'])
    if rule['auth_required']:
        view_func = auth_required(view_func)
    bp_api.add_url_rule(rule['name'], view_func=view_func)
