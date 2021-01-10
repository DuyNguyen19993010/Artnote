from django.contrib import admin
from django.urls import path
from . import views
urlpatterns = [
    path("registration_view/", views.registration_view, name="registration_view"),
    path("login_view/", views.login_view, name="login_view"),
    path("logout_view/", views.logout_view, name="logout_view"),
    path("room_get/<int:room_id>/", views.room_get, name="room_get"),
    path("room_post/<int:room_id>/", views.room_post, name="room_post"),
    path("room_put/", views.room_put, name="room_put"),
    path("room_delete/", views.room_delete, name="room_delete"),
]
