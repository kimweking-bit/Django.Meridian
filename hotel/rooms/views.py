from django.shortcuts import render, redirect
from .models import Contact


def home(request):
    return render(request, "rooms/home.html")


def about(request):
    return render(request, "rooms/about.html")


def rooms_page(request):
    return render(request, "rooms/rooms.html")


def amenities(request):
    return render(request, "rooms/amenities.html")


def book(request):
    return render(request, "rooms/book.html")

def contact(request):
    if request.method == "POST":
        fullname = request.POST.get("fullname")
        email = request.POST.get("email")
        subject = request.POST.get("subject")
        message = request.POST.get("message")

        Contact.objects.create(
            fullname=fullname,
            email=email,
            subject=subject,
            message=message,
        )

        return redirect("home")
    return render(request, "rooms/contact.html")
