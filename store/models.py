from django.db import models
import datetime
import os
from django.core.mail import send_mail
from django.urls import reverse
from django.conf import settings
import secrets
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.apps import apps
from django.contrib.auth.hashers import make_password

from django.core.validators import RegexValidator
# Create your models here.



def get_file_path(request,filename):
    original_filename = filename
    nowTime = datetime.datetime.now().strftime('%Y%m%d%H:%M:%S')
    filename = "%s%s" % (nowTime,original_filename)
    return os.path.join('uploads/',filename)

class Category(models.Model):
    name = models.CharField(max_length= 100,null = False, blank = False)
    description = models.TextField(max_length=500, null= False,blank = False)
    image = models.ImageField(upload_to = get_file_path,null= True, blank = True)
    status = models.BooleanField(default = False , help_text = "0=Default, 1=Hidden")
    trending = models.BooleanField(default = False , help_text = "0=Default, 1=Trending")
    #created_at = models.DateTimeField()
    
    def __str__(self):
        return self.name


class Book(models.Model):
    name = models.CharField(max_length= 100,null = False, blank = False)
    description = models.TextField(max_length=500, null= False,blank = False)
    category_id = models.ForeignKey(Category, on_delete=models.CASCADE)
    price = models.IntegerField(null = False, blank = False)
    discount = models.DecimalField(max_digits= 10, decimal_places=5)
    image = models.ImageField(upload_to = get_file_path,null= True, blank = True)
    status = models.BooleanField(default = False , help_text = "0=Default, 1=Hidden")
    trending = models.BooleanField(default = False , help_text = "0=Default, 1=Trending")
    review = models.TextField(max_length=100, null = True, blank = True)
    rating = models.FloatField(null = True, blank = True)
    created_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name
    

class Book_Inventory(models.Model):
    quantity = models.IntegerField(null = False, blank = False)
    book_id = models.ForeignKey(Book, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.book_id)


class User(models.Model):
    username = models.CharField(max_length=100, blank = False, null = False,unique= True)
    password = models.CharField(max_length=512)
    firstname = models.CharField(max_length=100, blank = False, null = False)
    middlename = models.CharField(max_length=100, blank = True, null = True)
    lastname = models.CharField(max_length=100, blank = False, null = False)
    phone_regex = RegexValidator(regex=r'^\+?977?\d{10}$', message="Phone number must be entered in the format: '+999999999'. Up to 10 digits allowed.")
    phonenumber = models.CharField(validators=[phone_regex], max_length=14, blank=True,null = True)
    email =  models.EmailField(unique=True)
    is_verified = models.BooleanField(default=False)
    reset_token = models.CharField(max_length=64, unique=True, blank=True, null=True)


    REQUIRED_FIELDS = ()
    USERNAME_FIELD = 'username'

    def __str__(self):
        return self.username
    """
    def hash_password(self, password: str):
        self.password = make_password(password=password)
    """
    def save(self, *args, **kwargs):
        if not self.id:
            self.password = make_password(self.password)
        super().save(*args, **kwargs)
        # self.password = make_password(self.password)
        #super().save(*args, **kwargs)


    def generate_reset_token(self):
        # Generate a random token
        token = secrets.token_hex(32)
        # Store the token on the user instance
        self.reset_token = token
        self.save()
        return token

    def reset_password(self, new_password):
        # Set the new password and clear the reset token
        self.password = make_password(new_password)
        self.reset_token = None
        self.save()  

    
    

class Cart(models.Model):
    user_id = models.ForeignKey(User,on_delete=models.CASCADE)
    book_id = models.ForeignKey(Book,on_delete= models.CASCADE)
    quantity = models.IntegerField()
    
    def __str__(self):
        return str(self.user_id)
                

class Payment(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    firstname = models.CharField(max_length= 50)
    lastname = models.CharField(max_length=50)
    address = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    paymentmethod = models.CharField(max_length=50)

    def __str__(self):
        return str(self.user_id)



class FinalItem(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)   
    productid = models.IntegerField()
    image_data = models.ImageField(upload_to = get_file_path,null= True, blank = True)
    name = models.CharField(max_length=50)
    price = models.IntegerField()
    quantity = models.IntegerField()
    total = models.IntegerField()
    order_date = models.DateField(auto_now_add=True)
    deadline_date = models.DateField(default=datetime.date.today() + datetime.timedelta(days=30))
    remaining_days = models.IntegerField(default =0)

    def save(self, *args, **kwargs):
        self.remaining_days = (self.deadline_date - datetime.date.today()).days
        super(FinalItem, self).save(*args, **kwargs)


    def __str__(self):
        return str(self.user_id)
    
    
   


