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
  const [infowindowOpen, setInfowindowOpen] = useState(false);
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

  let activeMarker = useRef(null);

  const showPropertyInfo = (e) => {
    activeMarker.current = e;
    setCurrentProperty(
      properties.find(
        (property) =>
          property.latitude === e.latLng.lat() &&
          property.longitude === e.latLng.lng()
      )
    );
    console.log(currentProperty);
    setInfowindowOpen(true);
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
          position={{
            lat: activeMarker.current?.latLng.lat(),
            lng: activeMarker.current?.latLng.lng(),
          }}
          maxWidth={200}
          onCloseClick={() => {
            setInfowindowOpen(false);
            activeMarker.current = null;
          }}
          className="!bg-black"
        >
          <div className="p-3 font-normal tracking-wider mr-2 mb-1">
            <h1 className="p-0.5 font-bold mb-1 mt-[-0.5rem] max-w-[7rem]">
              {currentProperty?.name}
            </h1>
            <p className="p-0.5">
              Price: £{(currentProperty?.price).toLocaleString()}
            </p>
            <p className="p-0.5">House Type: {currentProperty?.house_type}</p>
            <p className="p-0.5">Area: {currentProperty?.area_sqft} sq.ft.</p>
            <p className="p-0.5">Bedrooms: {currentProperty?.bedrooms}</p>
            <p className="p-0.5">Bathrooms: {currentProperty?.bathrooms}</p>
            <p className="p-0.5">Postcode: {currentProperty?.postcode}</p>
          </div>
        </InfoWindow>
      )}
    </>
  );
};

export default Markers;
