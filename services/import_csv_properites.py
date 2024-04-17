""" This script reads a CSV file and imports its data into a SQLite database. This is used for the properties data."""

import csv
import sqlite3

csv_file_path = "api/data/London.csv"

sqlite_db_path = "db.sqlite3"

conn = sqlite3.connect(sqlite_db_path)
cursor = conn.cursor()

with open(csv_file_path, "r") as csv_file:
    reader = csv.reader(csv_file)

    headers = next(reader)

    for row in reader:
        db_row = [
            row[1],
            row[2],
            row[3],
            row[4],
            row[5],
            row[6],
            row[7],
            row[10],
            row[9],
        ]
        placeholders = ", ".join("?" * len(db_row))
        insert_query = f"INSERT INTO api_property (name, price, house_type, area_sqft, bedrooms, bathrooms, receptions, postcode, city) VALUES ({placeholders});"
        cursor.execute(insert_query, db_row)

conn.commit()
conn.close()
