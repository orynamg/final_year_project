from django.urls import path
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
urlpatterns = [
    path("search", views.search, name="search"),
    path("area-details", views.area_details, name="area_details"),
    path("properties", views.PropertyList.as_view()),
]

urlpatterns += router.urls
