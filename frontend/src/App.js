import React from "react";
import HelloWorld from "./HelloWorld";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import MapView from "./components/map";
import { useState } from "react";

function App() {
  const [selectedCoors, setSelectedCoors] = useState({
    lat: 51.5072,
    lng: -0.1876,
  });
  const [zoom, setZoom] = useState(12);

  return (
    <div>
      <Navbar />
      <Sidebar
        selectedCoors={selectedCoors}
        setSelectedCoors={setSelectedCoors}
        setZoom={setZoom}
      />
      <MapView selectedCoors={selectedCoors} zoom={zoom} />
    </div>
  );
}

export default App;
