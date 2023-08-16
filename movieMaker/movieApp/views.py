from django.shortcuts import render, redirect
from .models import Users, Movies
from django.contrib import messages
from django.core.files.storage import FileSystemStorage
from django.http import JsonResponse
import bcrypt

# Create your views here.
def index(request):
    return render(request, 'index.html')

def moviePage(request, data):
    if "userId" in request.session:
        currentUser = Users.objects.get(id=request.session["userId"])

        context = {
            'movieID': data,
            'thisUser': currentUser
        }
        return render(request, "moviePage.html", context)
    else:
        context = {
        'movieID': data,
    }
    return render(request, 'moviePage.html', context);

def homePage(request):
    user = Users.objects.get(id=request.session["userId"])
    context = {
        "thisUser": user
    }
    return render(request, "home.html", context)

def registration(request):
    if request.method == 'POST':
        errors = Users.objects.basic_validator(request.POST)
        if len(errors) > 0:
            for key, value in errors.items():
                messages.error(request, value)
            return redirect('/')
        else:
            password = request.POST["password"]
            pw_hash = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
            print(pw_hash)
            newUser = Users.objects.create(first_name=request.POST['fname'], last_name=request.POST["lname"], email=request.POST["email"], user_name=request.POST["uName"], password=pw_hash, passwordC=pw_hash)
            newUser.save()
            request.session['userId'] = newUser.id
            return redirect("/home")

def logIn(request):
    errors = Users.objects.log_validator(request.POST)
    if len(errors) > 0:
        for key, value in errors.items():
            messages.error(request, value)
        return redirect('/')
    user = Users.objects.filter(email=request.POST['email'])
    if user:
        newUser = user[0]
        if bcrypt.checkpw(request.POST['password'].encode(),newUser.password.encode()):
            request.session['userId'] = newUser.id
            print(" here is the id")
            print(newUser.id)
            return redirect('/home')
        else:
            return redirect('/')

def support(request):
    return render(request, 'support.html')

def infoPage(request):
    if "userId" in request.session:
        user= Users.objects.get(id=request.session['userId'])
        context = {
            'thisUser': user
        }
        return render(request, "infoPage.html", context)
    else:
        return render(request, "infoPage.html")

def profilePicture(request):
    if request.method == 'POST':
        if "userId" in request.session:
            currentUser = Users.objects.get(id=request.session['userId'])
            if 'profilePicture' in request.FILES:
                image = request.FILES['profilePicture']
                currentUser.profilePicture = image
                currentUser.save()
            return redirect("/home")

def favMovie(request, data):
        if "userId" in request.session:
            movie = Movies.objects.create(title=data)
            currentUser = Users.objects.get(id=request.session['userId'])
            movie.liked_users.add(currentUser)
            movie.save()
            return redirect("/home")                    

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

def delete(request, data):
    movie = Movies.objects.get(id = data);
    user = Users.objects.get(id = request.session["userId"])
    movie.liked_users.remove(user)
    return redirect("/home")

def getUserData(request):
    print("in the get user function")
    if "userId" in request.session:
        user = Users.objects.get(id=request.session["userId"])
        fav_movies = [movie.title for movie in user.movies_liked.all()]
        user_data = {
            'id': user.id,
            'firstName': user.first_name,
            'lastName': user.last_name,
            "favMovies": fav_movies
    }
        return JsonResponse(user_data)
    else:
        return JsonResponse({'error': 'User not authenticated'}, status=401)

def signOut(request):
    request.session.flush()
    return redirect('/index')

def signReg(request):
    return render(request, "signReg.html")