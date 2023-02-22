from django.db import models
import datetime
import os
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
    username = models.CharField(max_length=100, blank = False, null = False)
    password = models.CharField(max_length=30)
    firstname = models.CharField(max_length=100, blank = False, null = False)
    middlename = models.CharField(max_length=100, blank = False, null = False)
    lastname = models.CharField(max_length=100, blank = False, null = False)
    phone_regex = RegexValidator(regex=r'^\+?977?\d{10}$', message="Phone number must be entered in the format: '+999999999'. Up to 10 digits allowed.")
    phonenumber = models.CharField(validators=[phone_regex], max_length=14, blank=True,null = True)
    email =  models.EmailField()

    def __str__(self):
        return self.username
    
    
    def save(self, *args, **kwargs):
        self.password = make_password(self.password)
        super().save(*args, **kwargs)
        
    

class Cart(models.Model):
    user_id = models.ForeignKey(User,on_delete=models.CASCADE)
    Book_id = models.ForeignKey(Book,on_delete= models.CASCADE)
    quantity = models.IntegerField()
    
    def __str__(self):
        return str(self.user_id)

class Booking_item(models.Model):
    quantity = models.IntegerField(null = False, blank = False)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    book_id = models.ForeignKey(Book, on_delete=models.CASCADE)

    def __str__(self):
        return self.__class__.__name__



class Payment_Detail(models.Model):
    #booking_details_id = models.ForeignKey(booking_detail, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits = 20,null = False, blank = False,decimal_places=10)
    provider = models.CharField(max_length=150,null = False, blank = False)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.__class__.__name__
        
        
class booking_detail(models.Model):
    #user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    total = models.IntegerField(null = False, blank = False)
    booking_status= models.BooleanField(default = False , help_text = "0=Default, 1=Booked")
    payment_details_id = models.ForeignKey(Payment_Detail,on_delete= models.CASCADE)
    overdue_status = models.BooleanField(default= False,help_text= "0=Default, 1 = Overdue" )
    overdue_time =  models.BooleanField(default= False,help_text= "0=Default, 1 = Overtime" )
    start_time = models. DateField()
    end_time = models.DateField()
    security_deposit = models.DecimalField(max_digits = 20,null = False, blank = False,decimal_places=10)
    created_at = models.DateField(auto_now_add=True)
    modified_at = models.DateField(auto_now=True)

    def __str__(self):
        return self.__class__.__name__






    
   


