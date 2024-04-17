""" This script imports data from a CSV file into the SQLite database. """

import csv
import sqlite3

csv_file_path = "api/data/areas.csv"

sqlite_db_path = "db.sqlite3"

conn = sqlite3.connect(sqlite_db_path)
cursor = conn.cursor()

with open(csv_file_path, "r") as csv_file:
    reader = csv.reader(csv_file)

    headers = next(reader)

    for row in reader:
        placeholders = ", ".join("?" * len(row))
        insert_query = f"INSERT INTO api_area (code, name, centre_lat, centre_long) VALUES ({placeholders});"
        cursor.execute(insert_query, row)

# Commit changes and close the connection
conn.commit()
conn.close()
