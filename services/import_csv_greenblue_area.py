""" This script reads a CSV file and imports its data into a SQLite database. This is used for the green and blue areas data."""

import csv
import sqlite3

csv_ward_area_code = "api/data/ward_to_areacode.csv"

ward_to_area_code = {}

with open(csv_ward_area_code, "r") as csv_file:
    reader = csv.reader(csv_file)
    headers = next(reader)

    for row in reader:
        ward_to_area_code[row[0]] = row[1]


csv_file_path = "api/data/green_cover2.csv"

sqlite_db_path = "db.sqlite3"

conn = sqlite3.connect(sqlite_db_path)
cursor = conn.cursor()


with open(csv_file_path, "r") as csv_file:
    reader = csv.reader(csv_file)
    headers = next(reader)
    inserted_wards = set()

    for row in reader:
        if row[3] in inserted_wards:
            print(row[3] + " already inserted")
            continue

        db_row = [
            row[3],
            ward_to_area_code[row[3]],
            row[0],
            row[4],
            row[5],
            row[6],
            row[7],
            row[8],
            row[9],
            row[10],
        ]
        placeholders = ", ".join("?" * len(db_row))
        insert_query = f"INSERT INTO api_greenbluearea (ward_name, area_code, borough, ward_area_hectares, green_area_hectares, blue_area_hectares, green_and_blue_area_hectare, percent_green, percent_blue, percent_green_and_blue) VALUES ({placeholders});"
        cursor.execute(insert_query, db_row)
        inserted_wards.add(row[3])

conn.commit()
conn.close()
