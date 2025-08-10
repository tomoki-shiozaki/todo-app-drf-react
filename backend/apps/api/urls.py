from django.urls import path

from apps.api import views

urlpatterns = [
    path("todos/", views.TodoList.as_view()),
]
