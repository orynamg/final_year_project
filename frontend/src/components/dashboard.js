import React, { useState, useEffect } from "react";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandcuffs,
  faWater,
  faChargingStation,
  faCartShopping,
  faBasketShopping,
  faSchool,
  faTree,
  faSterlingSign,
  faTrain,
} from "@fortawesome/free-solid-svg-icons";

function Dashboard({ areaCode, areaTable }) {
  const [selectedArea, setSelectedArea] = useState(
    areaTable.find((item) => item.code === areaCode)
  );

  useEffect(() => {
    setSelectedArea(areaTable.find((item) => item.code === areaCode));
  }, [areaCode, areaTable, selectedArea]);

  return (
    <div className="z-[100] tablet:w-3/5 sm:w-2/5 p-3 text-white absolute bottom-0 right-0">
      <div className="bg-slate-900 p-4 opacity-90 rounded-xl shadow sm:h-[20rem] tablet:h-[13.5rem]">
        <h1 className="text-xl font-bold tracking-wider mb-2.5 ml-0 text-slate-400 text-center">
          {areaCode} {selectedArea.name}
        </h1>
        <div className="grid tablet:grid-cols-3 sm:grid-col-1 grid-flow-row gap-2.5  mx-5 font-normal tracking-wider text-[0.8rem] text-white text-right">
          <div>
            <span className="font-bold  text-slate-300">
              Crimes per month:{" "}
            </span>
            <span className="bg-[#322fe1] w-[7rem] text-center inline-block p-1 rounded-full">
              <FontAwesomeIcon icon={faHandcuffs} />{" "}
              {selectedArea.crime_count || "N/A"}
            </span>
          </div>
          <div>
            <span className="font-bold text-slate-300 ">Common Crime:</span>{" "}
            <span className="bg-[#322fe1] w-[7rem] text-center inline-block p-1 rounded-full text-[0.6rem]">
              {selectedArea.crime_category || "N/A"}
            </span>
          </div>
          <div>
            <span className="font-bold text-slate-300 ">
              Total Green Area:{" "}
            </span>
            <span className="bg-[#322fe1] w-[7rem] text-center inline-block p-1 rounded-full ">
              <FontAwesomeIcon icon={faTree} />{" "}
              {Math.round(selectedArea.green_area_total || "N/A")} sqft
            </span>
          </div>
          <div>
            <span className="font-bold text-slate-300 ">Waterfront Area:</span>{" "}
            <span className="bg-blue-700 w-[7rem] text-center inline-block p-1 rounded-full">
              <FontAwesomeIcon icon={faWater} />{" "}
              {Math.round(selectedArea.blue_area_total || "N/A")} sqft
            </span>
          </div>
          <div>
            <span className="font-bold text-slate-300 ">
              Average House Price:{" "}
            </span>
            <span className="bg-blue-700 w-[7rem] text-center inline-block p-1 rounded-full ">
              <FontAwesomeIcon icon={faSterlingSign} />{" "}
              {Math.round(selectedArea.price_avg || "N/A").toLocaleString()}
            </span>
          </div>
          <div>
            <span className="font-bold text-slate-300 ">
              Number of Schools:{" "}
            </span>
            <span className="bg-blue-700 w-[7rem] text-center inline-block p-1 rounded-full ">
              <FontAwesomeIcon icon={faSchool} />{" "}
              {selectedArea.school_count || "N/A"}
            </span>
          </div>
          <div>
            <span className="font-bold text-slate-300 ">Vehicle Charging:</span>{" "}
            <span className="bg-blue-600 w-[7rem] text-center inline-block p-1 rounded-full ">
              <FontAwesomeIcon icon={faChargingStation} />{" "}
              {selectedArea.vehicle_charging_count || "0"}
            </span>
          </div>
          <div>
            <span className="font-bold text-slate-300 ">
              Total Grocery Stores:{" "}
            </span>
            <span className="bg-blue-600 w-[7rem] text-center inline-block p-1 rounded-full ">
              <FontAwesomeIcon icon={faBasketShopping} />{" "}
              {selectedArea.grocery_count || "N/A"}
            </span>
          </div>
          <div>
            <span className="font-bold text-slate-300 ">
              Popular Grocery Store:{" "}
            </span>
            <span className="bg-blue-600 w-[7rem] text-center inline-block p-1 rounded-full ">
              <FontAwesomeIcon icon={faCartShopping} />{" "}
              {selectedArea.retailer || "N/A"}
            </span>
          </div>
          <div className="col-span-3 text-center text-sm my-auto mt-1 flex m-auto items-center justify-center">
            <FontAwesomeIcon
              icon={faTrain}
              className="py-2 px-2.5 rounded-full bg-blue-400 mr-2 text-slate-950"
            />{" "}
            <span className="font-bold text-slate-300 ">Stations: </span>
            <span className="ml-1 italic">
              {selectedArea.stations || "N/A"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
