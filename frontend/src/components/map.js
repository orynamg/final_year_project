import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { APIProvider, Map as GoogleMap } from "@vis.gl/react-google-maps";
import jsonEData from "../area_code_polygons/E.json";
import jsonNData from "../area_code_polygons/N.json";
import jsonNwData from "../area_code_polygons/NW.json";
import jsonSeData from "../area_code_polygons/SE.json";
import jsonSwData from "../area_code_polygons/SW.json";
import jsonWData from "../area_code_polygons/W.json";
import jsonECData from "../area_code_polygons/EC.json";
import jsonWCData from "../area_code_polygons/WC.json";

const API_KEY = "";

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

  console.log(polygonMap);
  return polygonMap;
};

const MapStyle = [
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
  const polygonMap = useState(createPolygonMap());

  return (
    <div>
      {/* {polygonMap.get(areaCode).forEach((coordinates) => (
        <div>
          {coordinates.lat} {coordinates.lng}
        </div>
      ))} */}
      <div className="z-[-100] !fixed top-0 right-0  left-0">
        <APIProvider apiKey={API_KEY}>
          <GoogleMap
            zoom={zoom}
            center={selectedCoors}
            styles={MapStyle}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
            className=" h-screen z-[-5]"
          />
        </APIProvider>
      </div>
    </div>
  );
}

export default MapView;
