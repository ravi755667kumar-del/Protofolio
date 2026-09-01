from django.urls import path
from . import views

app_name = 'main'

urlpatterns = [
    path('', views.home, name='home'),
    path('about/', views.about_view, name='about'),
    path('experience/', views.experience_view, name='experience'),
    path('skills/', views.skills_view, name='skills'),
    path('projects/', views.projects_view, name='projects'),
    path('certs/', views.certs_view, name='certs'),
    path('contact/', views.contact_view, name='contact'),
]
