from django.urls import path
from base.views import media_views as views

urlpatterns = [
     path('posts/', views.getPosts, name='posts'),
      path('works/', views.getWorks, name='works'),
     
]
