import React, { useEffect, useState, useRef } from "react";
import { APIProvider, Map, useMap, Marker } from "@vis.gl/react-google-maps";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

const Markers = ({ points }) => {
  const map = useMap();
  const [markers, setMarkers] = useState({});
  const clusterer = useRef(null);

  // Initialize MarkerClusterer
  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map });
    }
  }, [map]);

  // Update markers
  useEffect(() => {
    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markers));
  }, [markers]);

  const setMarkerRef = (marker, key) => {
    if (marker && markers[key]) return;
    if (!marker && !markers[key]) return;

    setMarkers((prev) => {
      if (marker) {
        return { ...prev, [key]: marker };
      } else {
        const newMarkers = { ...prev };
        delete newMarkers[key];
        return newMarkers;
      }
    });
  };

  const showPropertyInfo = (e) => {
    console.log("showPropertyInfo");
    console.log(e);
  };

  return (
    <>
      {points.map((point) => (
        <Marker
          position={point}
          key={point.key}
          ref={(marker) => setMarkerRef(marker, point.key)}
          onClick={showPropertyInfo}
        >
          <span className="text-xl rounded-full bg-slate-300 px-3 py-2.5">
            🏠
          </span>
        </Marker>
      ))}
    </>
  );
};

export default Markers;
