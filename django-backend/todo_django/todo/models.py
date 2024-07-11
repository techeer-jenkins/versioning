from django.db import models

class User2(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=False)

    def __str__(self):
        return self.email

class Todo2(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    owner = models.ForeignKey(User2, related_name='todos', on_delete=models.CASCADE)

    def __str__(self):
        return self.title
