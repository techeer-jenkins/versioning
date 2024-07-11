#!/bin/sh

celery -A todo_django worker --loglevel=info --concurrency=1 &

celery -A todo_django flower --port=5555 --basic_auth=guest:guest
