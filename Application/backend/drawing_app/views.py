from django.shortcuts import render
from django.http import JsonResponse
# Django rest frame work
from rest_framework import viewsets 
# Create your views here.
from django.shortcuts import render
# Library
from django.http import QueryDict
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
    def create(self, request , *arg, **kwargs):
        room_name = request.POST['room_name']
        roomBackground = request.data['roomBackground']
        host = User.objects.get(pk = request.POST['host'])
        room = Room.objects.create(host= host , room_name = room_name,roomBackground = roomBackground)
        Member.objects.create(room = room,user = host)
        room = RoomSerializer(room)
        return JsonResponse(room.data,safe =  False)
def room_get(request,room_id):
    room_queryset = Room.objects.get(pk = room_id)
    room = RoomSerializer(room_queryset)
    return JsonResponse(room.data)

@csrf_exempt
def joinedRoom(request):
        # --------------------Find room that this member has joined--------------------
        roomJoinedQuery = Member.objects.filter(user = User.objects.get(pk=request.POST['user']))
        # -------------------------Serializes to get all the room ids------------------
        joinedRooms = joinedRoomSerializer(roomJoinedQuery,many=True)
        # ---------------Store room ids in a list for filtering-------------
        room_ids = [None] * len(joinedRooms.data)
        for i in range(0, len(room_ids)):
            room_ids[i] = joinedRooms.data[i]['room']
        # ---------------------Query the rooms in the list----------------------
        roomQuery= Room.objects.filter(pk__in=room_ids)
        rooms = RoomSerializer(roomQuery,many=True)
        print(rooms.data)
        # ---------------------Adding backend's server domain to image url---------------
        for i in range(0,len(rooms.data)):
            rooms.data[i]['roomBackground'] = 'http://'+ request.META['HTTP_HOST'] +rooms.data[i]['roomBackground'] 
        return JsonResponse(rooms.data,safe=False) 

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
# -----------------------Profile viewsets------------------------
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
def profile_get(request,user_id):
    user_queryset = User.objects.get(pk = user_id)
    profile_queryset = Profile.objects.get(user= user_queryset)
    user = UserSerializer(user_queryset)
    prof= ProfileSerializer(profile_queryset)
    return JsonResponse({"profile":prof.data,"user":user.data})


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
    def delete(self, request , *arg, **kwargs):
        data = request.data
        Member.objects.get(user = User.objects.get(pk = data['user']),room = Room.objects.get(pk=data['room'])).delete()
        roomQuery = Room.objects.get(pk =data['room'])
        # Check if theres anyone else left as a member of the room ,delete the room if there isnt anyone
        noOfMemQuery = Member.objects.filter(room = roomQuery)
        NumRoomMember = len(MemberSerializer(noOfMemQuery,many=True).data)
        if(NumRoomMember <= 0):
            roomQuery.delete()
        return JsonResponse({"Delete":"success"})
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


        


    


