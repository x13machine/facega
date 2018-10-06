from django.urls import path
from . import views
from . import rest

app_name = 'main'
urlpatterns = [
	path('',views.index, name='index'),
	path('about',views.about, name='about'),
	path('gallery',views.gallery, name='gallery'),
	path('i/<slug:uid>.jpg',rest.serveFace, name='images'),

	path('rest/submitface', rest.submitFace, name='submitFace'),
	path('rest/listfaces', rest.listFaces, name='listFaces'),
	path('rest/face',rest.generateFace, name='face')

]