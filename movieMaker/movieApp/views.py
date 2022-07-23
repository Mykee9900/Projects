from django.shortcuts import render, redirect
from .models import Users
from django.contrib import messages
import bcrypt

# Create your views here.
def index(request):
    return render(request, 'index.html')

def home(request):
    if request.method == 'POST':
        errors = Users.objects.basic_validator(request.POST)
        if len(errors) > 0:
            for key, value in errors.items():
                messages.error(request, value)
            return redirect('/')
        else:
            password = request.POST["password"]
            pw_hash = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
            newUser = Users.objects.create(first_name = request.POST["fname"],last_name = request.POST["lname"],user_name = request.POST["uName"],email = request.POST["email"],password= pw_hash)
            newUser.save()
            request.session['userId'] = newUser.id
            context = {
                'thisUser': newUser,
            }
            return render(request, 'home.html', context)

def logIn(request):
    errors = Users.objects.log_validator(request.POST)
    if len(errors) > 0:
        for key, value in errors.items():
            messages.error(request, value)
        return redirect('/')
    user = Users.objects.filter(user_name=request.POST['uName'])
    if user:
        newUser = user[0]
        if bcrypt.checkpw(request.POST['password'].encode(),newUser.password.encode()):
            request.session['userId'] = newUser.id
            return redirect('/home')
        else:
            return redirect('/')

def support(request):
    return render(request, 'support.html')

def logged(request):
    user = Users.objects.get(id=request.session['userId'])
    context = {
        'thisUser': user
    }
    return render(request, 'home.html', context)

def infoPage(request):
    return render(request, "infoPage.html")

def update(request):
        if request.method == 'POST':
            user = Users.objects.filter(email=request.POST['email'])
            if user:
                currentUser = user[0]
                newPassword = request.POST["newPassword"]
                pw_hash = bcrypt.hashpw(newPassword.encode(), bcrypt.gensalt()).decode()
                user.update(password=pw_hash)
                return redirect('/index')
            else:
                return redirect('/')

def signOut(request):
    request.session.flush()
    return redirect('/index')