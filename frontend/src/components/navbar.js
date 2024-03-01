// import React, { useState, useEffect } from "react";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Navbar({ isHome }) {
  return (
    <div className="relative bg-neutral">
      <div
        className={`navbar w-full bg-neutral text-neutral-content h-11 fixed top-0 right-0 overflow-visible flex justify-between px-10 ${
          isHome ? "bg-[rgb(43,52,64,0.85)]" : "bg-neutral"
        }`}
      >
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
