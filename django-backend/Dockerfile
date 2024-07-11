FROM python:3.12

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /todo_django

COPY requirements.txt /todo_django/
COPY start_celery_flower.sh /todo_django/
RUN chmod +x start_celery_flower.sh

RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

COPY todo_django/ /todo_django/

# CMD ["python", "manage.py", "runserver", "0.0.0.0:8002"]