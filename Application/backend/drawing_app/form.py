from django import forms
from .models import *

class InterestForm(forms.ModelForm):
    class Meta:
        model = Interest
        fields = ["interest_name"]

class ProfileForm(forms.ModelForm):
    interest = forms.ModelMultipleChoiceField(
        queryset=Interest.objects.all(), widget=forms.CheckboxSelectMultiple, required=False)
    profile_pic = forms.ImageField(required=False)
    class Meta:
        model = Profile
        fields = ['profile_pic','fname','lname','occupation','location','interest','aboutMe']

class RoomForm(forms.ModelForm):
    class Meta:
        model = Room
        fields = ['room_name', 'roomBackground', 'host']