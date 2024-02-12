import React, { useState, useEffect } from "react";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Dashboard() {
  return (
    <div className="z-[100] w-3/5 p-5 text-white absolute bottom-0 right-0">
      <div className="bg-slate-900 p-5 h-44 opacity-90 rounded-xl shadow">
        <h1 className="text-xl font-bold tracking-wider mb-2 ml-5 text-slate-500">
          DASHBOARD
        </h1>
        <div className="grid grid-cols-2 grid-flow-row gap-2 mx-5 font-normal tracking-wider text-sm text-white">
          <div>Annual Crime Incidents:</div>
          <div>Most Common Crimes:</div>
          <div>Air Quality Index:</div>
          <div>Road Noise Level:</div>
          <div>Average House Price:</div>
          <div>Number of Transport Links:</div>
          <div>Average Ofsted School Rating:</div>
          <div>Local Amenities:</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
