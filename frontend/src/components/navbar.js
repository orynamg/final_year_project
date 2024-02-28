// import React, { useState, useEffect } from "react";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Navbar() {
  return (
    <div className="relative">
      <div className="navbar w-full bg-neutral text-neutral-content h-11 fixed top-0 right-0 overflow-visible flex justify-between px-10">
        <button className="btn btn-ghost text-xl font-light">
          <FontAwesomeIcon className="text-sm" icon={icon({ name: "HOUSE" })} />
          Locaite
        </button>
        <button className="btn btn-ghost text-xl font-light">
          <FontAwesomeIcon className="text-sm" icon={icon({ name: "gear" })} />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
