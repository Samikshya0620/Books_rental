from rest_framework.permissions import BasePermission
from django.conf import settings
import jwt
from .models import *

class IsAuthenticatedAndTokenValid(BasePermission):
    def has_permission(self, request, view):
        authorization_header = request.headers.get('Authorization')
        if not authorization_header:
            return False
        try:
            access_token = authorization_header.split(' ')[1]
            payload = jwt.decode(access_token, settings.SECRET_KEY, algorithms=['HS256'])
            user_id = payload['user_id']
            user = User.objects.get(id=user_id)
            request.user = user
            return True
        except:
            return False