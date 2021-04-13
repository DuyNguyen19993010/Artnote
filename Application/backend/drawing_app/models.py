from django.db import models
from django.contrib.auth.models import User
# Create your models here.
from django.db import models
import uuid
from django.utils.timezone import now
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
# ----------------------------------------------------------------Room and canvases---------------------------------------------------
class Room(models.Model):
    room_name = models.CharField(max_length=30)
    roomBackground = models.ImageField(blank=True, default=None)
    host = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.room_name

class Layer(models.Model):
    class Meta:
        unique_together = ('canvas','index')
    canvas = models.ForeignKey(Room, on_delete=models.CASCADE)
    index = models.IntegerField(blank = False,default = 0)
    def __str__(self):
        return (str(self.canvas)+"-Layer "+str(self.index))


class Member(models.Model):
    class Meta:
        unique_together = ('room','user')
    room = models.ForeignKey(
        Room, on_delete=models.CASCADE)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE)

    def __str__(self):
        return (str(self.user) + " is a member of " + (str(self.room)))
# -----------------------------------Posts---------------------------------------
class Post(models.Model):
    user= models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField(blank = True, default= None)
    interaction = models.IntegerField(blank= False, default = 0)
    current_interaction = models.IntegerField(blank =False,default=0)
    last_interaction = models.IntegerField(blank = False , default = 0)
    last_update_date = models.DateTimeField(default = now)
    published_date = models.DateTimeField(default = now)
class Like(models.Model):
    class Meta:
        unique_together = ('user','post')
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    comment = models.TextField(max_length=1024,blank=False, default="")