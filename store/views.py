from django.shortcuts import render,redirect
from .models import *
from .serializers import *
from .forms import CustomUserForm
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from django.http import HttpResponse, JsonResponse
import io
from .serializers import *
from django.views.decorators.csrf import csrf_exempt
import json


# Create your views here.
def home(request):
    return render(request,"store/index.html")


def collections(request):
    category = Category.objects.filter(status=0)
    context = {"category":category}
    return render(request,"store/collections.html", context)


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


def user_detail(request):
    usr = User.objects.all()
    serializer = UserSerializer(usr,many = True)
    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data,content_type ='application/json')
    #return JsonResponse(serializer.data, safe = False)

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
    
        
"""
def login(request):
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']
        firstname = request.POST['firstname']
        middlename = request.POST['middlename']
        lastname = request.POST['lastname']
        phonenumber = request.POST['phonenumber']
        email = request.POST['email']
        
        #print(name,email,phone,desc)
        ins = User(username=username, password = password, firstname = firstname, middlename = middlename ,lastname =lastname,phonenumber= phonenumber,email= email)
        ins.save()
        print("The data has been written to the db")

    #return HttpResponse("This is my contact page (/contact)")
    return render(request,"store/userslogin.html")

"""

def signup(request):
    return render(request,"store/signup.html")
    

def signin(request):
    return render(request,"store/signin.html")


def signout(request):
    pass