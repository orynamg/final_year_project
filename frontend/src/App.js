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

  return (
    <div>
      <Navbar />
      <Sidebar
        selectedCoors={selectedCoors}
        setSelectedCoors={setSelectedCoors}
      />
      <MapView selectedCoors={selectedCoors} />
    </div>
  );
}

export default App;
