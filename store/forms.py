from django.contrib.auth.forms import UserCreationForm
from .models import User
from django import forms 

class CustomUserForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['username','password','firstname','middlename','lastname','phonenumber','email']



