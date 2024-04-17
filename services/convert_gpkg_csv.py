# %%
import geopandas as gpd
import sqlite3

df = gpd.read_file(
    "/Users/oryna/Documents/dev/Project/final_year_project/api/data/Rapid_charging_points.gpkg"
)

print(df.head())


# %%
df = df.drop(columns=["geometry"])

csv_path = "/Users/oryna/Documents/dev/Project/final_year_project/api/data/vehicle_charging.csv"
df.to_csv(csv_path, index=False)

# %%
