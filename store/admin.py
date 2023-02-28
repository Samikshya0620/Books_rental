from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(User)
admin.site.register(Category)
admin.site.register(Book)
admin.site.register(Book_Inventory)
admin.site.register(Payment_Detail)
admin.site.register(booking_detail)
admin.site.register(Cart)

