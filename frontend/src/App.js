import React from "react";
import HelloWorld from "./HelloWorld";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import MapView from "./components/map";

function App() {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <MapView />
    </div>
  );
}

export default App;
