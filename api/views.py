import sqlite3
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import permissions, viewsets, serializers, generics
from .models import (
    Property,
    CrimeIncident,
    Station,
    StationUnit,
    UserQuery,
    Area,
    School,
    VehicleChargingPoint,
    GroceryShop,
)
from .llm import LLMQueryGenerator
from django.db import connection


@api_view(["GET"])
def hello_world(request):
    return Response({"message": "Hello, Oryna!"})


@api_view(["POST"])
def search(request):
    try:
        print(request.data)
        llm = LLMQueryGenerator("api/data/prompt.txt", "api/models.py")
        sql = llm.generate_sql(request.data["text"])
        print(sql)
        conn = sqlite3.connect(
            "/Users/oryna/Documents/dev/Project/final_year_project/db.sqlite3"
        )
        conn.enable_load_extension(True)
        conn.load_extension(
            "/Users/oryna/Documents/dev/Project/final_year_project/regex02"
        )
        conn.enable_load_extension(False)
        cursor = conn.cursor()
        cursor.execute(sql)
        areas = []
        for row in cursor.fetchall():
            area = row[0].strip()
            area = area.rstrip("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")
            if area not in areas:
                areas.append(area)
        return Response({"areas": areas})
    except Exception as e:
        print(e)
        return Response(status=500)
    finally:
        conn.close()


class PropertySerializer(serializers.ModelSerializer):
    """
    Transforms Django model into API representation
    """

    class Meta:
        model = Property
        fields = "__all__"


class PropertyViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows properties to be viewed or edited.
    """

    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    # permission_classes = [permissions.IsAuthenticated]


class CrimeIncidentSerializer(serializers.ModelSerializer):
    """
    Transforms Django model into API representation
    """

    class Meta:
        model = CrimeIncident
        fields = "__all__"


class CrimeIncidentViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows crimes to be viewed or edited.
    """

    queryset = CrimeIncident.objects.all()
    serializer_class = CrimeIncidentSerializer
    # permission_classes = [permissions.IsAuthenticated]


class StationSerializer(serializers.ModelSerializer):
    """
    Transforms Django model into API representation
    """

    class Meta:
        model = Station
        fields = "__all__"


class StationViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows stations to be viewed or edited.
    """

    queryset = Station.objects.all()
    serializer_class = StationSerializer
    # permission_classes = [permissions.IsAuthenticated]


class StationUnitSerializer(serializers.ModelSerializer):
    """
    Transforms Django model into API representation
    """

    class Meta:
        model = StationUnit
        fields = "__all__"


class StationUnitViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows station units to be viewed or edited.
    """

    queryset = StationUnit.objects.all()
    serializer_class = StationUnitSerializer
    # permission_classes = [permissions.IsAuthenticated]


class UserQuerySerializer(serializers.ModelSerializer):
    """
    Transforms Django model into API representation
    """

    class Meta:
        model = UserQuery
        fields = "__all__"


class UserQueryViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows user queries to be viewed or edited.
    """

    queryset = UserQuery.objects.all()
    serializer_class = UserQuerySerializer
    # permission_classes = [permissions.IsAuthenticated]


class PropertyList(generics.ListAPIView):
    serializer_class = PropertySerializer

    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        queryset = Property.objects.all()
        areas = self.request.query_params.get("areas", None)
        if areas is not None:
            areas = areas.split(",")
            area_placeholders = "|".join(["%s"] * len(areas))
            print(area_placeholders, areas)
            query = f"SELECT * FROM api_property WHERE postcode REGEXP '^({area_placeholders})\D* '"
            query = query % tuple(areas)
            queryset = Property.objects.raw(query)
            # queryset = Property.objects.raw(query, areas)
        return queryset


class AreaSerializer(serializers.ModelSerializer):
    """
    Transforms Django model into API representation
    """

    class Meta:
        model = Area
        fields = "__all__"


class AreaViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows areas to be viewed or edited.
    """

    queryset = Area.objects.all()
    serializer_class = AreaSerializer
    # permission_classes = [permissions.IsAuthenticated]


class SchoolSerializer(serializers.ModelSerializer):
    """
    Transforms Django model into API representation
    """

    class Meta:
        model = School
        fields = "__all__"


class SchoolViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows schools to be viewed or edited.
    """

    queryset = School.objects.all()
    serializer_class = SchoolSerializer
    # permission_classes = [permissions.IsAuthenticated]


class VehicleChargingPointSerializer(serializers.ModelSerializer):
    """
    Transforms Django model into API representation
    """

    class Meta:
        model = VehicleChargingPoint
        fields = "__all__"


class VehicleChargingPointViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows vehicle charging points to be viewed or edited.
    """

    queryset = VehicleChargingPoint.objects.all()
    serializer_class = VehicleChargingPointSerializer
    # permission_classes = [permissions.IsAuthenticated]


class GroceryShopSerializer(serializers.ModelSerializer):
    """
    Transforms Django model into API representation
    """

    class Meta:
        model = GroceryShop
        fields = "__all__"


class GroceryShopViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows grocery shops to be viewed or edited.
    """

    queryset = GroceryShop.objects.all()
    serializer_class = GroceryShopSerializer
    # permission_classes = [permissions.IsAuthenticated]


@api_view(["GET"])
def area_details(request):
    try:
        sql = """
            SELECT code, name, centre_lat, centre_long, crime_count, school_count, green_area_total, blue_area_total, vehicle_charging_count, grocery_count, price_avg, stations, crime_category, retailer
            FROM api_area aa
            LEFT JOIN (
                SELECT 
                    SUBSTR(postcode, 1, INSTR(postcode, ' ')-1) as area_code, COUNT(*) as crime_count
                FROM api_crimeincident
                GROUP BY area_code
            ) ac ON aa.code = ac.area_code
            LEFT JOIN (
                SELECT *
                FROM
                    (SELECT *, ROW_NUMBER() OVER(PARTITION BY area_code ORDER BY area_code, category_count DESC) as rn
                    FROM 
                        (SELECT 
                            SUBSTR(postcode, 1, INSTR(postcode, ' ')-1) as area_code, category as crime_category, COUNT(category) as category_count
                        FROM api_crimeincident
                        GROUP BY area_code, category))  
                WHERE rn = 1
            ) ac2 ON aa.code = ac2.area_code
            LEFT JOIN (
                SELECT 
                    SUBSTR(postcode, 1, INSTR(postcode, ' ')-1) as area_code, COUNT(*) as school_count
                FROM api_school
                GROUP BY area_code
            ) sc ON aa.code = sc.area_code
            LEFT JOIN (
                SELECT 
                    area_code, SUM(green_area_hectares) as green_area_total, SUM(blue_area_hectares) as blue_area_total
                FROM api_greenbluearea
                GROUP BY area_code
            ) ag ON aa.code = ag.area_code
            LEFT JOIN (
                SELECT 
                    SUBSTR(postcode, 1, INSTR(postcode, ' ')-1) as area_code, COUNT(*) as vehicle_charging_count
                FROM api_vehiclechargingpoint
                GROUP BY area_code
            ) av ON aa.code = av.area_code
            LEFT JOIN (
                SELECT 
                    SUBSTR(postcode, 1, INSTR(postcode, ' ')-1) as area_code, COUNT(*) as grocery_count
                FROM api_groceryshop 
                GROUP BY area_code
            ) agc ON aa.code = agc.area_code
            LEFT JOIN (
                SELECT *
                FROM
                    (SELECT *, ROW_NUMBER() OVER(PARTITION BY area_code ORDER BY area_code, retailer_count DESC) as rn
                    FROM 
                        (SELECT 
                            SUBSTR(postcode, 1, INSTR(postcode, ' ')-1) as area_code, retailer, COUNT(retailer) as retailer_count
                        FROM api_groceryshop
                        GROUP BY area_code, retailer))  
                WHERE rn = 1
            ) agc2 ON aa.code = agc2.area_code
            LEFT JOIN (
                SELECT 
                    SUBSTR(postcode, 1, INSTR(postcode, ' ')-1) as area_code, AVG(price) as price_avg
                FROM api_property
                GROUP BY area_code
            ) ap ON aa.code = ap.area_code
            LEFT JOIN (
                SELECT area_code, GROUP_CONCAT(' ' || name) as stations
                FROM 
                    (SELECT DISTINCT  
                        SUBSTR(postcode, 1, INSTR(postcode, ' ')-1) as area_code, api_station.name as name
                    FROM api_stationunit 
                    INNER JOIN  api_station 
                        ON api_station.station_code=SUBSTR(api_stationunit.unit_code, 1, LENGTH(api_station.station_code))
                    ORDER BY area_code, name
                    )
                GROUP BY area_code
            ) s ON aa.code = s.area_code
            """
        with connection.cursor() as cursor:
            cursor.execute(sql)
            area_details = []
            col_names = [desc[0] for desc in cursor.description]
            for row in cursor.fetchall():
                area = {}
                for i in range(len(col_names)):
                    area[col_names[i]] = row[i]
                area_details.append(area)

        return Response(area_details)
    except Exception as e:
        print(e)
        return Response(status=500)
