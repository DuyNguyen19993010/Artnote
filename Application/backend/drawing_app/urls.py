from django.contrib import admin
from django.urls import path
from . import views
from rest_framework  import routers
from django.urls import path, include

router = routers.DefaultRouter()
router.register('user' , views.UserViewSet)
router.register('profile' , views.ProfileViewSet)
router.register('room' , views.RoomViewSet)
router.register('interest' , views.InterestViewSet)
router.register('member' , views.MemberViewSet)


urlpatterns = [
    path('',include(router.urls)),
    path('joinedRoom/',views.joinedRoom)
]
