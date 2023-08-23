from django.db import models

# Create your models here.
class ContactList(models.Model):
    name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=50)
   
class Name(models.Model):
    name = models.CharField(max_length=100)