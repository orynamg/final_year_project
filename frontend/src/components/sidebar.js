import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState, useLayoutEffect } from "react";

function Sidebar({
  selectedCoors,
  setSelectedCoors,
  setZoom,
  setAreaCode,
  areaCode,
  urlQuery,
  areaTable,
}) {
  /**
   * This component renders the sidebar with the search bar and the results. It handles the frontend logic for the search functionality.
   */
  const colours = [
    "bg-[#1F2936]",
    "bg-[#111827ac]",
    "bg-gray-900",
    "bg-[#030712d3]",
    "bg-gray-950",
  ];
  const [isSpinning, setIsSpinning] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [warningMessage, setWarningMessage] = useState("");
  const [botPanel, setBotPanel] = useState(false);
  const [query, setQuery] = useState(urlQuery);
  const [areas, setAreas] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(urlQuery ? true : false);
  const handleDrawerOpen = () => setDrawerOpen(!drawerOpen);
  const base_url = "http://localhost:8000";

  useLayoutEffect(() => {
    if (urlQuery) {
      postQuery({ preventDefault: () => {} });
    }
  }, []);

  const postQuery = (event) => {
    event.preventDefault();
    setIsSpinning(true);
    setErrorMessage("");
    setWarningMessage("");
    setBotPanel(true);
    setAreas([]);
    // console.log(`text: ${query}`);
    // const areasForTesting = ["E14", "E5", "E1", "SE1", "N10"];
    // const results = areasForTesting.map((area) =>
    //   areaTable.find((item) => item.code === area)
    // );
    // setAreas(results);
    fetch(base_url + "/api/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: query }),
    })
      .then((response) =>
        response.status === 200
          ? response
          : Promise.reject({ message: response.statusText })
      )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const results = data.areas.map((areaCode) => {
          let area = areaTable.find((item) => item.code === areaCode);
          console.log(areaCode, area);
          return area;
        });
        if (results.length === 0) {
          setWarningMessage("No results found");
        }
        setAreas(results);
        setIsSpinning(false);
        setAreaCode("");
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsSpinning(false);
        setErrorMessage(
          "Oops... :/ Seems like our bot is having troubles with your request. Try amending your query!"
        );
      });
  };

  return (
    <div>
      <div className="drawer">
        <input
          id="my-drawer"
          data-testid="my-drawer"
          type="checkbox"
          className="drawer-toggle"
          onClick={handleDrawerOpen}
          checked={drawerOpen}
        />
        <div className="drawer-content z-10">
          <label htmlFor="my-drawer" className="small-label flex">
            <div className="w-5 h-5 z-100">
              <FontAwesomeIcon
                className="text-md absolute right-0 top-0 mt-8 mx-24 text-slate-300 z-[20] text-light"
                icon={icon({ name: "bars" })}
              />
            </div>
          </label>
        </div>

        <div className="drawer-side pt-[5rem] z-[-1] min-w-[65rem]">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="menu px-4 w-2/5 min-h-full bg-[#1F2936] text-white">
            <div className=" mx-4">
              <div className=" flex pt-3">
                <div>
                  <FontAwesomeIcon
                    className="text-2xl p-4 text-slate-400 flex-1 justify-center items-center"
                    icon={icon({ name: "face-laugh-beam" })}
                  />
                </div>
                <div className="rounded-lg py-[1rem] text-base italic tracking-wide font-normal ">
                  <p className="">Describe your ideal area!</p>
                </div>
              </div>

              <div className=" mb-4 rounded-xl px-3 py-5 mx-9 bg-slate-700 text-slate-300 flex mt-1 gap-3 justify-center items-center text-justify border border-slate-800">
                <div className="w-12">
                  <FontAwesomeIcon
                    className="text-xl ml-2  text-slate-400 z-10 bg-slate-600 p-3 rounded-full nice-turn"
                    icon={icon({ name: "search" })}
                  />
                </div>

                <div>
                  <form action="" className="flex" onSubmit={postQuery}>
                    <textarea
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className=" p-2.5 text-start justify-center items-center  bg-transparent  laptop:w-80   tablet:w-60 phone:w-22  h-20 laptop:mx-4 phone:mx-0 my-4 outline-none mb-1 flex-wrap"
                      placeholder="Give me the area with the most amount of transport links and green spaces!"
                    ></textarea>

                    <button
                      className=" mx-2 items-end justify-between flex outline-none border-none"
                      type="submit"
                      data-testid="submit-button"
                    >
                      <FontAwesomeIcon
                        className="text-lg text-slate-400 z-10 bg-slate-900 p-3 rounded-xl btn-paper-plane"
                        icon={icon({ name: "paper-plane" })}
                      />
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {botPanel ? (
              <div className="mb-5 mx-4">
                <div>
                  <FontAwesomeIcon
                    className="text-2xl p-4 text-slate-400"
                    icon={icon({ name: "face-grin-stars" })}
                  />
                </div>
                <div className="border border-gray-500 bg-slate-800 rounded-xl p-6 mx-9 mb-8 flex-wrap">
                  <p className="flex-wrap typewriter monospace caret lorem">
                    After searching through datasets from the MetPolice, TfL,
                    Gov.uk, Kaggle, Google Maps and more, I have found the
                    following areas that match your criteria:
                  </p>
                </div>
              </div>
            ) : (
              <></>
            )}

            {isSpinning ? (
              <span className="loading loading-bars loading-lg mx-auto mb-10"></span>
            ) : (
              <p className="pt-4"></p>
            )}

            {/* if errorMessage is True, then display div*/}
            {errorMessage && (
              <div role="alert" className="alert alert-error w-[95%] mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{errorMessage}</span>
              </div>
            )}

            {warningMessage && (
              <div role="alert" class="alert alert-warning  w-[95%] mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span>{warningMessage}</span>
              </div>
            )}

            {areas.map((area, i) => (
              <div
                class="collapse !rounded-none"
                value={selectedCoors}
                onClick={() => {
                  setSelectedCoors({
                    lat: area.centre_lat,
                    lng: area.centre_long,
                  });
                  setZoom(13);
                  setAreaCode(area.code);
                }}
                key={area.code}
              >
                <input
                  checked={area.code === areaCode}
                  type="checkbox"
                  class="peer"
                  className="w-full h-full hover:bg-gray-700 hover:border-gray-400 "
                ></input>
                <div
                  className={` hovering hover:bg-gray-700 hover:border-gray-400 collapse-title border-2 border-t-gray-700 border-b-transparent border-r-transparent h-[4rem] border-l-transparent tracking-wider font-light peer-checked:text-secondary-content text-center text-lg shadow-transparent ${
                    colours[i % colours.length]
                  }`}
                >
                  {area.code} {area.name}
                </div>
                <div
                  className={`collapse-content border-none border-t-transparent border-b-transparent border-l-gray-700 border-r-gray-700 ${
                    colours[i % colours.length]
                  }`}
                >
                  <a
                    className="flex btn text-center font-light tracking-wider justify-center w-11/12 m-auto bg-[#3533b5b3] text-white border-none hover:bg-[#322fe1]  btn-paper-plane z-100"
                    target="_blank"
                    href={`https://www.zoopla.co.uk/for-sale/property/london/${areaCode}/`}
                  >
                    View On Zoopla!
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
