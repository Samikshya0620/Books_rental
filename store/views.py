from django.shortcuts import render,redirect
from django.contrib.auth import authenticate,login
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *
from .serializers import *
from .forms import CustomUserForm
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.hashers import check_password
import io
from .serializers import *
from django.views.decorators.csrf import csrf_exempt
from rest_framework.exceptions import AuthenticationFailed
import json


# Create your views here.
def home(request):
    return render(request,"store/index.html")


def collections(request):
    category = Category.objects.filter(status=0)
    context = {"category":category}
    return render(request,"store/collections.html", context)

@api_view(['GET','POST'])
def register(request):
    if request.method == 'POST':
        form = CustomUserForm(request.POST)
        if form.is_valid():
            user= form.save()
            return redirect('register',user.pk)
            # Do something here.
    else:
        form = CustomUserForm()
    return render(request, 'store/add_user.html', {'form': form})

def getuser(request):
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


def user_detail(request):
    usr = User.objects.all()
    serializer = UserSerializer(usr,many = True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data,content_type ='application/json')
'''
    if (request.method == 'GET'):
        json_data = request.body
        stream = io.BytesIO(json_data)
        python_data = JSONParser().parse(stream)
        id =python_data.get('id')
        if id is not None:
            usr = User.objects.all()
            serializer = UserSerializer(usr,many = True)
            json_data = JSONRenderer().render(serializer.data)
            return HttpResponse(json_data,content_type ='application/json')
    #return JsonResponse(serializer.data, safe = False)
'''
@csrf_exempt
def user_create(request):
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

        return HttpResponse(JSONRenderer().render(serializer.errors),content_type ='application/json')
    
#@api_view(['POST'])
def login_view(request):
   if request.method == "POST":
       try:
           data =json.loads(request.body)
           
       except json.JSONDecodeError:
           return JsonResponse({'ERROR':'Invalid request data'})
       user = data.get('username')
       passw= data.get('password')
       print("username:",user)
       print("password:",passw)
       print(type(passw))
       try:
            print("Hello")
            
            usr = User.objects.filter(username = user)
            serializer = UserSerializer(usr,many = True)
            json_data = JSONRenderer().render(serializer.data)
            #print(type(json_data))
            print(json_data)
            u_dict = json.loads(json_data.decode('utf-8'))
            a = u_dict[0]
            dbuser=a.get("username")
            dbpass = a.get("password")
            print(dbuser,dbpass)
            print(type(dbpass))
            if ((dbpass == passw) and (dbuser == user)):
                return JsonResponse({'token': 'Success'})
            else:
                return JsonResponse({'error':'Invalid username or password'})
       except:
            return JsonResponse({'error':'Invalid request method'})

        



def signup(request):
    return render(request,"store/signup.html")
    

def signin(request):
    return render(request,"store/signin.html")


def signout(request):
    pass