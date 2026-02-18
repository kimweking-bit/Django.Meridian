from django.shortcuts import render

def home(request):
    return render(request, 'rooms/home.html')

def about(request):
    return render(request, 'rooms/about.html')

def rooms_page(request):
    return render(request, 'rooms/rooms.html')

def amenities(request):
    return render(request, 'rooms/amenities.html')

def book(request):
    return render(request, 'rooms/book.html')

def contact(request):
    return render(request, 'rooms/contact.html')
