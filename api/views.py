from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import permissions, viewsets, serializers
from .models import Property, CrimeIncident, Station, StationUnit


@api_view(["GET"])
def hello_world(request):
    return Response({"message": "Hello, Oryna!"})


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
