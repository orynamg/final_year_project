from django.test import TestCase
from .llm import LLMQueryGenerator
import sqlite3
from parameterized import parameterized


class LLMTestCase(TestCase):

    def setUp(self):
        self.llm = LLMQueryGenerator("api/data/prompt.txt", "api/models.py")
        self.conn = sqlite3.connect("db.sqlite3")
        self.conn.enable_load_extension(True)
        self.conn.load_extension("regex02")
        self.conn.enable_load_extension(False)

    def tearDown(self):
        self.conn.close()

    @parameterized.expand(
        [
            "Show me the safest areas in London",
            "What are the cheapest areas",
            "Which areas have the most schools",
            "What are the top 5 safest areas",
            "Give me the area with the least amount of burglaries",
            "Give me the area with the least amount of illegal entry of a building with intent to commit a crime, especially theft.",
            "Give me the area with the least amount of theft from a motor vehicle",
            "Give me areas with most vehicle charging ports and least amount of theft from a motor vehicle",
            "Give me areas most surrounded by water",
            "Which areas are closest to the city of london",
            "Which areas are closest to the city of london and have the most schools",
            "Which areas are closest to the city of london and have the most schools and have the least amount of theft from a motor vehicle",
            "Which areas have properties with 2 or more bedrooms under a million pounds",
            "Which areas have a train station nearby and most properties are flats/apartments",
            "Which areas have the most new builds",
            "Which areas have more than one Waitrose",
            "Which areas have more than one Waitrose and have the most schools",
            "Which areas have more than one Waitrose and have the most schools and have the least amount of theft from a motor vehicle",
            "Which areas have either a Waitrose or a Tesco",
        ]
    )
    def test_llm(self, user_query):
        print(user_query)
        sql = self.llm.generate_sql(user_query)
        print(sql)
        cursor = self.conn.cursor()
        cursor.execute(sql)
        areas = [row[0].strip() for row in cursor.fetchall()]
        print(areas)
        self.assertTrue(areas)
