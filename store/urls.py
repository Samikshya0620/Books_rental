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
    path('collection',views.collections,name ="collections"),
    path('register/', views.register, name='register'),
    path('signin',views.login_view, name = "signin"),
    path('usrapi',views.userapi,name='usrapi'),
    path('cusr',UserAPI.as_view(),name ='cusr'),
    path('verify-email/<str:token>/', views.verify_email, name='verify_email'),
    path('cart',CartAPI.as_view(),name ='cart'),
    path('gview',UserList.as_view(),name='gview'),
    path('retrieve/<int:pk>',UserRetrieve.as_view(),name ='retrieve'),
    path('bookapi',views.bookapi,name ='bookapi'),
    path('ctgapi',views.categoryapi,name ='ctgapi'),
    path('cartpost',CAPI.as_view(),name ='cartpost'),
    path('final',Paymentitem.as_view(),name='final'),
    path('profile',ProfileAPI.as_view(),name ='profile'),

    path('bookowner',OwnerAPI.as_view(),name ='bookowner'),

]




