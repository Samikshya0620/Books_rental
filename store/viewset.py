from rest_framework import viewsets
from .serializers import *
from .models import *
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from rest_framework_simplejwt.authentication import JWTAuthentication

class UserViewset(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class =[UserSerializer]
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
