# -*- coding: utf-8 -*-

import json

import requests

from lib.vk import urls


def get_friends_by_id(user_id, access_token):
    url = urls.FRIENDS_GET.format(user_id, access_token)
    req = requests.get(url)
    return json.loads(req.text)
