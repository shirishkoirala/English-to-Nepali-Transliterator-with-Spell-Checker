from django.shortcuts import render
from django.http import Http404, HttpResponse
from sabdaprocessor import forms
from sabdaprocessor import searching
from sabdaprocessor import tries
import os
from final_year_project import settings

t = tries.Trie()
for line in open(os.path.join(settings.STATIC_DIR, "ne_NP_new.dic"), "r", encoding="utf8"):
    t.add(line)
    
print('Trie Created')

def index(request):
    return render(request, 'sabdaprocessor/index.html')

def transliterator(request):
    return render(request, 'sabdaprocessor/transliterator.html');

def words(request):
    return HttpResponse(searching.main(request.GET['search'], t))

def combination(request):
    return HttpResponse(searching.transliterate(request.GET['search']))
