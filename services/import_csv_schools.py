""" This script reads a CSV file and imports its data into a SQLite database. This is used for the schools data."""

import csv
import sqlite3

csv_file_path = "api/data/schools.csv"

sqlite_db_path = "db.sqlite3"

conn = sqlite3.connect(sqlite_db_path)
cursor = conn.cursor()

with open(csv_file_path, "r") as csv_file:
    reader = csv.reader(csv_file)

    headers = next(reader)

    for row in reader:
        db_row = [
            row[2],
            row[5],
            row[7],
            row[23],
            row[22],
            row[3],
            row[9],
        ]
        placeholders = ", ".join("?" * len(db_row))
        insert_query = f"INSERT INTO api_school (name, address, postcode, latitude, longitude, type, gender) VALUES ({placeholders});"
        cursor.execute(insert_query, db_row)

conn.commit()
conn.close()
