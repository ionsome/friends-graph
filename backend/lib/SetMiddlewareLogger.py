# -*- coding: utf-8 -*-

import logging

from flask import request
from mongolog import MongoHandler


class SetMiddlewareLogger():
    def __init__(self, connection_line):
        """Инициализирует логгер и хэндлер для логгирования в mongodb."""
        self.logger = logging.getLogger('mongolog')
        self.logger.setLevel(logging.DEBUG)

        self.logger.addHandler(
            MongoHandler.to(
                'friends-graph', 'log', host=connection_line,
            )
        )

    def logging_middleware(self, response):
        """Логгирует информацию о запросе"""
        self.logger.info(
            '%s%s',
            request.headers,
            request.get_data().decode('ascii'),
        )
        return response
