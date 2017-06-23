from django.shortcuts import render
from django.http import Http404, HttpResponse
from sabdaprocessor import forms
from sabdaprocessor import searching

def index(request):
    return render(request, 'sabdaprocessor/index.html')

def transliterator(request):
    return render(request, 'sabdaprocessor/transliterator.html');
    
def words(request):
    return HttpResponse(searching.main(request.GET['search']))

def combination(request):
    return HttpResponse(searching.transliterate(request.GET['search']))
