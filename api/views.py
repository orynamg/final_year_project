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
        with connection.cursor() as cursor:
            cursor.execute(sql)
            areas = []
            for row in cursor.fetchall():
                area = row[0].strip()
                area = area.rstrip(
                    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
                )
                if area not in areas:
                    areas.append(area)
        return Response({"areas": areas})
    except Exception as e:
        print(e)
        return Response(status=500)


class PropertySerializer(serializers.ModelSerializer):
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
