from django.contrib import admin
from django.urls import path, include
from drawing_app.views import CustomObtainAuthToken
from rest_framework.authtoken.views import obtain_auth_token
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include("drawing_app.urls")),
    path('auth/',CustomObtainAuthToken.as_view())
]
