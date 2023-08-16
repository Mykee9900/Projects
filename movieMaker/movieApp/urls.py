from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path('', views.index),
    path('log', views.logIn),
    path('changeInfo', views.support),
    path('index', views.index),
    path('signOut', views.signOut),
    path('home', views.homePage),
    path('info', views.infoPage),
    path('update', views.update),
    path('movie/<int:data>', views.moviePage, name='data'),
    path('logReg', views.signReg),
    path('register', views.registration),
    path('picture', views.profilePicture),
    path('favMovie/<str:data>', views.favMovie),
    path('delete/<int:data>', views.delete),
    path('get_user_data', views.getUserData, name='getUserData'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)