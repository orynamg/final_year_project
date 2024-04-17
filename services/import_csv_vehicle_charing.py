""" This script reads a CSV file and imports its data into a SQLite database. This is used for the vehicle charging points data. """

import csv
import sqlite3
from postcode_generator import get_postcode

csv_file_path = "api/data/vehicle_charging.csv"

sqlite_db_path = "db.sqlite3"

conn = sqlite3.connect(sqlite_db_path)
cursor = conn.cursor()

with open(csv_file_path, "r") as csv_file:
    reader = csv.reader(csv_file)

    headers = next(reader)

    for row in reader:
        db_row = [
            row[8],
            row[2],
            row[3],
            get_postcode(row[2], row[3]),
            row[0],
            row[9] == "Public use",
        ]
        print(db_row)
        placeholders = ", ".join("?" * len(db_row))
        insert_query = f"INSERT INTO api_vehiclechargingpoint (site_name, latitude, longitude, postcode, borough, public_use) VALUES ({placeholders});"
        cursor.execute(insert_query, db_row)

conn.commit()
conn.close()
