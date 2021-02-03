from django.shortcuts import render
from django.http import JsonResponse
# Django rest frame work
from rest_framework import viewsets 
# Create your views here.
from django.shortcuts import render
# decorator
from rest_framework.decorators import action
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
# -------------------------Parser--------------------------
from rest_framework.parsers import MultiPartParser,FormParser,FileUploadParser,JSONParser
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
    def post(self, request , *arg, **kwargs):
        room_name = request.POST['room_name']
        roomBackground = request.POST['roomBackground']
        host = User.objects.get(pk = request.POST['host'])
        Profile.objects.create(fname = fname, lname =lname , occupation = occupation)
        return JsonResponse({"hey":"Working"})
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
    def post(self, request , *arg, **kwargs):
        fname = request.POST['fname']
        lname = request.POST['lname']
        occupation = request.POST['occupation']
        location = request.POST['location']
        aboutMe = request.POST['aboutMe']
        user = User.objects.get(pk =  request.POST['user'])
        profile_pic = request.data['profile_pic']
        new_profile = Profile.objects.create(fname = fname, lname =lname , occupation = occupation,location= location,aboutMe =aboutMe,user = user , profile_pic = profile_pic)
        new_profile = ProfileSerializer(new_profile)
        return JsonResponse(new_profile.data)


# -------------------------Interest viewsets-------------------
class InterestViewSet(viewsets.ModelViewSet):
    queryset = Interest.objects.all()
    serializer_class = InterestSerializer
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated,] 
# ---------------------Member views--------------------------
class MemberViewSet(viewsets.ModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated,]
    def post(self, request , *arg, **kwargs):
        user_req = request.POST['user']
        room_req = request.POST['room']
        user = User.objects.get(pk = user_req)
        room = Room.objects.get(pk = room_req)
        new_member = Member.objects.create(user = user , room = room)
        new_member = MemberSerializer(new_member)
        return JsonResponse(new_member.data)
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


        


    


