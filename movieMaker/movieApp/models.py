from django.db import models
import re

# Create your models here.
class usersManager(models.Manager):
    def basic_validator(self, postData):
        errors = {}
        EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._]+\.[a-zA-Z]+$')
        if len(postData['fname']) < 2:
            errors["fname"] = "First name should be at least 2 characters!"
        if postData['fname'].isalpha() == False:
            errors["fname"] = "First name must be only letters!"
        if len(postData['lname']) <2:
            errors["lname"] = "Last name should be at least 2 characters!"
        if postData['lname'].isalpha() == False:
            errors["lname"] = "Last name must be only letters!"
        if len(postData['uName']) < 2:
            errors["uName"] = "Username must be at least 2 characters!"
        if  not EMAIL_REGEX.match(postData['email']):
            errors["email"] = "Invalid email adress!"
        if len(postData['password']) < 8:
            errors["password"] = "Password must be at least 8 characters!"
        if postData['cPassword'] != postData['password']:
            errors["cPassword"] = "confirm password not same"
        return errors
    
    def log_validator(self, postData):
        errors = {}
        if len(postData['email']) < 2:
            errors["email"] = "Email incorrect!"
        if len(postData['password']) < 8:
            errors["password"] = "Password must be at least 8 characters!"
        return errors



class Users(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    user_name = models.CharField(max_length=50)
    email = models.CharField(max_length=150)
    password = models.CharField(max_length=150)
    passwordC = models.CharField(max_length=150)
    favMovie = models.CharField(max_length=25)
    profilePicture = models.ImageField(upload_to="images/", null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = usersManager()

class Movies(models.Model):
    title = models.CharField(max_length=50)
    liked_users = models.ManyToManyField(Users, related_name="movies_liked")
    liked_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)