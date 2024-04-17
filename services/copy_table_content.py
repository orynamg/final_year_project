import sqlite3
import argparse


def copy_content(
    source_table, target_table, source_fields, target_fields, source_conn, target_conn
):
    """Copy the content of a table from one database to another. This was inspired by ChatGPT's code snippet service."""

    # Get the data from the source table
    source_cursor = source_conn.cursor()
    source_cursor.execute(f"SELECT {source_fields} FROM {source_table}")
    rows = source_cursor.fetchall()

    # Insert data into the target table
    target_cursor = target_conn.cursor()

    # Assuming the table structure is the same in both databases
    for row in rows:
        columns_count = len(row)
        placeholders = ",".join(["?"] * columns_count)
        target_cursor.execute(
            f"INSERT INTO {target_table} ({target_fields}) VALUES ({placeholders})",
            row,
        )

    target_conn.commit()
    source_cursor.close()


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--source_table", help="Source table name")
    parser.add_argument("--target_table", help="Destination table name")
    parser.add_argument("--source_db", help="Source database")
    parser.add_argument("--target_db", help="Destination database")
    parser.add_argument("--source_fields", help="Source fields", default="*")
    parser.add_argument("--target_fields", help="Target fields")
    args = parser.parse_args()

    # Connect to the source and target databases
    source_conn = sqlite3.connect(args.source_db)
    target_conn = sqlite3.connect(args.target_db)

    copy_content(
        args.source_table,
        args.target_table,
        args.source_fields,
        args.target_fields,
        source_conn,
        target_conn,
    )

    # Close the connections
    target_conn.close()
    source_conn.close()


# Run the script
if __name__ == "__main__":
    main()
