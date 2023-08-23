from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from .models import ContactList, Name
from .forms import ContactForm, SearchForm
from django.views.decorators.csrf import csrf_protect
import json
from django.core import serializers


# Create your views here.

@csrf_protect
def form_save(request):
    form1 = ContactForm(request.POST)
    if form1.is_valid():
        form1.save()
        return redirect(home)
    else:
        return HttpResponse("Form not Valid")
    
    
def form_entry(request):
    return render(request,"form.html",{})

@csrf_protect
def home(request):
   
    if request.method == "POST":
        print(request.POST)
        addresses = ContactList.objects.all().filter(name__icontains=str(request.POST["name"]))
        print(addresses)
        
        return render(request,'home.html',{'contact':addresses})
    else:
        return render(request,"home.html",{}) 
