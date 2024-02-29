from django.shortcuts import render, redirect
from .models import Users, Tasks
from django.contrib import messages
from django.core.files.storage import FileSystemStorage
from django.http import JsonResponse
import bcrypt
from .forms import ProfilePictureForm
from PIL import Image
from django.contrib.auth.decorators import login_required


# Create your views here.
def index(request):
    if "userId" in request.session:
        request.session.flush()
        return render(request, "menu.html")
    else:
        return render(request,"menu.html")

def registration(request):
    return render(request, "registration.html")

def logMenu(request):
    return render(request, "logMenu.html")

def create(request):
    if request.method == "POST":
        errors = Users.objects.basic_validator(request.POST)
        if len(errors) > 0:
            for key, value in errors.items():
                messages.error(request, value)
            return redirect('/reg')
        else:
            password = request.POST["password"]
            pw_hash = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
            print(pw_hash)
            newUser = Users.objects.create(first_Name=request.POST['fName'], last_Name=request.POST["lName"], userName=request.POST["userName"], password=pw_hash, passwordC=pw_hash)
            newUser.save()
            request.session['userId'] = newUser.id
            return redirect("/created")

def LogIn(request):
    if request.method == "POST":
        errors = Users.objects.log_validator(request.POST)
        if len(errors) >0:
            for key, value in errors.items():
                messages.error(request, value)
            return redirect('/log')
        else:
            found_user = Users.objects.filter(userName=request.POST['userName'])
            if found_user:
                newUser = found_user[0]
                if bcrypt.checkpw(request.POST['password'].encode(),newUser.password.encode()):
                    request.session['userId'] = newUser.id
                    return redirect('/created')
                else:
                    return redirect('/')

def Task(request):
    if request.method == "POST":
        # for task validation
        task = request.POST['task']
        if isinstance(task, str) and len(task) >= 0:
            print("empty variable")
        errors = Tasks.objects.task_validator(request.POST)
        if len(errors) > 0:
            for key, value in errors.items():
                messages.error(request, value)
            return redirect('/profile')
        else:
            currentUser = Users.objects.get(id=request.session["userId"])
            currentUser.createdTask.create(task_info = request.POST['task'])
            return redirect('/created')

def userTask(request):
    found_user = Users.objects.get(id=request.session["userId"])
    context = {
        "currentUser": found_user
        }
    return render(request, "index.html", context)

def profile(request):
    currentUser = Users.objects.get(id=request.session["userId"])
    context = {
        "currentUser": currentUser
    }
    return render(request, "profile.html", context)

def pictureUpload(request):
    if "userId" in request.session:
        if request.method == 'POST':
            currentUser = Users.objects.get(id=request.session['userId'])
            if 'profilePicture' in request.FILES:
                image = request.FILES['profilePicture']

                #validate proper files
                try:
                    with Image.open(image) as img:
                        img.verify()
                except Exception as e:
                    print(f"Invalid image file: {e}")
                    return redirect("/profile")
                
                currentUser.profilePicture = image
                currentUser.save()
            return redirect("/profile")
    else:
        form = ProfilePictureForm(instance=request.user)

    context = {
        'form': form,
    }
    return render(request, 'profile.html', context)

def progress(request, task_id):
    currentUser = Users.objects.get(id=request.session["userId"])
    currentTask = currentUser.createdTask.get(id=task_id)

    currentTask.status = 'started'
    currentTask.save()
    return redirect('/created')

def complete(request, task_id):
    currentUser = Users.objects.get(id=request.session["userId"])
    currentTask = currentUser.createdTask.get(id=task_id)

    currentTask.status = 'completed'
    currentTask.save()

    return redirect('/created')

def delete(request, task_id):
    currentUser = Users.objects.get(id=request.session["userId"])
    deletedTask = currentUser.createdTask.get(id=task_id)
    deletedTask.delete()
    return redirect("/created")

def editTask(request, task_id):
    if request.method == "POST":
        currentUser = Users.objects.get(id=request.session["userId"])
        currentTask = currentUser.createdTask.get(id=task_id)
        currentTask.task_info = request.POST["task"]
        currentTask.save()
        return redirect("/created")
    elif request.method != "POST":
        return redirect("/created")

