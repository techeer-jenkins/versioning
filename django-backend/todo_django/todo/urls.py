from django.urls import path
from . import views

urlpatterns = [
    path('users/', views.UserViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('users/<int:pk>/', views.UserViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'})),
    path('users/<int:pk>/todos/', views.UserViewSet.as_view({'post': 'create_todo'})),
    path('todos/', views.TodoViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('todos/<int:pk>/', views.TodoViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'})),
]
