# -*- coding: utf-8 -*-

from flask import current_app, send_from_directory


def index():
    """Возвращает главную страницу."""
    return send_from_directory(current_app.static_folder, 'index.html')
