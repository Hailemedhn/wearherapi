from django.urls import path
from . import views
urlpatterns = [
    path("", views.home),
    path("form/", views.form_entry),
    path("form_save_link/", views.form_save),
]