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
    path('joinedRoom/',views.joinedRoom),
    path('profile_get/<int:user_id>/',views.profile_get),
    path('room_get/<int:room_id>/',views.room_get)
]
