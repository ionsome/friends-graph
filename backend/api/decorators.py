# -*- coding: utf-8 -*-
"""Содержит декораторы для работы с api."""

from flask import Response, abort, session


def auth_required(method):
    """Проверяет авторизован ли юзер."""

    def decorator(*args, **kwargs):
        if not session.get('id'):
            abort(Response('You are not signed in.'))
        return method

    return decorator
