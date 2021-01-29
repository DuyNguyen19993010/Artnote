from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','password']
        extra_kwargs = {'password':{'write_only':True,'required':True}}
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user = user)
        return user
class InterestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interest
        fields = '__all__'
class ProfileSerializer(serializers.ModelSerializer):
    interest =  InterestSerializer()
    class Meta:
        model = Profile
        fields = ['user','fname','lname','occupation','location', 'aboutMe','interest']
    def create(self, validated_data):
        # print(validated_data['interest'])
        interests = validated_data.pop('interest')
        profile = Profile.objects.create(**validated_data)
        for interest in interests:
            profile.interest.add(interest)
        
        return profile