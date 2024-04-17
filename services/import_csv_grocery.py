""" This script reads a CSV file and imports its data into a SQLite database. This is used for the grocery data."""

import csv
import sqlite3

csv_file_path = "api/data/grocery.csv"

sqlite_db_path = "db.sqlite3"

conn = sqlite3.connect(sqlite_db_path)
cursor = conn.cursor()

with open(csv_file_path, "r") as csv_file:
    reader = csv.reader(csv_file)

    headers = next(reader)

    for row in reader:
        if row[6] != "London":
            continue
        db_row = [
            row[1],
            row[2],
            row[4] + " " + row[5],
            row[8],
            row[10],
            row[9],
        ]
        placeholders = ", ".join("?" * len(db_row))
        insert_query = f"INSERT INTO api_groceryshop (retailer, type, address, postcode, latitude, longitude) VALUES ({placeholders});"
        cursor.execute(insert_query, db_row)

conn.commit()
conn.close()
