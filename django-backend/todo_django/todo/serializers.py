from rest_framework import serializers
from .models import User2, Todo2

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo2
        fields = ['id', 'title', 'description', 'owner_id']

class UserSerializer(serializers.ModelSerializer):
    todos = TodoSerializer(many=True, read_only=True)

    class Meta:
        model = User2
        fields = ['id', 'name', 'email', 'is_active', 'todos']
