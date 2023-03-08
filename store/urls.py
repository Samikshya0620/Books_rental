from django.urls import path,include
from . import views
from store.controller import authview
#from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView,TokenVerifyView
from .views import *
#from .viewset import UserViewset
from rest_framework.routers import DefaultRouter
from django.contrib.auth import views as auth_views

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
    path('signin',views.login_view, name = "signin"),
    path('usrapi',views.userapi,name='usrapi'),
    path('forgotpass',PassAPI.as_view(),name = 'forgotpass'),
    path('cusr',UserAPI.as_view(),name ='cusr'),
    path('cart',CartAPI.as_view(),name ='cart'),
    path('gview',UserList.as_view(),name='gview'),
    path('retrieve/<int:pk>',UserRetrieve.as_view(),name ='retrieve'),
    path('reset_password/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('ucreate',UserCreate.as_view(),name='ucreate'),
    path('bookapi',views.bookapi,name ='bookapi'),
    path('ctgapi',views.categoryapi,name ='ctgapi'),
    #path('auth',views.protected_view,name ='auth' ),
    path('reset_password', PasswordResetView.as_view(), name='password_reset'),
    path('cartpost',CAPI.as_view(),name ='cartpost'),
    path('payment', Payment.as_view(), name='payment'),
    path('final',Paymentitem.as_view(),name='final'),
    path('profile',ProfileAPI.as_view(),name ='profile'),
    #path('password_reset_link', PasswordResetLinkView.as_view()),
    #path('reset_password', PasswordResetView.as_view()),
    path('password_reset', PassAPI.as_view()),
    path('reset_password/', auth_views.PasswordResetView.as_view(), name='password_reset'),
    path('reset_password/done/', auth_views.PasswordResetDoneView.as_view(), name='password_reset_done'),
    path('reset_password/confirm/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('reset_password/complete/', auth_views.PasswordResetCompleteView.as_view(), name='password_reset_complete'),


]




