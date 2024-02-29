from django import forms
from .models import Users

class ProfilePictureForm(forms.ModelForm):
    class Meta:
        model = Users
        fields = ['profilePicture']
