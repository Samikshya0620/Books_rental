from django.urls import path,include
from . import views
from store.controller import authview
#from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView,TokenVerifyView
from .views import *
#from .viewset import UserViewset
from rest_framework.routers import DefaultRouter

"""
router = DefaultRouter()
router.register('userapi',UserViewset,basename = 'userapi')
"""

urlpatterns = [
    path('',views.home, name ="home"),
    #path('api',include(router.urls)),
    #path('userapi',views.user_api,name ="userapi"),
    path('collection',views.collections,name ="collections"),
    path('register/', views.register, name='register'),
    #path('signup',views.signup,name ="signup"),
    #path('signin',views.signin,name ="signin"),
    #path('signout',views.signout,name ="signout"),
    #path('user',views.user_detail, name ="user"),
    #path('usrcreate',views.user_create,name="usrcreate"),
    #path('getuser',views.getuser,name="getuser"),
    path('signin',views.login_view, name = "signin"),
    path('usrapi',views.userapi,name='usrapi'),
    #path('gettoken',TokenObtainPairView.as_view(),name = 'gettoken'),
    #path('refreshtoken',TokenRefreshView().as_view(),name ='refreshtoken'),
    #path('verifytoken',TokenVerifyView.as_view(),name = 'verifytoken'),
    path('cusr',UserAPI.as_view(),name ='cusr'),
    path('cart',CartAPI.as_view(),name ='cart'),
    path('gview',UserList.as_view(),name='gview'),
    path('retrieve/<int:pk>',UserRetrieve.as_view(),name ='retrieve'),
    path('ucreate',UserCreate.as_view(),name='ucreate'),
    path('bookapi',views.bookapi,name ='bookapi'),
    path('ctgapi',views.categoryapi,name ='ctgapi'),
    path('auth',views.protected_view,name ='auth' ),


]




