import React, { useState, useEffect, useRef } from "react";
import {
  Map as GoogleMap,
  useMap,
  useApiIsLoaded,
  GoogleMapsContext,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import Markers from "./markers.js";
import jsonEData from "../area_code_polygons/E.json";
import jsonNData from "../area_code_polygons/N.json";
import jsonNwData from "../area_code_polygons/NW.json";
import jsonSeData from "../area_code_polygons/SE.json";
import jsonSwData from "../area_code_polygons/SW.json";
import jsonWData from "../area_code_polygons/W.json";
import jsonECData from "../area_code_polygons/EC.json";
import jsonWCData from "../area_code_polygons/WC.json";

const loadPolygons = (polygonMap, jsonData) => {
  jsonData.features.forEach((feature) => {
    const areaCode = feature.properties.name;
    const coordinates = [];

    feature.geometry.coordinates.forEach((coordinate) => {
      coordinate.forEach((coordPair) => {
        coordinates.push({ lat: coordPair[1], lng: coordPair[0] });
      });
    });

    polygonMap.set(areaCode, coordinates);
  });
};

const createPolygonMap = () => {
  const polygonMap = new Map();
  loadPolygons(polygonMap, jsonEData);
  loadPolygons(polygonMap, jsonNData);
  loadPolygons(polygonMap, jsonNwData);
  loadPolygons(polygonMap, jsonSeData);
  loadPolygons(polygonMap, jsonSwData);
  loadPolygons(polygonMap, jsonWData);
  loadPolygons(polygonMap, jsonECData);
  loadPolygons(polygonMap, jsonWCData);

  return polygonMap;
};

const MapStyle = [
  /** Map customisation following the boiler plate at https://developers.google.com/maps/documentation/javascript/examples/style-array */
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#e5e5e5" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#94A2B8" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#263c3f" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6b9a76" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#38414e" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#212a37" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9ca5b3" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#111827" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1f2835" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#94A2B8" }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#2f3948" }],
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#17263c" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#515c6d" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#17263c" }],
  },
];

function MapView({ selectedCoors, zoom, areaCode }) {
  /**
   * This component renders the map view with the polygon overlay and markers. Inspired by the example at https://developers.google.com/maps/documentation/javascript/examples/polygon-simple and https://github.com/visgl/react-google-maps/tree/main/examples
   */
  const polygonMap = createPolygonMap();
  const isLoaded = useApiIsLoaded();
  const map = useMap();
  const mapsLibrary = useMapsLibrary("maps");
  const polygon = useRef(null);
  const [properties, setProperties] = useState([]);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (areaCode == "") {
      setMarkers([]);
      setProperties([]);
      return;
    }

    if (polygon.current) {
      polygon.current.setMap(null);
    }

    if (!map && !isLoaded) return;

    const polygonCoords = polygonMap.get(areaCode);
    polygon.current = new mapsLibrary.Polygon({
      paths: polygonCoords,
      strokeColor: "#b38600",
      strokeOpacity: 0.8,
      strokeWeight: 1,
      fillColor: "#b38600",
      fillOpacity: 0.25,
    });

    fetch("http://localhost:8000/api/properties?area=" + areaCode)
      .then((response) => response.json())
      .then((data) => {
        setMarkers(
          data.map((point) => ({
            key: point.id,
            lat: point.latitude,
            lng: point.longitude,
          }))
        );
        setProperties(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    polygon.current.setMap(map);
    map.panTo({ lat: selectedCoors.lat, lng: selectedCoors.lng - 0.04 });
  }, [areaCode]);

  return (
    <div className="z-[-100] !fixed top-0 right-0 left-0">
      <GoogleMap
        zoom={zoom}
        center={{ lat: 51.5072, lng: -0.1876 }}
        styles={MapStyle}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        className=" h-screen z-[-5]"
      >
        <Markers points={markers} properties={properties} />
      </GoogleMap>
    </div>
  );
}

export default MapView;
