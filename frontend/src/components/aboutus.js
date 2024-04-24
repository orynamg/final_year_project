import React, { useState, useEffect } from "react";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LinkedInPic from "../images/linkedinpic2.png";

function AboutUs() {
  /**
   * This component renders the about us page.
   */
  return (
    <div id="about" className="w-full h-screen bg-slate-700 scroll-smooth]">
      <h2 className="text-4xl font-bold text-center pb-1.5 m-auto border-4 w-36  rounded-md border-transparent text-gray-300 hover:border-b-violet-400 hover:ease-in duration-150">
        About Us
      </h2>
      <div className="flex flex-row my-auto justify-center items-center mt-20">
        <div className="w-1/3 h-[60vh] bg-[#181818] justify-center items-center">
          <img
            src={LinkedInPic}
            alt=""
            className="object-fit h-full opacity-[75%] min-h-full min-w-[28.5rem]"
          />
        </div>
        <div className="w-2/3 h-[60vh] bg-slate-800 justify-center items-center text-white py-20 px-20 text-xs font-light text-justify tracking-wider ">
          <h1 className="text-lg font-bold mt-[-1.5rem]">Hello Stranger!</h1>
          <p>&nbsp;</p>
          <p>
            I’m Oryna, the founder of EstateMate. With innovation and a
            technical acumen, I have engineered a solution that will find your
            new dream home. EstateMate combines the power of AI to listen to
            your needs, intelligently suggesting areas and properties that fit
            your criteria. Backed by a database of areal information to support
            our recommendations, the application utilises an advances Large
            Language Model (LLM) to reason with you on your ideal neighbourhood.
          </p>
          <p>&nbsp;</p>
          <p>
            Instead of sifting through endless listings or spending hours
            browsing articles, EstateMate will save you time in your search.
            Unlike relying on ChatGPT online, where responses may lack sources
            or reliability, our integrated LLM has access to real-time data,
            that you can view and verify yourself.
          </p>
          <p>&nbsp;</p>
          <p>
            The application can interpret your natural-language query to craft
            SQL statements that are executed against the database. This way, the
            application can navigate the database without relying on
            conventional filters, allowing you to express yourself freely.
          </p>
          <p>&nbsp;</p>
          <p>
            Regarding the data itself, it is sources, cited and dated right
            here! All your datasets are taken from reliable sources such as
            Gov.uk, TFL, Metropolitan police, Kaggle, Google Maps and the London
            Datastore. The application can explore queries relating to
            transport, crime, schools, supermarkets, property specification,
            price, greenery and riverfront locations.
          </p>
          <p>&nbsp;</p>
          <p>
            After finding your idea area, you are connected to a vendor
            platform, Zoopla, where you can resolve your purchase! Join us in
            redefining the future of discovering real estate, with one search at
            a time.
          </p>
          <p>&nbsp;</p>
          <p>Welcome home,</p>
          <p>&nbsp;</p>
          <p className="italic">EstateMate</p>
          <p>&nbsp;</p>
        </div>
      </div>
      <div className="bg-[#0f9b6ccf] w-full h-[7rem] flex flex-row justify-evenly items-center text-white text-sm text-center px-10 gap-2">
        <a
          href="https://data.police.uk/docs/method/crime-street/."
          className="btn w-44 rounded-full bg-[#01B57A] text-white border-none hover:bg-[#01B57A] hover:opacity-80 text-xs"
        >
          Street-level crimes - data.police.uk (2023) 
        </a>
        <a
          href="https://geolytix.com/blog/supermarket-retail-points/."
          className="btn w-44 rounded-full bg-[#01B57A] text-white border-none hover:bg-[#01B57A] hover:opacity-80 text-xs"
        >
          Supermarket Retail Points - Geolytix (2023)
        </a>
        <a
          href="https://data.london.gov.uk/dataset/green-and-blue-cover."
          className="btn w-44 rounded-full bg-[#01B57A] text-white border-none hover:bg-[#01B57A] hover:opacity-80 text-xs"
        >
          Green and Blue Cover - {"  "}London Datastore (2018)
        </a>
        <a
          href="https://data.london.gov.uk/dataset/electric_vehicle_charging_site"
          className="btn w-44 rounded-full bg-[#01B57A] text-white border-none hover:bg-[#01B57A] hover:opacity-80 text-xs"
        >
          Electric Vehicle Charging- London Datastore (2019)
        </a>
        <a
          href="https://www.kaggle.com/datasets/arnavkulkarni/housing-prices-in-london/data"
          className="btn w-44 rounded-full bg-[#01B57A] text-white border-none hover:bg-[#01B57A] hover:opacity-80 text-xs"
        >
          Housing Prices in London - Kaggle (2020) 
        </a>
        <a
          href="https://data.london.gov.uk/dataset/london-schools-atlas."
          className="btn w-44 rounded-full bg-[#01B57A] text-white border-none hover:bg-[#01B57A] hover:opacity-80 text-xs"
        >
          London Schools Atlas – London Datastore (2016)
        </a>
        <a
          href="https://tfl.gov.uk/info-for/open-data-users/our-open-data"
          className="btn w-44 rounded-full bg-[#01B57A] text-white border-none hover:bg-[#01B57A] hover:opacity-80 text-xs"
        >
          Our open data - Transport for London (2023) 
        </a>
      </div>
      <div className="bg-slate-700 w-full h-[6.5rem] "></div>
    </div>
  );
}

export default AboutUs;

// bg-gradient-to-t from-slate-800 to-slate-800
