from django.shortcuts import render,redirect
from .models import *
from .forms import CustomUserForm

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