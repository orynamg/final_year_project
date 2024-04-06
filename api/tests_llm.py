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
