from django.urls import path

from apps.api import views

urlpatterns = [
    path("todos/", views.TodoListCreate.as_view()),
    path("todos/<int:pk>", views.TodoRetrieveUpdateDestroy.as_view()),
]
