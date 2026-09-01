from django.shortcuts import render

def home(request):
    return render(request, 'index.html')

def about_view(request):
    return render(request, 'index.html')

def experience_view(request):
    return render(request, 'index.html')

def skills_view(request):
    return render(request, 'index.html')

def projects_view(request):
    return render(request, 'index.html')

def certs_view(request):
    return render(request, 'index.html')

def contact_view(request):
    return render(request, 'index.html')
