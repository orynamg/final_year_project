from django.urls import path
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r"properties", views.PropertyViewSet)
router.register(r"crimes", views.CrimeIncidentViewSet)
router.register(r"stations", views.StationViewSet)
router.register(r"station_units", views.StationUnitViewSet)

urlpatterns = [
    path("hello-world/", views.hello_world, name="hello_world"),
    path("search", views.search, name="search"),
]

urlpatterns += router.urls
