from django.db import models


class Property(models.Model):
    name = models.CharField(max_length=200)
    price = models.FloatField()
    house_type = models.CharField(max_length=200)
    area_sqft = models.FloatField()
    bedrooms = models.IntegerField(default=0)
    bathrooms = models.IntegerField(default=0)
    receptions = models.IntegerField(default=0)
    postcode = models.CharField(max_length=10)
    city = models.CharField(max_length=200)


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


class Area(models.Model):
    code = models.CharField(max_length=200)
    name = models.CharField(max_length=200)
    centre_lat = models.FloatField()
    centre_long = models.FloatField()
