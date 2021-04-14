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
router.register('comment' , views.CommentViewSet)
router.register('like' , views.LikeViewSet)
router.register('layers' , views.LayerViewSet)


urlpatterns = [
    path('',include(router.urls)),
    path('layers_get/<int:room_id>/',views.layer_get),
    path('layers_save_image/',views.save_layer_image),
    path('joinedRoom/',views.joinedRoom),
    path('profile_get/<int:user_id>/',views.profile_get),
    path('room_get/<int:room_id>/',views.room_get),
    path('post_get/<int:post_id>/',views.post_get),
    path('post_popular_get/<int:index>/',views.post_popular_batch_get),
    path('post_latest_get/<int:index>/',views.post_latest_batch_get),
    path('post_click_interaction/',views.click_update_Interaction),
    path('post_like_comment_update_interaction/',views.like_comment_update_interaction),
    path('dislike/',views.dislike),
    path('like_check/',views.like_check),
    path('comments_get/<int:post_id>/',views.comments),
    path('comment_get/',views.comment)
]
