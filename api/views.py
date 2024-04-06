import sqlite3
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import permissions, viewsets, serializers, generics
from .models import Property
from .llm import LLMQueryGenerator
from django.db import connection
import logging

logger = logging.getLogger(__name__)
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(name)s %(levelname)s %(message)s",
    handlers=[logging.StreamHandler()],
)


@api_view(["POST"])
def search(request, conn=None, llm=None):
    try:
        # Logging user query
        logger.info(request.data)
        if not llm:
            llm = LLMQueryGenerator("api/data/prompt.txt", "api/models.py")
        sql = llm.generate_sql(request.data["text"])

        # Logging generated SQL
        logger.info(sql)
        if any(word in sql.upper() for word in ("DROP", "DELETE", "UPDATE", "INSERT")):
            logger.error("SQL Injection detected")
            return Response(status=400)
        if not conn:
            conn = sqlite3.connect("db.sqlite3")
        conn.enable_load_extension(True)
        conn.load_extension("regex02")
        conn.enable_load_extension(False)
        cursor = conn.cursor()
        cursor.execute(sql)
        areas = []
        for row in cursor.fetchall():
            area = row[0].strip()
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


class PropertyList(generics.ListAPIView):
    serializer_class = PropertySerializer

    def get_queryset(self):
        queryset = Property.objects.all()
        areas = self.request.query_params.get("areas", None)
        if areas is not None:
            areas = areas.split(",")
            area_placeholders = "|".join(["%s"] * len(areas))
            print(area_placeholders, areas)
            query = f"SELECT * FROM api_property WHERE postcode REGEXP '^({area_placeholders})\D* '"
            query = query % tuple(areas)
            queryset = Property.objects.raw(query)
        return queryset


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
