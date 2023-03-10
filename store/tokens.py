import jwt
from django.conf import settings
from datetime import *
from .models import *
import json
from django.http import JsonResponse
from rest_framework import status

class CustomJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        
        return obj.strftime('%Y-%m-%d %H:%M:%S')
        return json.JSONEncoder.default(self, obj)
def generate_tokens(userv):
    access_token_exp = datetime.datetime.now() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRATION_MINUTES)
    refresh_token_exp = datetime.datetime.now() + timedelta(days=settings.REFRESH_TOKEN_EXPIRATION_DAYS)
    access_payload = {
    'user_id': userv.id,
    'username': userv.username,
    'firstname':userv.firstname,
    'lastname':userv.lastname,
    'email':userv.email,
    'access_token_exp': access_token_exp,
}

# Payload for refresh token
    refresh_payload = {
    'user_id': userv.id,
    'username': userv.username,
    'firstname':userv.firstname,
    'lastname':userv.lastname,
    'email':userv.email,
    'refresh_token_exp': refresh_token_exp,
}

    access_token = jwt.encode(access_payload, settings.SECRET_KEY, algorithm='HS256',json_encoder=CustomJSONEncoder)
    refresh_token = jwt.encode(refresh_payload, settings.SECRET_KEY, algorithm='HS256',json_encoder=CustomJSONEncoder)
    
    return access_token, refresh_token

def refresh_access_token(refresh_token):
    try:
        payload = jwt.decode(refresh_token, settings.SECRET_KEY, algorithms=['HS256'])
        user_id = payload['user_id']
        user = User.objects.get(id=user_id)
        new_access_token, _ = generate_tokens(user)
        return new_access_token
    except jwt.ExpiredSignatureError:
        # Refresh token has expired
        return None
    except jwt.exceptions.DecodeError:
        # Token is invalid
        return None
    except User.DoesNotExist:
        # User not found
        return None