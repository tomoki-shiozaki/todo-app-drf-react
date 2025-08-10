from django.shortcuts import render
from rest_framework import generics, permissions

from apps.api.serializers import TodoSerializer
from apps.todo.models import Todo


# Create your views here.
class TodoListCreate(generics.ListCreateAPIView):
    # ListAPIView requires two mandatory attributes, serializer_class and
    # queryset.
    # We specify TodoSerializer which we have earlier implemented
    serializer_class = TodoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Todo.objects.filter(user=user).order_by("-created")

    def perform_create(self, serializer):
        # serializer holds a django model
        serializer.save(user=self.request.user)
