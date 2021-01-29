from django.contrib import admin
from django.urls import path
from . import views
from rest_framework  import routers
from django.urls import path, include

router = routers.DefaultRouter()
router.register('user' , views.UserViewSet)
router.register('profile' , views.ProfileViewSet)
router.register('room' , views.RoomViewSet)

urlpatterns = [
    path('',include(router.urls)),
]
