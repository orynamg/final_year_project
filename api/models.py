from django.db import models


class Property(models.Model):
    address = models.CharField(max_length=200)
    postcode = models.CharField(max_length=10)
    description = models.CharField(max_length=200)
    published_date = models.DateField()
    bedrooms = models.IntegerField(default=0)
    freehold = models.BooleanField(default=False)


class CrimeIncident(models.Model):
    category = models.CharField(max_length=200)
    latitude = models.FloatField()
    longitude = models.FloatField()
    postcode = models.CharField(max_length=10)
    street_name = models.CharField(max_length=200)
    month = models.IntegerField()
    year = models.IntegerField()


class Station(models.Model):
    station_code = models.CharField(max_length=200)
    name = models.CharField(max_length=200)
    fare_zone = models.CharField(max_length=20)


class StationUnit(models.Model):
    unit_code = models.CharField(max_length=200)
    latitude = models.FloatField()
    longitude = models.FloatField()
    postcode = models.CharField(max_length=10)


class UserQuery(models.Model):
    text = models.CharField(max_length=300)
    sql = models.CharField(max_length=10000)
    timestamp = models.DateTimeField(auto_now_add=True)
