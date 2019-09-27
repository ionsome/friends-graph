FROM python:3.7-alpine


ENV PYTHONUNBUFFERED=1

RUN apk add gcc musl-dev
RUN apk add mariadb-dev build-base
RUN pip install gunicorn gevent


ADD ./backend /backend
RUN pip install -r /backend/requirements.txt

ADD ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

CMD ["/entrypoint.sh"]