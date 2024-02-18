import csv
import sqlite3

# Path to your CSV file
csv_file_path = "api/data/London.csv"

# Path to your SQLite database
sqlite_db_path = "db.sqlite3"

# Connect to SQLite database (this will create the database if it doesn't exist)
conn = sqlite3.connect(sqlite_db_path)
cursor = conn.cursor()

# Read the CSV file
with open(csv_file_path, "r") as csv_file:
    reader = csv.reader(csv_file)

    # Assuming the first row is the header
    headers = next(reader)

    # Create table with appropriate column names
    # This assumes all data is text, modify the types if needed
    # column_definitions = ", ".join([f'"{header}" TEXT' for header in headers])
    # create_table_query = f"CREATE TABLE IF NOT EXISTS area ({column_definitions});"
    # cursor.execute(create_table_query)

    # Insert rows from CSV into the table
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

# Commit changes and close the connection
conn.commit()
conn.close()
