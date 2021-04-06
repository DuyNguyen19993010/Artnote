from django.urls import re_path

from . import consumers

websocket_urlpatterns = [
    re_path(r'^Room/(?P<room_name>\w+)/$', consumers.ChatConsumer.as_asgi()),
    re_path(r'^Canvas/(?P<canvas_id>\w+)/$', consumers.CanvasConsumer.as_asgi()),
    re_path(r'^DrawingRoom/(?P<room_name>\w+)/$', consumers.LayerConsumer.as_asgi()),
]
