from django import forms
from .models import ContactList, Name

class ContactForm(forms.ModelForm):
    class Meta:
        model = ContactList  
        fields = ['name','phone_number',]

class SearchForm(forms.ModelForm):
    class Meta:
        model : Name
        fields =['name',]