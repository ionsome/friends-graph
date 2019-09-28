from flask import Blueprint

bp_api = Blueprint("api", __name__)
bp_api.json_encoder = None

from .views import *
