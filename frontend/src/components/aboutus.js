import React, { useState, useEffect } from "react";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LinkedInPic from "../images/result.png";

function AboutUs() {
  return (
    <div className="w-full h-screen bg-slate-700">
      <h2 className="text-4xl font-bold text-center pb-1.5 m-auto border-4 w-36  rounded-md border-transparent text-gray-300 hover:border-b-violet-400 hover:ease-in duration-150">
        About Us
      </h2>
      <div className="flex flex-row my-auto justify-center items-center mt-20">
        <div className="w-1/3 h-[60vh] bg-slate-800 justify-center items-center">
          <img
            src={LinkedInPic}
            alt=""
            className="object-fit h-full bg-gradient-to-t from-slate-800 to-slate-800 opacity-70"
          />
        </div>
        <div className="w-2/3 h-[60vh] bg-[#01b57994] justify-center items-center"></div>
      </div>
    </div>
  );
}

export default AboutUs;
