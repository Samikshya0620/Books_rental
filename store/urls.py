from django.urls import path
from . import views
from store.controller import authview
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView,TokenVerifyView

urlpatterns = [
    path('',views.home, name ="home"),
    path('collection',views.collections,name ="collections"),
    path('register/', views.register, name='register'),
    path('signup',views.signup,name ="signup"),
    #path('signin',views.signin,name ="signin"),
    path('signout',views.signout,name ="signout"),
    path('user',views.user_detail, name ="user"),
    path('usrcreate',views.user_create,name="usrcreate"),
    path('getuser',views.getuser,name="getuser"),
    path('signin',views.login_view, name = "signin"),
    path('gettoken',TokenObtainPairView.as_view(),name = 'gettoken'),
    path('refreshtoken',TokenRefreshView().as_view(),name ='refreshtoken'),
    path('verifytoken',TokenVerifyView.as_view(),name = 'verifytoken')

]



