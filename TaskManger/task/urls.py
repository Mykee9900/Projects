from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static



urlpatterns = [
    path('', views.index),
    path('accounts/login/', views.registration),
    path('reg', views.registration),
    path('register', views.create),
    path('created', views.userTask),
    path('log', views.logMenu),
    path('LogIn', views.LogIn),
    path('picture', views.pictureUpload),
    path('createTask', views.Task),
    path('profile', views.profile),
    path('progressTask/<int:task_id>', views.progress),
    path('complete/<int:task_id>', views.complete),
    path('delete/<int:task_id>',views.delete),
    path('edit/<int:task_id>', views.editTask)
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
