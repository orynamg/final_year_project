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
    latitude = models.FloatField()
    longitude = models.FloatField()


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


class School(models.Model):
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    postcode = models.CharField(max_length=10)
    latitude = models.FloatField()
    longitude = models.FloatField()
    type = models.CharField(max_length=200)
    gender = models.CharField(max_length=50)


class VehicleChargingPoint(models.Model):
    site_name = models.CharField(max_length=200)
    latitude = models.FloatField()
    longitude = models.FloatField()
    postcode = models.CharField(max_length=10)
    borough = models.CharField(max_length=200)
    public_use = models.BooleanField()


class GroceryShop(models.Model):
    retailer = models.CharField(max_length=200)
    type = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    postcode = models.CharField(max_length=10)
    latitude = models.FloatField()
    longitude = models.FloatField()


class GreenBlueArea(models.Model):
    ward_name = models.CharField(max_length=200)
    area_code = models.CharField(max_length=200)
    borough = models.CharField(max_length=200)
    ward_area_hectares = models.FloatField()
    green_area_hectares = models.FloatField()
    blue_area_hectares = models.FloatField()
    green_and_blue_area_hectare = models.FloatField()
    percent_green = models.FloatField()
    percent_blue = models.FloatField()
    percent_green_and_blue = models.FloatField()
