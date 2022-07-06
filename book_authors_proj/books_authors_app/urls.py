from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('login', views.sign),
    path('regist', views.register),
    path('log', views.login),
    path('logOut', views.index),
    path('home', views.newHome),
    path('book/<int:book_id>/like', views.like),
    path('author/<int:author_id>/like', views.likeAuthor),
]