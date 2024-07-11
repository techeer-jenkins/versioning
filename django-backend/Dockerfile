FROM python:3.12

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /django-backend

COPY requirements.txt /django-backend/

RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

COPY todo_django/ /django-backend/

# CMD ["python", "manage.py", "runserver", "0.0.0.0:8002"]