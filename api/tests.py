from django.test import TestCase
from django.test.client import RequestFactory
from api.models import Property, Area
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


class ViewsTestCase(TestCase):

    def setUp(self):
        self.factory = RequestFactory()

    def test_area_details(self):
        request = self.factory.get("/area-details/")
        response = area_details(request=request)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, [])

    def test_area_details_with_areas(self):
        """Test instances of Area model are created and returned"""
        Area.objects.create(
            name="Aldgate", code="E1", centre_lat=51.514248, centre_long=-0.075714
        )
        Area.objects.create(
            name="Canary Wharf", code="E14", centre_lat=51.5049, centre_long=-0.0195
        )

        request = self.factory.get("/area-details/")
        response = area_details(request=request)
        self.assertEqual(response.status_code, 200)
        self.assertNotEqual(response.data, [])
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.data[0]["name"], "Aldgate")
        self.assertEqual(response.data[1]["name"], "Canary Wharf")

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
        mock_llm = MagicMock()
        mock_llm.generate_sql.return_value = "SELECT * FROM api_property"
        mock_conn = MagicMock()
        mock_conn.cursor().fetchall.return_value = [("SW19 8NY",)]

        request = self.factory.post(
            "/search/", {"text": "What are the top 5 safest areas"}
        )
        response = search(request=request, conn=mock_conn, llm=mock_llm)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data, {"areas": ["SW19 8NY"]})
        mock_conn.close.assert_called_once()
        mock_llm.generate_sql.assert_called_once()
        mock_conn.cursor().execute.assert_called_once_with("SELECT * FROM api_property")
