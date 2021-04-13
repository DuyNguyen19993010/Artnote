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
# ------------------------------Sorting--------------------------
from django.db.models import Q
from django.db.models import F
# -------------------------------Date----------------------------
from django.utils.timezone import now
from datetime import datetime
# Custom authorization decorator
def Custom_token_authorization(other_function):
    def new_function(request, *args, **kwargs):
        try:
            header,value=request.META['HTTP_AUTHORIZATION'].split(" ")
            user = Token.objects.filter(key = value)
            print(value)
            print(Token.objects.all())
            if(len(user)):
                return other_function(request, *args, **kwargs)
            else:
                print("No user exist")
                return JsonResponse({"Message":"You are not authorized"})   
        except:
            print("No token")
            return JsonResponse({"Message":"You are not authorized"}) 
    return new_function
# Decorator for updating all objects in the Post model
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
    @csrf_exempt
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
@Custom_token_authorization
def profile_get(request,user_id):
    user_queryset = User.objects.get(pk = user_id)
    profile_queryset = Profile.objects.get(user= user_queryset)
    posts_queryset = Post.objects.filter(user = user_queryset)
    posts = PostSerializer(posts_queryset,many=True)
    user = UserSerializer(user_queryset)
    prof= ProfileSerializer(profile_queryset)
    return JsonResponse({"profile":prof.data,"user":user.data,"posts":posts.data})


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
# ---------------------Layer views--------------------------
class LayerViewSet(viewsets.ModelViewSet):
    queryset = Layer.objects.all()
    serializer_class = LayerSerializer
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated,]

def layer_get(request, room_id):
    layer_queryset = Layer.objects.filter(canvas = room_id)
    layers= LayerSerializer(layer_queryset,many= True).data
    for layer in layers:
        layer['no'] = layer['index']
        layer['hidden'] = False
        layer['permission'] = True
    return JsonResponse({"Layers":layers})


# ---------------------Post viewsets-------------------------
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated,]
@Custom_token_authorization
def post_get(request,post_id):
    queryset = Post.objects.get(pk = post_id)
    post = PostSerializer(queryset).data
    user_id = post['user']
    user_query = User.objects.get(pk = user_id)
    profile_query = Profile.objects.get(user=user_query)
    like_query = Like.objects.filter( post = queryset)
    like_count= like_query.count()
    profile= ProfileSerializer(profile_query).data
    user = UserSerializer(user_query).data 
    response = JsonResponse({"user":user,"profile":profile,"post":post,"like":like_count})
    response['Access-Control-Allow-Origin'] = "*"
    response['Access-Control-Allow-Methods'] = "GET, POST, PUT, DELETE, PATCH"
    response['Access-Control-Allow-Headers'] ='Origin, X-Requested-With, Content-Type, Accept, Authorization'
    return response


# View for getting 4 most popular posts
@Custom_token_authorization
def post_popular_batch_get(request,index):
    # TODO: update interaction
    # ....
    update_set_queryset = Post.objects.all()
    for data in update_set_queryset:
        data_json = PostSerializer(data).data
        last_update_time = None
        try:
            fmt = '%Y-%m-%dT%H:%M:%S.%fZ'
            last_update_time = datetime.strptime(data_json['last_update_date'], fmt)
        except:
            fmt = '%Y-%m-%dT%H:%M:%SZ'
            last_update_time = datetime.strptime(data_json['last_update_date'], fmt)
        current_date = datetime.strptime(str(now().strftime(fmt)), fmt)
        minute_difference= (current_date-last_update_time).total_seconds()/60
        if(minute_difference>= 15):
            new_data = Post.objects.filter(pk=data_json['id'])
            new_data.update(interaction =F("current_interaction")-F("last_interaction"))
            new_data.update(last_interaction =F("current_interaction"))
            new_data.update(current_interaction =0)
            new_data.update(last_update_date =now())
    # Query 4 most popular post
    queryset= Post.objects.all().order_by('-interaction')[int(index):int(index)+5]
    # if Query has no object then reponse with 0 and if !=0 handle accordingly
    if(queryset.count()==0):
        queryset= Post.objects.all().order_by('-interaction')[0:5]
        posts = PostSerializer(queryset,many=True)
        preprocess_data = posts.data
        for post in preprocess_data:
            user_queryset = User.objects.get(pk = post['user'])
            profile_queryset = Profile.objects.get(user = user_queryset)
            post['user'] = ProfileSerializer(profile_queryset).data
            post['user']['user'] = {"id":post['user']['user'],"username":UserSerializer(user_queryset).data['username']}
        return JsonResponse({"Message":"Success","posts":posts.data,"reset":True})
    else:
        posts = PostSerializer(queryset,many=True)
        preprocess_data = posts.data
        for post in preprocess_data:
            user_queryset = User.objects.get(pk = post['user'])
            profile_queryset = Profile.objects.get(user = user_queryset)
            post['user'] = ProfileSerializer(profile_queryset).data
            post['user']['user'] = {"id":post['user']['user'],"username":UserSerializer(user_queryset).data['username']}
        # if query has different of object from 4 then reset index
        if(queryset.count() != 5):
            print(queryset.count())
            return JsonResponse({"Message":"Success","posts":posts.data,"reset":True})
        else:
            print(queryset.count())
            return JsonResponse({"Message":"Success","posts":posts.data,"reset":False})
# View for getting 4 most recent posts 
@csrf_exempt
@Custom_token_authorization
def post_latest_batch_get(request,index):
    # TODO: update interaction
    update_set_queryset = Post.objects.all()
    for data in update_set_queryset:
        data_json = PostSerializer(data).data
        last_update_time = None
        try:
            fmt = '%Y-%m-%dT%H:%M:%S.%fZ'
            last_update_time = datetime.strptime(data_json['last_update_date'], fmt)
        except:
            fmt = '%Y-%m-%dT%H:%M:%SZ'
            last_update_time = datetime.strptime(data_json['last_update_date'], fmt)
        current_date = datetime.strptime(str(now().strftime(fmt)), fmt)
        minute_difference= (current_date-last_update_time).total_seconds()/60
        if(minute_difference>= 15):
            new_data = Post.objects.filter(pk=data_json['id'])
            new_data.update(interaction =F("current_interaction")-F("last_interaction"))
            new_data.update(last_interaction =F("current_interaction"))
            new_data.update(current_interaction =0)
            new_data.update(last_update_date =now())
    # Query 4 latest post
    queryset= Post.objects.all().order_by('-published_date')[int(index):int(index)+5]
    # if Query has no object then reponse with 0 and if !=0 handle accordingly
    if(queryset.count()==0):
        queryset= Post.objects.all().order_by('-published_date')[0:5]
        posts = PostSerializer(queryset,many=True)
        preprocess_data = posts.data
        for post in preprocess_data:
            user_queryset = User.objects.get(pk = post['user'])
            profile_queryset = Profile.objects.get(user = user_queryset)
            post['user'] = ProfileSerializer(profile_queryset).data
            post['user']['user'] = {"id":post['user']['user'],"username":UserSerializer(user_queryset).data['username']}
        return JsonResponse({"Message":"Success","posts":posts.data,"reset":True})
    else:

        posts = PostSerializer(queryset,many=True)
        preprocess_data = posts.data
        for post in preprocess_data:
            user_queryset = User.objects.get(pk = post['user'])
            profile_queryset = Profile.objects.get(user = user_queryset)
            post['user'] = ProfileSerializer(profile_queryset).data
            post['user']['user'] = {"id":post['user']['user'],"username":UserSerializer(user_queryset).data['username']}
        # if query has different of object from 4 then reset index
        if(queryset.count() != 5):
            return JsonResponse({"Message":"Success","posts":posts.data,"reset":True})
        else:
            return JsonResponse({"Message":"Success","posts":posts.data,"reset":False})
@csrf_exempt
@Custom_token_authorization
def click_update_Interaction(request):
    Post.objects.filter(pk = request.POST['post_id']).update(current_interaction =F("current_interaction")+1)
    post = PostSerializer(Post.objects.get(pk = request.POST['post_id'])).data
    print(PostSerializer(Post.objects.all()[0]).data)
    last_update_time = None
    try:
        fmt = '%Y-%m-%dT%H:%M:%S.%fZ'
        last_update_time = datetime.strptime(post['last_update_date'], fmt)
    except:
        fmt = '%Y-%m-%dT%H:%M:%SZ'
        last_update_time = datetime.strptime(post['last_update_date'], fmt)
    current_date = datetime.strptime(str(now().strftime(fmt)), fmt)
    minute_difference= (current_date-last_update_time).total_seconds()/60
    print(minute_difference)
    if(minute_difference>= 15):
        post_object = Post.objects.filter(pk = request.POST['post_id'])
        post_object.update(interaction =F("current_interaction")-F("last_interaction"))
        post_object.update(last_interaction =F("current_interaction"))
        post_object.update(current_interaction =0)
        post_object.update(last_update_date =now())
    return JsonResponse({"Message":"Success"})

@csrf_exempt
@Custom_token_authorization
def like_comment_update_interaction(request):
    Post.objects.filter(pk = request.POST['post_id']).update(current_interaction =F("current_interaction")+2)
    post = PostSerializer(Post.objects.get(pk = request.POST['post_id'])).data
    last_update_time = None
    try:
        fmt = '%Y-%m-%dT%H:%M:%S.%fZ'
        last_update_time = datetime.strptime(post['last_update_date'], fmt)
    except:
        fmt = '%Y-%m-%dT%H:%M:%SZ'
        last_update_time = datetime.strptime(post['last_update_date'], fmt)
    current_date = datetime.strptime(str(now().strftime(fmt)), fmt)
    minute_difference= (current_date-last_update_time).total_seconds()/60
    print(minute_difference)
    if(minute_difference>= 15):
        post_object = Post.objects.filter(pk = request.POST['post_id'])
        post_object.update(interaction =F("current_interaction")-F("last_interaction"))
        post_object.update(last_interaction =F("current_interaction"))
        post_object.update(current_interaction =0)
    return JsonResponse({"Message":"Success"})
# ----------------------Like viewset---------------------------------
class LikeViewSet(viewsets.ModelViewSet):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated,]
@csrf_exempt
@Custom_token_authorization
def dislike(request):
    queryset = Like.objects.get(post = request.POST['post'],user = request.POST['user'] )
    queryset.delete()
    return JsonResponse({"Like":LikeSerializer(queryset).data})
@csrf_exempt
@Custom_token_authorization
def like_check(request):
    queryset = Like.objects.filter(post = request.POST['post'],user = request.POST['user'] )
    if(queryset.count()==0):
        return JsonResponse({"check":False})
    else:
        return JsonResponse({"check":True})
# ----------------------Comment viewset---------------------------------
class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated,]
@csrf_exempt
@Custom_token_authorization
def comments(request,post_id):
    queryset = Comment.objects.filter(post = post_id )
    comments = CommentSerializer(queryset,many=True).data
    for comment in comments:
        user_query= User.objects.get(pk = comment['user'])
        profile_query = Profile.objects.get(user = user_query)
        user = UserSerializer(user_query).data
        profile = ProfileSerializer(profile_query).data
        comment['user'] = user
        comment['profile'] = profile
    return JsonResponse({"comments":comments})
@csrf_exempt
@Custom_token_authorization
def comment(request):
    queryset = Comment.objects.get(pk = request.POST['comment_id'])
    comment = CommentSerializer(queryset).data
    user_query= User.objects.get(pk = comment['user'])
    profile_query = Profile.objects.get(user = user_query)
    user = UserSerializer(user_query).data
    profile = ProfileSerializer(profile_query).data
    comment['user'] = user
    comment['profile'] = profile
        
    return JsonResponse({"comment":comment})

    


