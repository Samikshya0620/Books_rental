from django.shortcuts import redirect,render
from store.forms import CustomUserForm
def register(request):
    form = CustomUserForm
    context = {'form':form}

    return render(request,"store/auth/register.html",context)
