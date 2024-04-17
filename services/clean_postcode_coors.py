""" This script cleans the postcodes.csv file and creates a new file with only the postcode, latitude and longitude columns."""

import csv

input_file = "api/data/postcodes.csv"

output_file = "api/data/postcodes_clean.csv"

with open(input_file, "r") as csv_file:
    reader = csv.reader(csv_file)
    headers = next(reader)

    with open(output_file, "w") as output_csv_file:
        writer = csv.writer(output_csv_file)
        writer.writerow(["postcode", "latitude", "longitude"])

        for row in reader:
            writer.writerow([row[0], row[2], row[3]])
