from rest_framework import serializers
from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields='__all__'
"""
class UserSerializer(serializers.Serializer):
    #id = serializers.CharField()
    username = serializers.CharField(max_length=100)
    password = serializers.CharField(max_length=30)
    #password = make_password(password)
    firstname = serializers.CharField(max_length=100)
    middlename = serializers.CharField(max_length=100)
    lastname = serializers.CharField(max_length=100)
    #phone_regex = RegexValidator(regex=r'^\+?977?\d{10}$', message="Phone number must be entered in the format: '+999999999'. Up to 10 digits allowed.")
    #phonenumber = serializers.CharField(validators=[phone_regex], max_length=14, blank=True)
    email =  serializers.EmailField()

def create(self,validate_data):
    return User.objects.create(**validate_data)
    """