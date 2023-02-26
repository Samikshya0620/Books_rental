from django.shortcuts import render,redirect
from django.core.exceptions import ObjectDoesNotExist
import jwt
import base64
from django.core.files.storage import default_storage
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import AccessToken,RefreshToken
from rest_framework.response import Response
from rest_framework import status
from .models import *
from rest_framework.permissions import IsAuthenticated
from .permissions import IsAuthenticatedAndTokenValid
from .serializers import *
import datetime
#from rest_framework_simplejwt.views import TokenObtainPairView
from .forms import CustomUserForm
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.hashers import check_password
import io
from rest_framework.generics import GenericAPIView
from .serializers import *
from django.views.decorators.csrf import csrf_exempt
import json
from rest_framework.views import APIView
from rest_framework.mixins import ListModelMixin,RetrieveModelMixin,CreateModelMixin
from .tokens import *

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

class CustomJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        
        return obj.strftime('%Y-%m-%d %H:%M:%S')
        return json.JSONEncoder.default(self, obj)

def login_view(request):
   if request.method == "POST":
       try:
           data =json.loads(request.body)
           
       except json.JSONDecodeError:
           return JsonResponse({'ERROR':'Invalid request data'})
       user = data.get('username')
       passw= data.get('password')
       #pss = print(make_password(passw))
       
    #    try:
       #usr = User.objects.filter(username = user)  
       
       userv = User.objects.filter(username = user).first()

       #serializer = UserSerializer(usr,many = True)
       #json_data = JSONRenderer().render(serializer.data)
        #print(type(json_data))
       #print(json_data)
       #u_dict = json.loads(json_data.decode('utf-8'))
       #a = u_dict[0]
       #dbuser=a.get("username")
       #dbpass = a.get("password")
       #did = a.get("id")
       #print(dbuser,dbpass)
       #print(type(dbpass))
       if ((userv.username == user) and check_password(passw,userv.password)):

            access_token ,refresh_token =generate_tokens(userv) 
            response = JsonResponse({'access_token': access_token, 'refresh_token': refresh_token}, status=status.HTTP_200_OK)
            return response
            
            """
            access_token_exp = datetime.datetime.now() + datetime.timedelta(minutes=1)
            refresh_token_exp = datetime.datetime.now() + datetime.timedelta(days=7)

            payload = {
                
                'user_id': userv.id,
                'username': userv.username,
                'access_token_exp': access_token_exp,
                'refresh_token_exp': refresh_token_exp,
            }
            access_token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256',json_encoder=CustomJSONEncoder)
            refresh_token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256',json_encoder=CustomJSONEncoder)

            # Return tokens to the client
            response = JsonResponse({'access_token': access_token, 'refresh_token': refresh_token}, status=status.HTTP_200_OK)
            return response
        """
       else:
            return JsonResponse({'message': 'Invalid username or password'}, status=status.HTTP_401_UNAUTHORIZED)
   else:
        return JsonResponse({'message': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)

    #    except:
    #         return JsonResponse({'error':'Invalid request method'})
   
@api_view(['GET','POST'])
def userapi(request):
    if(request.method == 'GET'):
        usr = User.objects.all()
        serializer = UserSerializer(usr,many = True)
        return Response(serializer.data)
    
    if(request.method =='POST'):
        data = request.data
        data['password'] = make_password(data['password'])
        serializer = UserSerializer(data = data)
        if serializer.is_valid():
            serializer.save()
            res ={'msg':'Data has been created successfully'}
            return Response(res)
        return Response({'msg':serializer.errors})
    
@api_view(['GET','POST'])
def bookapi(request):
    if(request.method == 'GET'):
        usr = Book.objects.all()
        serializer = BookSerializer(usr,many = True)
        return Response(serializer.data)
    
    if(request.method =='POST'):
        data = request.data
        serializer = BookSerializer(data = data)
        if serializer.is_valid():
            serializer.save()
            res ={'msg':'Data has been created successfully'}
            return Response(res)
        return Response({'msg':serializer.errors})


@api_view(['GET','POST'])
def categoryapi(request):
    if(request.method == 'GET'):
        categories = Category.objects.all()
        serialized_data = []
    for category in categories:
        image_path = category.image.path
        with default_storage.open(image_path, 'rb') as f:
            image_data = f.read()
        category_data = CategorySerializer(category).data
        category_data['image'] = base64.b64encode(image_data).decode('utf-8')
        serialized_data.append(category_data)
    return Response(serialized_data)
    #serializer = CategorySerializer(usr,many = True)
    if(request.method =='POST'):
        data = request.data
        serializer = CategorySerializer(data = data)
        if serializer.is_valid():
            serializer.save()
            res ={'msg':'Data has been created successfully'}
            return Response(res)
        return Response({'msg':serializer.errors})
    
    
class UserAPI(APIView):
    def get(self,request):
        usr = User.objects.all()
        serializer = UserSerializer(usr,many = True)
        return Response(serializer.data)

    def post(self,request):
        data = request.data
        serializer = UserSerializer(data = data)
        if serializer.is_valid():
            serializer.save()
            res ={'msg':'Data has been created successfully'}
            return Response(res)
        return Response({'msg':serializer.errors})
    
    def delete(self,request):
        usr = request.data
        id = usr.get('id')
        usr = User.objects.get(id=id)
        usr.delete
        res ={'msg':'Data has been deleted successfully'}
        return Response(res)
    

class UserList(GenericAPIView,ListModelMixin):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get(self ,request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

class UserRetrieve(GenericAPIView,RetrieveModelMixin):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get(self ,request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)


class UserCreate(GenericAPIView,CreateModelMixin):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def post(self ,request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class CartAPI(APIView):
    permission_classes = [IsAuthenticatedAndTokenValid]

    def get(self,request):
        auth_header = request.headers.get('Authorization', '')
        token = auth_header.split(' ')[1]
        
        
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        user_id= payload.get('user_id')
        usr = Cart.objects.filter(user_id = user_id)
        serializer = CartSerializer(usr,many = True)
        return Response(serializer.data)

    def post(self,request):
        data = request.data
        serializer = CartSerializer(data = data)
        if serializer.is_valid():
            serializer.save()
            res ={'msg':'Data has been created successfully'}
            return Response(res)
        return Response({'msg':serializer.errors})
    
    def delete(self,request):
        usr = request.data
        id = usr.get('id')
        usr = Cart.objects.get(id=id)
        usr.delete
        res ={'msg':'Data has been deleted successfully'}
        return Response(res)




