from django.shortcuts import render
from django.http import JsonResponse
# Django rest frame work
from rest_framework import viewsets 
# Create your views here.
from django.shortcuts import render
# User authentication 
from rest_framework.authentication import  TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
# ----------------------------User account --------------------------
from .form import ProfileForm
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import login, logout
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
# ---------------------------Models--------------------------
from .models import *
# ----------------------------Serializer--------------------------
from .serializers import *
# ------------------------------Form---------------------------
from .form import *

# -------------------Room viewsets---------------------------
class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated,] 
# -----------------------User viewsets------------------------
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
# Token authentication
class CustomObtainAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super(CustomObtainAuthToken, self).post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        return Response({'token': token.key, 'id': token.user_id})
# -----------------------User viewsets------------------------
class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated,] 

# ---------------------Canvas views--------------------------
# GET
def canvas_get(request):
    print("This is canvas GET")
# POST
def canvas_post(request):
    print("This is canvas post")
# PUT
def canvas_put(request):
    print("This is canvas put")

# ---------------------Member views--------------------------
# GET
def member_get(request):
    print("This is member GET")
# POST
def member_post(request):
    print("This is member post")
# DELETE
def member_delete(request):
    print("This is member delete")

# ---------------------Request views-------------------------
# GET
def request_get(request):
    print("This is request GET")
# POST
def request_post(request):
    print("This is request post")
# DELETE
def request_delete(request):
    print("This is request delete")


        


    


