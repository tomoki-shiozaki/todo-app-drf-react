from django.contrib.auth import get_user_model
from rest_framework import serializers

from apps.todo.models import Todo

User = get_user_model()


class TodoSerializer(serializers.ModelSerializer):
    created = serializers.ReadOnlyField()
    completed = serializers.ReadOnlyField()

    class Meta:
        model = Todo
        fields = ["id", "title", "memo", "created", "completed"]


class TodoToggleCompleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ["id"]
