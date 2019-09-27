#!/bin/sh

set +e

cd /backend || exit

gunicorn -b 0.0.0.0:$PORT --worker-class gevent --worker-connections 1024 app:app