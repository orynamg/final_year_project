// import React, { useState, useEffect } from "react";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Navbar() {
  return (
    <div>
      <div className="navbar bg-neutral text-neutral-content h-11 z-10">
        <button className="btn btn-ghost text-xl font-light">
          <FontAwesomeIcon className="text-sm" icon={icon({ name: "HOUSE" })} />
          Locaite
        </button>
      </div>
    </div>
  );
}

export default Navbar;
