from django.core.exceptions import ValidationError
from django.db import models

class UsernameValidator:
    @staticmethod
    def validate_username(username):
        if len(username) < 2:
            raise ValidationError("Username must be at least 2 characters!")


class UsersManager(models.Manager):
    def basic_validator(self, postData):
        errors = {}

        if len(postData['fName']) < 2:
            errors["fName"] = "First name should be at least 2 characters!"
        elif not postData['fName'].isalpha():
            errors["fName"] = "First name must contain only letters!"

        if len(postData['lName']) < 2:
            errors["lName"] = "Last name should be at least 2 characters!"
        elif not postData['lName'].isalpha():
            errors["lName"] = "Last name must contain only letters!"

        if len(postData['userName']) < 2:
            errors["userName"] = "Username must be at least 2 characters!"
        else:
            try:
                UsernameValidator.validate_username(postData['userName'])
            except ValidationError as e:
                errors["userName"] = e.message

        if len(postData['password']) < 8:
            errors["password"] = "Password must be at least 8 characters!"
        elif postData['password'] != postData['cPassword']:
            errors["cPassword"] = "Passwords do not match!"

        # Check if username is unique
        if Users.objects.filter(userName=postData['userName']).exists():
            errors["userName"] = "This username is already taken!"

        return errors


    def log_validator(self, postData):
        errors = {}

        # Check for missing fields
        if not postData.get('userName'):
            errors["userName"] = "Username is required"
        if not postData.get('password'):
            errors["password"] = "Password is required"
        if not postData.get('cPassword'):
            errors["cPassword"] = "Confirm Password is required"

        # Validate username length
        if len(postData.get('userName', '')) < 2:
            errors["userName"] = "Username is too short"

        # Validate password length
        if len(postData.get('password', '')) < 2:
            errors["password"] = "Password is too short"

        # Check if password and confirm password match
        if postData.get('password') != postData.get('cPassword'):
            errors["cPassword"] = "Passwords do not match"

        return errors

class taskManager(models.Manager):
    def task_validator(self, postData):
        errors = {}
        if len(postData['task']) < 1:
            errors["task"] = "Task must be longer than 1 character."
        return errors

class Tasks(models.Model):
    STATUS_CHOICES = [
        ('created', 'Created'),
        ('started', 'Started'),
        ('completed', 'Completed'),
    ]

    task_info = models.CharField(max_length=150)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='created')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    objects = taskManager()

class Users(models.Model):
    first_Name = models.CharField(max_length=15)
    last_Name = models.CharField(max_length=15)
    userName = models.CharField(max_length=25)
    profilePicture = models.ImageField(upload_to="static/media", null=True, blank=True)
    password = models.CharField(max_length=30)
    passwordC = models.CharField(max_length=30)
    createdTask = models.ManyToManyField(Tasks, related_name="createdTask")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UsersManager()

    def count_tasks_by_status(self, status):
        return self.createdTask.filter(status=status).count()





