from django.conf.urls import url
from sabdaprocessor import views

urlpatterns = [
    url(r'^dict/$', views.dict, name='dict'),
    url(r'^words/$', views.words, name='words'),
    url(r'^transliterator/$', views.transliterator, name='transliterator'),
    url(r'^transliterator/words/$', views.combination, name='combination'),
    url(r'^$', views.index, name='index'),
]
