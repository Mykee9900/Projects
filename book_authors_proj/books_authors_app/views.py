from django.shortcuts import render, redirect
from .models import Users, Author, Book
from datetime import date
from django.contrib import messages

def index(request):
    if "userid" in request.session:
        request.session.flush()
        context={
        'favbooks': Book.objects.all(),
        'favAuthor': Author.objects.all(),
        'today': date.today(),
        } 
        return render(request, "index.html", context)
    else:
        context={
        'favbooks': Book.objects.all(),
        'favAuthor': Author.objects.all(),
        'today': date.today(),
        } 
        return render(request, "index.html", context)

def sign(request):
    return render(request, 'loginPage.html')

def login(request):
    errors = Users.objects.login_validator(request.POST)
    if len(errors) > 0:
        for key, value in errors.items():
            messages.error(request, value)
        return redirect('/login')
    import bcrypt
    user = Users.objects.filter(email=request.POST['email'])
    if user:
        newUser = user[0]
        if bcrypt.checkpw(request.POST['password'].encode(),newUser.password.encode()):
            request.session['userid'] = newUser.id
            return redirect('/home')
        else:
            return redirect('/login')

def register(request):
    if  request.method == 'POST':
        errors = Users.objects.basic_validator(request.POST)
        if len(errors) > 0:
            for key, value in errors.items():
                messages.error(request, value)
                return redirect('/login')
        else:
            import bcrypt
            password = request.POST['password']
            pw_hash = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
            print(pw_hash)
            newUser = Users.objects.create(first_name = request.POST['firstN'], last_name = request.POST['lastN'], email = request.POST['email'], password = pw_hash)
            newUser.save()
            print(newUser.id)
            request.session['userid'] = newUser.id
            return redirect('/home')

def newHome(request):
    if "userid" in request.session:
        userOne = Users.objects.get(id=request.session['userid'])
        context = {
        "thisUser": Users.objects.last(),
        'favbooks': Book.objects.all(),
        'favAuthor': Author.objects.all(),
        'likedBooks': userOne.users_liked.all()
        }
        return render(request, 'home.html', context)
    else:
        user = Users.objects.get(id=request.session['userid'])
        context = {
            "thisUser": user,
            'favbooks': Book.objects.all(),
            'favAuthor': Author.objects.all(),
        }
        return render(request, 'home.html', context)

def like(request, book_id):
    book = Book.objects.get(id=book_id)
    user = Users.objects.last()
    book.liked_users.add(user)
    return redirect("/home")

def likeAuthor(request, author_id):
    author = Author.objects.get(id=author_id)
    user = Users.objects.last()
    author.liked_users.add(user)
    return redirect("/home")


# Create your views here.
<<<<<<< HEAD

=======
>>>>>>> 12ff8be91ac55b3bb6ea6341c822d19c599b8f1c
