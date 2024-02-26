import React, { useEffect, useState, useRef } from "react";
import {
  APIProvider,
  Map,
  useMap,
  Marker,
  useMarkerRef,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

const Markers = ({ points, properties }) => {
  const map = useMap();
  const [markers, setMarkers] = useState({});
  const clusterer = useRef(null);
  const [currentProperty, setCurrentProperty] = useState(null);
  const [infowindowOpen, setInfowindowOpen] = useState(true);
  //   const [activeMarker, setActiveMarker] = useState(null);

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
    setCurrentProperty(
      properties.find(
        (property) =>
          property.latitude === e.latLng.lat() &&
          property.longitude === e.latLng.lng()
      )
    );
    console.log(currentProperty);
  };

  return (
    <>
      {points.map((point) => (
        <Marker
          position={point}
          key={point.key}
          ref={(marker) => setMarkerRef(marker, point.key)}
          onClick={showPropertyInfo}
          className="text-violet-500"
        >
          <span className="text-xl rounded-full bg-slate-300 px-3 py-2.5">
            🏠
          </span>
        </Marker>
      ))}

      {infowindowOpen && (
        <InfoWindow
          //   anchor={activeMarker}
          maxWidth={200}
          onCloseClick={() => setInfowindowOpen(false)}
        >
          This is an example for the{" "}
          <code style={{ whiteSpace: "nowrap" }}>&lt;AdvancedMarker /&gt;</code>{" "}
          combined with an Infowindow.
        </InfoWindow>
      )}
    </>
  );
};

export default Markers;
