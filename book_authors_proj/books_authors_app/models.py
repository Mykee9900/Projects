from django.db import models
import re

class usersManager(models.Manager):
    def basic_validator(self, postData):
        errors = {}
        EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._]+\.[a-zA-Z]+$')
        if len(postData['firstN']) < 2:
            errors["firstN"] = "First name should be at least 2 characters!"
        if postData['firstN'].isalpha() == False:
            errors["firstN"] = "First name must be only letters!"
        if len(postData['lastN']) <2:
            errors["lastN"] = "Last name should be at least 2 characters!"
        if postData['lastN'].isalpha() == False:
            errors["lastN"] = "Last name must be only letters!"
        if  not EMAIL_REGEX.match(postData['email']):
            errors["email"] = "Invalid email adress!"
        if len(postData['password']) < 8:
            errors["password"] = "Password must be at least 8 characters!"
        if postData['passwordC'] != postData['password']:
            errors["passwordC"] = "confirm password not same"
        return errors
    def login_validator(self, postData):
        errors={}
        users = Users.objects.filter(email=postData["email"])
        if len(postData["email"]) < 1:
            errors["email"] = "Email cannot be blank"
        if len(postData["password"]) < 8:
            errors["password"] = "Password requires at least 8 characters"
        return errors

class Users(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.CharField(max_length=150)
    password = models.CharField(max_length=150)
    passwordC = models.CharField(max_length=150)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = usersManager()
    
class Book(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    genre = models.TextField(null=True)
    form = models.CharField(max_length=140, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    liked_users = models.ManyToManyField(Users, related_name="users_liked")
    updated_at = models.DateTimeField(auto_now=True)

class Author(models.Model):
    first_name = models.CharField(max_length=45)
    last_name = models.CharField(max_length=45)
    notes = models.TextField()
    liked_users = models.ManyToManyField(Users, related_name="user_liked")
    books = models.ManyToManyField(Book, related_name="authors")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)



# Create your models here.
