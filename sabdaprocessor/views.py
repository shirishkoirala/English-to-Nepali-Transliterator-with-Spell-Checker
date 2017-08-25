from django.shortcuts import render
from django.http import Http404, HttpResponse
from sabdaprocessor import forms
from sabdaprocessor import searching
from sabdaprocessor import tries
from sabdaprocessor import user
import os
from final_year_project import settings

t = tries.Trie()
for line in open(os.path.join(settings.STATIC_DIR, "dict.txt"), "r", encoding="utf8"):
    t.add(line)

user_trie = None
# user_trie = tries.Trie()
# for line_from_user_dict in open(os.path.join(settings.STATIC_DIR, "user_dict.txt"), "r", encoding="utf8"):
#     splitted_line_from_user_dict = line_from_user_dict.split(' ')
#     user_trie.add(splitted_line_from_user_dict[1])

def index(request):
    return render(request, 'sabdaprocessor/index.html')

def transliterator(request):
    return render(request, 'sabdaprocessor/transliterator.html');

def words(request):
    return HttpResponse(searching.main(request.POST['search'], t, user_trie, request.POST['start'], request.POST['end']))

def combination(request):
    return HttpResponse(searching.transliterate(request.POST['search']))

def dict(request):
    return HttpResponse(user.user_dict(request.POST['ascii'], request.POST['unicode']))
