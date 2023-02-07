from django.urls import path
from . import views
from store.controller import authview

urlpatterns = [
    path('',views.home, name ="home"),
    path('collection',views.collections,name ="collections"),
    path('register/', views.register, name='register')
]