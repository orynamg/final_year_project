import React, { useState, useEffect } from "react";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Dashboard({ areaCode, areaTable }) {
  const [selectedArea, setSelectedArea] = useState(
    areaTable.find((item) => item.code === areaCode)
  );

  useEffect(() => {
    setSelectedArea(areaTable.find((item) => item.code === areaCode));
  }, [areaCode, areaTable, selectedArea]);

  return (
    <div className="z-[100] tablet:w-3/5 sm:w-2/5 p-5 text-white absolute bottom-0 right-0">
      <div className="bg-slate-900 p-4 opacity-90 rounded-xl shadow sm:h-[20rem] tablet:h-[12rem]">
        <h1 className="text-xl font-bold tracking-wider mb-2.5 ml-5 text-slate-500 ">
          {areaCode} {selectedArea.name}
        </h1>
        <div className="grid tablet:grid-cols-3 sm:grid-col-1 grid-flow-row gap-3  mx-5 font-normal tracking-wider text-sm text-white text-left">
          <div>
            <span className="font-bold  text-slate-300 ">
              Monthly Crime Incidents:{" "}
            </span>
            {selectedArea.crime_count || "Not Available"}
          </div>
          <div>
            <span className="font-bold text-slate-300 ">
              Most Common Crimes:{" "}
            </span>
          </div>
          <div>
            <span className="font-bold text-slate-300 ">
              Total Green Area:{" "}
            </span>
            {selectedArea.green_area_total || "Not Available"} sqft
          </div>
          <div>
            <span className="font-bold text-slate-300 ">
              Total Waterfront Area:{" "}
            </span>
            {selectedArea.blue_area_total || "Not Available"} sqft
          </div>
          <div>
            <span className="font-bold text-slate-300 ">
              Average House Price:{" "}
            </span>
            {selectedArea.price_avg || "Not Available"}
          </div>
          <div>
            <span className="font-bold text-slate-300 ">
              Number of Schools:{" "}
            </span>
            {selectedArea.schools_count || "Not Available"}
          </div>
          <div>
            <span className="font-bold text-slate-300 ">
              Number of Vehicle Charging Points:{" "}
            </span>
            {selectedArea.vehicle_charging_count || "Not Available"}
          </div>
          <div>
            <span className="font-bold text-slate-300 ">
              Total Grocery Stores:{" "}
            </span>
            {selectedArea.grocery_count || "Not Available"}
          </div>
          <div>
            <span className="font-bold text-slate-300 ">
              Most Common Grocery Store:
            </span>
          </div>
          <div className="col-span-3">
            <span className="font-bold text-slate-300 ">Stations: </span>
            {selectedArea.stations || "Not Available"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
