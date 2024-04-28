from django.test import TestCase
from django.test.client import RequestFactory
from api.models import Property, Area, CrimeIncident, Station, School
from api.views import search, PropertyList, area_details
from django.http import HttpRequest
from unittest.mock import MagicMock


class PropertyTestCase(TestCase):
    def setUp(self):
        Property.objects.create(
            name="Queens Road",
            price="1675000",
            house_type="Detached",
            area_sqft="3000",
            bedrooms="4",
            bathrooms="2",
            receptions="2",
            postcode="SW19 8NY",
            city="London",
            latitude="51.4226",
            longitude="-0.2061",
        )
        Property.objects.create(
            name="Kings Road",
            price="1500000",
            house_type="Detached",
            area_sqft="2500",
            bedrooms="3",
            bathrooms="2",
            receptions="2",
            postcode="SW19 8NY",
            city="London",
            latitude="51.4226",
            longitude="-0.2061",
        )

    def test_property_name(self):
        """Property names are correctly identified"""
        queens_road = Property.objects.get(name="Queens Road")
        kings_road = Property.objects.get(name="Kings Road")
        self.assertEqual(queens_road.name, "Queens Road")
        self.assertEqual(kings_road.name, "Kings Road")

    def test_property_price(self):
        """Property prices are correctly identified"""
        queens_road = Property.objects.get(name="Queens Road")
        kings_road = Property.objects.get(name="Kings Road")
        self.assertEqual(queens_road.price, 1675000)
        self.assertEqual(kings_road.price, 1500000)


class AreaTestCase(TestCase):

    def setUp(self):
        Area.objects.create(
            name="Aldgate", code="E1", centre_lat=51.514248, centre_long=-0.075714
        )
        Area.objects.create(
            name="Canary Wharf", code="E14", centre_lat=51.5049, centre_long=-0.0195
        )

    def test_area_name(self):
        """Area names are correctly identified"""
        aldgate = Area.objects.get(name="Aldgate")
        canary_wharf = Area.objects.get(name="Canary Wharf")
        self.assertEqual(aldgate.name, "Aldgate")
        self.assertEqual(canary_wharf.name, "Canary Wharf")

    def test_area_code(self):
        """Area codes are correctly identified"""
        aldgate = Area.objects.get(name="Aldgate")
        canary_wharf = Area.objects.get(name="Canary Wharf")
        self.assertEqual(aldgate.code, "E1")
        self.assertEqual(canary_wharf.code, "E14")


class CrimeIncidentTestCase(TestCase):

    def setUp(self):
        CrimeIncident.objects.create(
            category="Burglary",
            latitude=51.514248,
            longitude=-0.075714,
            postcode="E1 7AA",
            street_name="Aldgate High Street",
            month=1,
            year=2022,
        )
        CrimeIncident.objects.create(
            category="Robbery",
            latitude=51.5049,
            longitude=-0.0195,
            postcode="E14 5AB",
            street_name="Canary Wharf",
            month=2,
            year=2022,
        )

    def test_crime_incident_category(self):
        """Crime incident categories are correctly identified"""
        burglary = CrimeIncident.objects.get(category="Burglary")
        robbery = CrimeIncident.objects.get(category="Robbery")
        self.assertEqual(burglary.category, "Burglary")
        self.assertEqual(robbery.category, "Robbery")

    def test_crime_incident_postcode(self):
        """Crime incident postcodes are correctly identified"""
        burglary = CrimeIncident.objects.get(category="Burglary")
        robbery = CrimeIncident.objects.get(category="Robbery")
        self.assertEqual(burglary.postcode, "E1 7AA")
        self.assertEqual(robbery.postcode, "E14 5AB")


class StationTestCase(TestCase):

    def setUp(self):
        Station.objects.create(
            station_code="EUS",
            name="Euston",
            fare_zone="1",
        )
        Station.objects.create(
            station_code="VIC",
            name="Victoria",
            fare_zone="1",
        )

    def test_station_name(self):
        """Station names are correctly identified"""
        euston = Station.objects.get(name="Euston")
        victoria = Station.objects.get(name="Victoria")
        self.assertEqual(euston.name, "Euston")
        self.assertEqual(victoria.name, "Victoria")

    def test_station_fare_zone(self):
        """Station fare zones are correctly identified"""
        euston = Station.objects.get(name="Euston")
        victoria = Station.objects.get(name="Victoria")
        self.assertEqual(euston.fare_zone, "1")
        self.assertEqual(victoria.fare_zone, "1")


class SchoolTestCase(TestCase):

    def setUp(self):
        School.objects.create(
            name="St Mary's",
            address="123 High Street",
            postcode="E1 7AA",
            latitude=51.514248,
            longitude=-0.075714,
            type="Primary",
        )
        School.objects.create(
            name="St John's",
            address="456 Low Street",
            postcode="E14 5AB",
            latitude=51.5049,
            longitude=-0.0195,
            type="Secondary",
        )

    def test_school_name(self):
        """School names are correctly identified"""
        st_marys = School.objects.get(name="St Mary's")
        st_johns = School.objects.get(name="St John's")
        self.assertEqual(st_marys.name, "St Mary's")
        self.assertEqual(st_johns.name, "St John's")

    def test_school_type(self):
        """School types are correctly identified"""
        st_marys = School.objects.get(name="St Mary's")
        st_johns = School.objects.get(name="St John's")
        self.assertEqual(st_marys.type, "Primary")
        self.assertEqual(st_johns.type, "Secondary")


class ViewsTestCase(TestCase):

    def setUp(self):
        self.factory = RequestFactory()

    def test_area_details(self):
        mock_conn = MagicMock()
        mock_conn.cursor().description = [
            ("code",),
            ("name",),
            ("centre_lat",),
            ("centre_long",),
            ("crime_count",),
            ("school_count",),
            ("green_area_total",),
            ("blue_area_total",),
            ("vehicle_charging_count",),
            ("grocery_count",),
            ("price_avg",),
            ("stations",),
            ("crime_category",),
            ("retailer",),
        ]
        mock_conn.cursor().fetchall.return_value = [
            (
                "E10",
                "Leyton",
                51.56633843576615,
                -0.020374095029198812,
                789,
                15,
                185.3,
                10.32,
                "null",
                9,
                "null",
                "Leyton Midland Road",
                "Anti-social behaviour",
                "Tesco",
            )
        ]

        request = self.factory.get("/area-details/")
        response = area_details(request=request, conn=mock_conn)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(
            response.data,
            [
                {
                    "code": "E10",
                    "name": "Leyton",
                    "centre_lat": 51.56633843576615,
                    "centre_long": -0.020374095029198812,
                    "crime_count": 789,
                    "school_count": 15,
                    "green_area_total": 185.3,
                    "blue_area_total": 10.32,
                    "vehicle_charging_count": "null",
                    "grocery_count": 9,
                    "price_avg": "null",
                    "stations": "Leyton Midland Road",
                    "crime_category": "Anti-social behaviour",
                    "retailer": "Tesco",
                },
            ],
        )
        mock_conn.close.assert_called_once()

    def test_property_list(self):
        request = self.factory.get("/properties/")
        response = PropertyList.as_view()(request)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, [])

    def test_property_list_with_properties(self):
        """Test instances of Property model are created and returned"""

        Property.objects.create(
            name="Queens Road",
            price="1675000",
            house_type="Detached",
            area_sqft="3000",
            bedrooms="4",
            bathrooms="2",
            receptions="2",
            postcode="SW19 8NY",
            city="London",
            latitude="51.4226",
            longitude="-0.2061",
        )
        Property.objects.create(
            name="Kings Road",
            price="1500000",
            house_type="Detached",
            area_sqft="2500",
            bedrooms="3",
            bathrooms="2",
            receptions="2",
            postcode="SW19 8NY",
            city="London",
            latitude="51.4226",
            longitude="-0.2061",
        )

        request = self.factory.get("/properties/")
        response = PropertyList.as_view()(request)
        self.assertEqual(response.status_code, 200)
        self.assertNotEqual(response.data, [])
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.data[0]["name"], "Queens Road")
        self.assertEqual(response.data[1]["name"], "Kings Road")

    def test_search(self):
        user_query = "What are the top 5 safest areas"
        mock_sql = "SELECT * FROM api_property"
        mock_llm = MagicMock()
        mock_llm.generate_sql.return_value = mock_sql
        mock_conn = MagicMock()
        mock_conn.cursor().fetchall.return_value = [("SW19 8NY",)]

        request = self.factory.post("/search/", {"text": user_query})
        response = search(request=request, conn=mock_conn, llm=mock_llm)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data, {"areas": ["SW19 8NY"]})
        mock_conn.close.assert_called_once()
        mock_llm.generate_sql.assert_called_once_with(user_query)
        mock_conn.cursor().execute.assert_called_once_with(mock_sql)
