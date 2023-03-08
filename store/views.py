from django.shortcuts import render,redirect
from django.core.exceptions import ObjectDoesNotExist
import jwt
from django.contrib import messages
from django.contrib.auth import get_user_model
from django.utils.http import urlsafe_base64_encode
from django.shortcuts import get_object_or_404
from django.utils.http import urlsafe_base64_decode
from django.core.mail import send_mail
from rest_framework.exceptions import NotFound
from django.contrib.auth.views import PasswordResetConfirmView
from rest_framework.renderers import JSONRenderer
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
from rest_framework import serializers
from .serializers import *
import datetime
#from rest_framework_simplejwt.views import TokenObtainPairView
from .forms import CustomUserForm
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from django.http import HttpResponse, JsonResponse
from django.core.serializers import serialize
from django.contrib.auth.hashers import check_password
import io
from rest_framework.generics import GenericAPIView
from .serializers import *
from django.contrib.auth.tokens import default_token_generator
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
        books = Book.objects.filter(status = True)
        serialized_data = []
        for book in books:
            image_path = book.image.path
            with default_storage.open(image_path, 'rb') as f:
                image_data = f.read()
            book_data = BookSerializer(book).data
            book_data['image'] = base64.b64encode(image_data).decode('utf-8')
            serialized_data.append(book_data)
        return Response(serialized_data)
    
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
        categories = Category.objects.filter(status = True)
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
        usrname = data.get('username')
        eml = data.get('email')
        if User.objects.filter(username=usrname).exists():
            error_msg = {'error': 'User with this username already exists.'}
            if User.objects.filter(email=eml).exists():
                error_msg = {'error': 'User with this email or username already exists.'}
                return JsonResponse(error_msg, status=400)
            return JsonResponse(error_msg, status=400)            
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
    def get(self, request):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return Response({'message': 'Please sign in.'}, status=401)

        try:      
            token = auth_header.split(' ')[1]
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        except (jwt.DecodeError, IndexError):
            return Response({'error': 'Invalid Token'}, status=status.HTTP_401_UNAUTHORIZED)
        user_id = payload.get('user_id')
        usr = Cart.objects.filter(user_id=user_id)
        
        books_data = []
        for cart in usr:
            book = cart.book_id
            image_data = None
            if book.image:
                with open(book.image.path, "rb") as image_file:
                    image_data = base64.b64encode(image_file.read()).decode('utf-8')
                book_data = {
                    'id': book.id,
                    'name': book.name,
                    'price': book.price,
                    'image_data': image_data,
                    'quantity': cart.quantity,
                    'total':book.price* cart.quantity
                }
                books_data.append(book_data)

# return the list of book dictionaries as a JSON response
        return Response({'books': books_data})
    
    
    def delete(self,request):
        book_id = request.data.get('book_id')
        user_id = request.data.get('user_id')
        try:
            cart_obj = Cart.objects.get(book_id=book_id, user_id=user_id)
            cart_obj.quantity = cart_obj.quantity - 1

            if cart_obj.quantity <= 0:
                cart_obj.delete()
                return Response({'success':'deleted'})
                
            cart_obj.save()
            serializer = CartSerializer(cart_obj)
            
            return Response(serializer.data)
        except Cart.DoesNotExist:
            return Response(status=404)

class CAPI(APIView):
    permission_classes = [IsAuthenticatedAndTokenValid]
    def post(self, request):
        auth_header = request.headers.get('Authorization', '')

        if not auth_header:
            return Response({'message': 'Please sign in.'}, status=401)

        
        token = auth_header.split(' ')[1]
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        user_id = payload.get('user_id')
        serializer = CartSerializer(data=request.data)
        if serializer.is_valid():
            book_id = serializer.validated_data['book_id']
            user_id = serializer.validated_data['user_id']
            quantity = serializer.validated_data['quantity']
            
        # check if a cart item with the same book and user already exists
            try:
                cart_item = Cart.objects.get(book_id=book_id, user_id=user_id)
                cart_item.quantity += quantity
                cart_item.save()
            except Cart.DoesNotExist:
                serializer.save()
            
            return Response({'success': True})
        return Response(serializer.errors, status=400)

    

class Payment(APIView):
    permission_classes = [IsAuthenticatedAndTokenValid]
    def post(self, request):
        auth_header = request.headers.get('Authorization', '')

        if not auth_header:
            return Response({'message': 'Please sign in.'}, status=401)

        
        token = auth_header.split(' ')[1]
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        user_id = payload.get('user_id')
        
        
        serializer = PaymentSerializer(data=request.data)
        itemserializer= FinalItemSerializer(idata = request.data.items)
        print(itemserializer)
        
        if serializer.is_valid():
            user_id = serializer.validated_data['user_id']
            firstname = serializer.validated_data['firstname']
            lastname = serializer.validated_data['lastname']
            address = serializer.validated_data['address']
            city = serializer.validated_data['city']
            state = serializer.validated_data['state']
            paymentmethod = serializer.validated_data['paymentmethod']
        
            print(firstname,lastname,address,city,state,paymentmethod)
            serializer.save()
            return Response({'Data added Successfully.': True}, status=status.HTTP_200_OK)
        # else:
        #     return Response({'Error': 'Data could not be saved in payment'}, status=status.HTTP_400_BAD_REQUEST)
         
 
            
class Paymentitem(APIView):
    permission_classes = [IsAuthenticatedAndTokenValid]
    
    def post(self, request):
        auth_header = request.headers.get('Authorization', '')

        if not auth_header:
            return Response({'message': 'Please sign in.'}, status=401)

        token = auth_header.split(' ')[1]
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        user_id = payload.get('user_id')
        data = request.data
        user = User.objects.get(id=user_id)

        payment_data = {
            'user_id': user.id,
            'firstname': data['firstname'],
            'lastname': data['lastname'],
            'address': data['address'],
            'city': data['city'],
            'state': data['state'],
            'paymentmethod': data['paymentmethod']
        }

        payment_serializer = PaymentSerializer(data=payment_data)

        if payment_serializer.is_valid():
            payment = payment_serializer.save()
        else:
            return Response(payment_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        final_items_data = data['items']
        print(final_items_data)
        
        for item_data in final_items_data:
            item = {
                'user_id':user.id,
                'productid': item_data['productid'],
                'name': item_data['name'],
                'price': item_data['price'],
                'quantity': item_data['quantity'],
                'total': item_data['total']
            }
            print(item_data['productid'])
            final_items_serializer = FinalItemSerializer(data=item)

            if final_items_serializer.is_valid():
                final_items_serializer.save()
                         
            else:
                payment.delete()
                return Response(final_items_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        cart_obj = Cart.objects.filter(user_id=user_id)
        cart_obj.delete()
        return Response({'Data added Successfully.': True}, status=status.HTTP_200_OK)

    
  
class PassAPI(APIView):
    def post(self,request):
        data = request.data  
        email = data.get('email')
        print(email)
        try:
            user = User.objects.get(email=email)
            #print(user.email)
        except :
            return Response({'Error': 'User doesnot exist'}, status=status.HTTP_400_BAD_REQUEST)
            # If the user doesn't exist, don't give away that fact to potential attackers
            
        else:
            if user:
                uidb64 = urlsafe_base64_encode(str(user.pk).encode())
                token = user.generate_reset_token()
                reset_url = request.build_absolute_uri(f'/reset_password/?uidb64={uidb64}&token={token}')
                message = f'Click the following link to reset your password:\n\n{reset_url}'
                send_mail('Reset your password', message, 'from@example.com', [email])
                return Response({'Success': True}, status=status.HTTP_200_OK)
        
        return Response({'Error':'Invalid Request.'}, status=status.HTTP_400_BAD_REQUEST)
    

class PasswordResetView(APIView):
    @csrf_exempt
    def post(self, request):
        data = request.data

        uidb64 = data.get('uidb64')
        token = data.get('token')
        password = data.get('password')
        password_confirmation = data.get('password_confirmation')

        try:
            uid = urlsafe_base64_decode(uidb64).decode()
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response({'error': 'Invalid reset link'}, status=status.HTTP_400_BAD_REQUEST)

        if not default_token_generator.check_token(user, token):
            return Response({'error': 'Invalid reset link'}, status=status.HTTP_400_BAD_REQUEST)

        if password != password_confirmation:
            return Response({'error': 'Passwords do not match'}, status=status.HTTP_400_BAD_REQUEST)

        user.reset_password(password)

        return Response({'success': 'Password reset successful'}, status=status.HTTP_200_OK)



class ProfileAPI(APIView):
    permission_classes = [IsAuthenticatedAndTokenValid]
    def get(self, request):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return Response({'message': 'Please sign in.'}, status=401)

        try:      
            token = auth_header.split(' ')[1]
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        except (jwt.DecodeError, IndexError):
            return Response({'error': 'Invalid Token'}, status=status.HTTP_401_UNAUTHORIZED)
        user_id = payload.get('user_id')
        usr = FinalItem.objects.filter(user_id=user_id)
        userprofile = User.objects.filter(id = user_id).values('username', 'email', 'firstname', 'lastname').first()
        print(userprofile)
        

        serializer = FinalItemSerializer(usr,many = True)
        
        return Response(serializer.data)
    