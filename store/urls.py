from django.urls import path
from . import views
from store.controller import authview

urlpatterns = [
    path('',views.home, name ="home"),
    path('collection',views.collections,name ="collections"),
    path('register/', views.register, name='register'),
    path('signup',views.signup,name ="signup"),
    path('signin',views.signin,name ="signin"),
    path('signout',views.signout,name ="signout"),
    path('user',views.user_detail, name ="user"),
    path('usrcreate',views.user_create,name="usrcreate")
]