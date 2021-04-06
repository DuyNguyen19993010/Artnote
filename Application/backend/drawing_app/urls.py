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
router.register('post' , views.PostViewSet)


urlpatterns = [
    path('',include(router.urls)),
    path('joinedRoom/',views.joinedRoom),
    path('profile_get/<int:user_id>/',views.profile_get),
    path('room_get/<int:room_id>/',views.room_get),
    path('post_popular_get/<int:index>/',views.post_popular_batch_get),
    path('post_latest_get/<int:index>/',views.post_latest_batch_get),
    path('post_click_interaction/',views.click_update_Interaction),
    path('post_like_comment_update_interaction/',views.like_comment_update_interaction)
]
