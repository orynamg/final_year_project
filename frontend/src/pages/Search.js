import React from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import MapView from "../components/map";
import Dashboard from "../components/dashboard";
import { useState } from "react";
import { APIProvider } from "@vis.gl/react-google-maps";
import { useLocation } from "react-router-dom";
import useSWR from "swr";

const base_url = "http://localhost:8000";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const API_KEY = "";

function useQuery() {
  const { search: queryParams } = useLocation();
  return React.useMemo(() => new URLSearchParams(queryParams), [queryParams]);
}

function Search() {
  let urlQuery = useQuery().get("query") || "";
  const [selectedCoors, setSelectedCoors] = useState({
    lat: 51.5072,
    lng: -0.1876,
  });
  const [zoom, setZoom] = useState(12);
  const [areaCode, setAreaCode] = useState("");

  const {
    data: areaTable,
    error,
    isLoading,
  } = useSWR(base_url + "/api/area-details", fetcher);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div>
      <Navbar isHome={false} />
      <Sidebar
        selectedCoors={selectedCoors}
        setSelectedCoors={setSelectedCoors}
        setZoom={setZoom}
        setAreaCode={setAreaCode}
        areaCode={areaCode}
        urlQuery={urlQuery}
        areaTable={areaTable}
      />
      {areaCode.length != 0 ? (
        <Dashboard areaCode={areaCode} areaTable={areaTable} />
      ) : (
        <></>
      )}
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

export default Search;
