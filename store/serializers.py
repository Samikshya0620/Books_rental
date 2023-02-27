from rest_framework import serializers
from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields='__all__' 

        def update(self,instance,validated_data):
            instance.id = validated_data.get('id',instance.id)
            instance.username = validated_data.get("username",instance.username)
            instance.firstname = validated_data.get("username",instance.firstname)
            instance.namename = validated_data.get("username",instance.middlename)
            instance.lastname = validated_data.get("username",instance.lastname)
            instance.email = validated_data.get("username",instance.email)
            instance.save()
            return instance



class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields='__all__' 



class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields='__all__' 



class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'
    

       




