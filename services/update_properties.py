import csv
import sqlite3

input_file = "api/data/postcodes_clean.csv"

postcodes = {}

with open(input_file, "r") as csv_file:
    reader = csv.reader(csv_file)
    headers = next(reader)

    for row in reader:
        postcodes[row[0]] = (row[1], row[2])

conn = sqlite3.connect("db.sqlite3")
cursor = conn.cursor()

cursor.execute("SELECT * FROM api_property")
properties = cursor.fetchall()
for property in properties:
    postcode = property[8]
    if postcode in postcodes:
        lat, lon = postcodes[postcode]
        cursor.execute(
            "UPDATE api_property SET latitude = ?, longitude = ? WHERE postcode = ?",
            (lat, lon, postcode),
        )

conn.commit()