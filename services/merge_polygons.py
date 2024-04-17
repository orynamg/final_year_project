""" This script merges the polygons of the areas in the geojson file and updates the centre_lat and centre_long of the areas in the database. This was used with the shapely library (https://geopandas.org/en/stable/docs/reference/api/geopandas.GeoSeries.unary_union.html) and ChatGPT to merge the polygons of the areas in the geojson file."""

from shapely.geometry import shape, Polygon
from shapely.ops import unary_union
from collections import defaultdict
import json
import sqlite3
import re

geojson_input = "api/data/area_code_polygons/WC.json"
geojson_output = "frontend/src/area_code_polygons/WC.json"

with open(geojson_input) as f:
    geojson_data = json.load(f)

area_code_regex = re.compile(r"^\w+\d+")

areas = defaultdict(list)

for feature in geojson_data["features"]:
    area_code = area_code_regex.search(feature["properties"]["name"]).group(0)
    areas[area_code].append(shape(feature["geometry"]))


conn = sqlite3.connect("db.sqlite3")
cursor = conn.cursor()

output = {"type": "FeatureCollection", "features": []}

with open(geojson_output, "w") as f:

    for area_code, polygons in areas.items():
        merged_polygon = unary_union(polygons)
        output["features"].append(
            {
                "type": "Feature",
                "properties": {"name": area_code},
                "geometry": merged_polygon.__geo_interface__,
            }
        )
        centroid = merged_polygon.centroid
        db_row = [centroid.y, centroid.x, area_code]
        insert_query = "UPDATE api_area SET centre_lat=?, centre_long=? WHERE code=?;"
        cursor.execute(insert_query, db_row)

        print(f"Area Code: {area_code}")

    json.dump(output, f, indent=2)

conn.commit()
conn.close()
