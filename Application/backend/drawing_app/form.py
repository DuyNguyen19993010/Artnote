from django import forms
from .models import *

class InterestForm(forms.ModelForm):
    class Meta:
        model = Interest
        fields = ["interest_name"]

class ProfileForm(forms.ModelForm):
    profile_pic = forms.ImageField(required=False)
    class Meta:
        model = Profile
        fields = ['profile_pic','fname','lname','occupation','location','aboutMe']

class RoomForm(forms.ModelForm):
    class Meta:
        model = Room
        fields = ['room_name', 'roomBackground', 'host']
class LayerForm(forms.ModelForm):
    class Meta:
        model = Layer
        fields = ['image']