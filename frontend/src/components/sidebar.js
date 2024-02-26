import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import useSWR from "swr";

const base_url = "http://localhost:8000";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

function Sidebar({ selectedCoors, setSelectedCoors, setZoom, setAreaCode }) {
  const colours = [
    "bg-[#1F2936]",
    "bg-[#111827ac]",
    "bg-gray-900",
    "bg-[#030712d3]",
    "bg-gray-950",
  ];
  const [isSpinning, setIsSpinning] = useState(false);
  const [query, setQuery] = useState("");
  const [areas, setAreas] = useState([]);
  const {
    data: areaTable,
    error,
    isLoading,
  } = useSWR(base_url + "/api/areas", fetcher);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  const postQuery = (event) => {
    event.preventDefault();
    setIsSpinning(true);
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
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const results = data.areas.map((area) =>
          areaTable.find((item) => item.code === area)
        );
        setAreas(results);
        setIsSpinning(false);
        setAreaCode("");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content z-10">
          <label htmlFor="my-drawer" className="small-label flex">
            <div className="w-5 h-5 z-100">
              <FontAwesomeIcon
                className="text-md absolute right-0 top-0 mt-8 mx-24 text-slate-300 z-50 text-light"
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

            <div className="mb-5 mx-4">
              <div>
                <FontAwesomeIcon
                  className="text-2xl p-4 text-slate-400"
                  icon={icon({ name: "face-grin-stars" })}
                />
              </div>
              <div className="border border-gray-500 bg-slate-800 rounded-xl p-6 mx-9 mb-8 flex-wrap">
                <p className="flex-wrap">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos,
                  provident.
                </p>
              </div>
            </div>

            {isSpinning ? <p>Loading...</p> : <p className="pt-4"></p>}

            {areas.map((area, i) => (
              // <button
              //   value={selectedCoors}
              //   onClick={() => {
              //     setSelectedCoors({
              //       lat: area.centre_lat,
              //       lng: area.centre_long,
              //     });
              //     setZoom(13);
              //     setAreaCode(area.code);
              //   }}
              //   key={area.code}
              //   className={`btn btn-active mx-[-1rem] bg-gray-800 border-gray-700 h-[4rem] text-slate-300 text-lg  rounded-none hover:!bg-gray-700 hover:border-gray-400 tracking-wider font-light
              //     ${colours[i % colours.length]}`}
              // >
              //   {area.code} {area.name}
              // </button>

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
                <input type="checkbox" class="peer" />
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
                  <p className="flex btn text-center font-light tracking-wider justify-center w-11/12 m-auto bg-[#3533b5b3] text-white border-none hover:bg-[#322fe1]  btn-paper-plane ">
                    View Area On Zoopla!
                  </p>
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
