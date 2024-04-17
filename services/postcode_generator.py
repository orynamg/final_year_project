""" This module contains the function to get the postcode from the latitude and longitude """

import requests


def get_postcode(
    latitude,
    longitude,
):
    response = requests.get(
        f"https://findthatpostcode.uk/points/{latitude},{longitude}.json"
    )
    data = response.json()
    return data["data"]["relationships"]["nearest_postcode"]["data"]["id"]


# print(get_postcode(51.6061900, -0.1473220))
