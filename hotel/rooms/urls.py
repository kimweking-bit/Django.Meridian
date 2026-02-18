from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
    path('rooms/', views.rooms_page, name='rooms'),
    path('amenities/', views.amenities, name='amenities'),
    path('book/', views.book, name='book'),
    path('contact/', views.contact, name='contact'),
]
