from django.db import models
from django.contrib.auth.models import User
# Create your models here.
from django.db import models
import uuid
# Create your models here.
def image_upload_path(instance , filename):
    return '/'.join(['images' ])
# ------------------------------------------------------------------Profile----------------------------------------------------------------


class Interest(models.Model):
    interest_name = models.CharField(max_length=100)

    def __str__(self):
        return self.interest_name


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_pic = models.ImageField(blank=True, default=None)
    fname = models.CharField(max_length=100)
    lname = models.CharField(max_length=100)
    occupation = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    aboutMe = models.TextField(max_length=256)

    def __str__(self):
        return (self.fname + " "+self.lname)


class Follow(models.Model):
    user = models.ForeignKey(
        User, related_name="follower", on_delete=models.CASCADE, blank=True, default=None)
    following = models.ForeignKey(
        User, related_name="following", on_delete=models.CASCADE, blank=True, default=None)
    follow_date = models.DateTimeField(
        auto_now_add=True, blank=True)
# ----------------------------------------------------------------Room and canvases---------------------------------------------------
class Room(models.Model):
    room_name = models.CharField(max_length=30)
    roomBackground = models.ImageField(blank=True, default=None)
    host = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.room_name

class Canvas(models.Model):
    canvas_name = models.CharField(max_length=30)
    room = models.OneToOneField(
        Room, on_delete=models.CASCADE, blank=True, null=True, default=None)


class Layer(models.Model):
    canvas = models.ForeignKey(Canvas, on_delete=models.CASCADE)
    image = models.ImageField(blank=True, default=None)
    index = models.IntegerField(blank = False,default = 0)


class Member(models.Model):
    class Meta:
        unique_together = ('room','user')
    room = models.ForeignKey(
        Room, on_delete=models.CASCADE)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE)

    def __str__(self):
        return (str(self.user) + " is a member of " + (str(self.room)))
# -------------------------------------------------------------Request----------------------------------------------------------------


class Request(models.Model):
    class Meta:
        unique_together = ('requester', 'room')
    requester = models.OneToOneField(Profile, on_delete=models.CASCADE)
    room = models.OneToOneField(Room, on_delete=models.CASCADE)


class JoinRequest(Request):
    def __str__(self):
        return (str(self.requester)+" request to join "+str(self.room))


class Invite(Request):
    invited = models.OneToOneField(Profile, on_delete=models.CASCADE)

    def __str__(self):
        return (str(self.requester)+" invited " + self.invited + " to join "+str(self.room))
