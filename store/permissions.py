from rest_framework.permissions import BasePermission
from django.conf import settings
from rest_framework.response import Response
import jwt
from .models import *
from .tokens import *
from datetime import *

class IsAuthenticatedAndTokenValid(BasePermission):
    def has_permission(self, request, view):
        auth_header = request.headers.get('Authorization', '')
        token = auth_header.split(' ')[1]
        try:
        # Verify the access token
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])

        # Check if the access token has expired
            exp = payload.get('access_token_exp')
            
            exp_datetime = datetime.strptime(exp, '%Y-%m-%d %H:%M:%S')
            exp_timestamp = exp_datetime.timestamp()
            now = datetime.now().timestamp()

            if now > exp_timestamp:
            # Access token has expired, try to refresh it
                new_token = refresh_access_token(request)
                if new_token:
                # Return the new access token in the response
                    return Response({'access_token': new_token}, status=200)
                else:
                # Refresh token has expired or is invalid, log the user out
                    return Response({'message': 'Invalid token'}, status=401)

        # Access token is valid, continue with the request
            user_id = payload['user_id']
            user = User.objects.get(id=user_id)
            return user_id
            #({'message': f'Hello, {user.username}!'}, status=200)

        except jwt.exceptions.ExpiredSignatureError:
        # Access token has expired, try to refresh it
            new_token = refresh_access_token(request)
            if new_token:
            # Return the new access token in the response
                return Response({'access_token': new_token}, status=200)
            else:
            # Refresh token has expired or is invalid, log the user out
                return Response({'message': 'Invalid token'}, status=401)

        except jwt.exceptions.DecodeError:
        # Token is invalid
            return Response({'message': 'Invalid token'}, status=401)

        except User.DoesNotExist:
        # User not found
            return Response({'message': 'User not found'}, status=404)
        