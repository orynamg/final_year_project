import React from "react";
import HelloWorld from "./HelloWorld";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import MapView from "./components/map";
import Dashboard from "./components/dashboard";
import { useState } from "react";
import { APIProvider } from "@vis.gl/react-google-maps";

const API_KEY = "";

function App() {
  const [selectedCoors, setSelectedCoors] = useState({
    lat: 51.5072,
    lng: -0.1876,
  });
  const [zoom, setZoom] = useState(12);
  const [areaCode, setAreaCode] = useState("");

  return (
    <div>
      <Navbar />
      <Sidebar
        selectedCoors={selectedCoors}
        setSelectedCoors={setSelectedCoors}
        setZoom={setZoom}
        setAreaCode={setAreaCode}
        areaCode={areaCode}
      />
      {areaCode.length != 0 ? <Dashboard areaCode={areaCode} /> : <></>}
      <APIProvider apiKey={API_KEY}>
        <MapView
          selectedCoors={selectedCoors}
          zoom={zoom}
          areaCode={areaCode}
        />
      </APIProvider>
    </div>
  );
}

export default App;
