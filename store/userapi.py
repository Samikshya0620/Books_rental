from django.shortcuts import render,redirect
from django.contrib.auth import authenticate,login
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import *
from passlib.hash import bcrypt
from .serializers import *
from .forms import CustomUserForm
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.hashers import check_password
import io
from rest_framework.generics import GenericAPIView
from .serializers import *
from django.views.decorators.csrf import csrf_exempt
from rest_framework.exceptions import AuthenticationFailed
import json
from rest_framework.views import APIView
from rest_framework.mixins import ListModelMixin,RetrieveModelMixin,CreateModelMixin
def user_api(request):
    if (request.method == 'GET'):
        json_data = request.body
        stream = io.BytesIO(json_data)
        python_data = JSONParser().parse(stream)
        id =python_data.get('id')
        if id is not None:
            usr = User.objects.get(id=id)
            serializer = UserSerializer(usr)
            json_data = JSONRenderer().render(serializer.data)
            return HttpResponse(json_data,content_type ='application/json')
        

    if request.method =='POST':
        json_data = request.body
        serializer = UserSerializer(data=json.loads(json_data))
            #json_data = request.body
            #json_data = request.body
            #stream = io.BytesIO(json_data)
            #python_data = JSONParser().parse(stream)
            #serializer = UserSerializer(data =python_data)
        if serializer.is_valid():
            serializer.save()
            res ={'msg':'Data Inserted Successfully.'}
            json_data = JSONRenderer().render(res)
            return HttpResponse(json_data,content_type ='application/json')

    #return HttpResponse(JSONRenderer().render(serializer.errors),content_type ='application/json')