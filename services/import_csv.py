import csv
import sqlite3

# Path to your CSV file
csv_file_path = "api/data/areas.csv"

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
        placeholders = ", ".join("?" * len(row))
        insert_query = f"INSERT INTO api_area (code, name) VALUES ({placeholders});"
        cursor.execute(insert_query, row)

# Commit changes and close the connection
conn.commit()
conn.close()
