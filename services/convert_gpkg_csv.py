# %%
import geopandas as gpd
import sqlite3

# %%
# df = gpd.read_file(
#     "/Users/oryna/Documents/dev/Project/final_year_project/api/data/roadnoise/Road_Noise_Lden_England_Round_3.shp"
# )

df = gpd.read_file(
    "/Users/oryna/Documents/dev/Project/final_year_project/api/data/Rapid_charging_points.gpkg"
)

print(df.head())


# %%
df = df.drop(columns=["geometry"])

# Save the DataFrame to CSV
csv_path = "/Users/oryna/Documents/dev/Project/final_year_project/api/data/vehicle_charging.csv"
df.to_csv(csv_path, index=False)

# %%
