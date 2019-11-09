# -*- coding: utf-8 -*-
"""
https://vk.com/dev/authcode_flow_user

https://oauth.vk.com/authorize?client_id=7154329&display=page&redirect_uri=http://friends-graph.herokuapp.com&scope=friends&response_type=code&v=5.101
В ответе редирект на http://friends-graph.herokuapp.com с параметром code


Пример получения access token
https://oauth.vk.com/access_token?client_id=7154329&client_secret=MjO5VbOZkFjzOcszowgm&redirect_uri=http://friends-graph.herokuapp.com&code=5970f74a4e99548768
Пример code: b2a87c53944c1cfe46
"""

import json

import requests

import urls


def get_friends_by_id(user_id, access_token):
    url = urls.FRIENDS_GET.format(user_id, access_token)
    req = requests.get(url)
    return json.loads(req.text)
