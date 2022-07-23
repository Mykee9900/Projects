from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('signLog', views.home),
    path('log', views.logIn),
    path('changeInfo', views.support),
    path('index', views.index),
    path('signOut', views.signOut),
    path('home', views.logged),
    path('info', views.infoPage),
    path('update', views.update),
]