from django.shortcuts import render
from django.http import JsonResponse
# Create your views here.
from django.shortcuts import render
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
# -------------------Room views---------------------------
# GET
def room_get(request,room_id):
    room_queryset = Room.objects.get(pk = room_id )
    rooms = RoomSerializer(room_queryset)
    return JsonResponse(rooms.data)
    
# POST
def room_post(request):
    room_form = RoomForm(request.POST,request.FILES)


    print("This is room post")
# PUT
def room_put(request):
    print("This is room put")
# DELETE
def room_delete(request):
    print("This is room delete")

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
# ---------------------Profile views-------------------------
# Log in
@csrf_exempt
def login_view(request):
    user_form = AuthenticationForm(data = request.POST)
    if(user_form.is_valid()):
        user = user_form.get_user()
        login(request,user)
        return JsonResponse({"login":True})
    else:
        return JsonResponse({"Status":"Not logged in"})
# Registration
@csrf_exempt
def registration_view(request):
    user_form = UserCreationForm(request.POST)
    registration_form = ProfileForm(request.POST, request.FILES)
    if(user_form.is_valid() and registration_form.is_valid()):
        user = user_form.save()
        profile = registration_form.save(False)
        profile.user = user
        profile.save()
        registration_form.save_m2m()
        login(request,user)

        return JsonResponse({"id":user.id,"login":True})
    else:
        return JsonResponse({"Status":"Not logged in"})
# Log out
def logout_view(request):
    if(request.user.is_authenticated):
        print("Logging out")
        logout(request)
        return JsonResponse({"login":False})
    else:
        print("Can not Log out")

        return JsonResponse({"login":True})
        


    


