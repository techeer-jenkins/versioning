from celery import shared_task
import time

@shared_task
def add_with_delay(x, y):
    time.sleep(2)
    return x + y