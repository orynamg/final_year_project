import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import useSWR from "swr";

const base_url = "http://localhost:8000";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

function Sidebar() {
  const colours = [
    "bg-gray-800",
    "!bg-[#111827ac]",
    "bg-gray-900",
    "!bg-[#030712d3]",
    "bg-gray-950",
  ];
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
    console.log(`text: ${query}`);
    const areasForTesting = ["E14", "E5", "E1", "SW1", "N10"];
    const results = areasForTesting.map((area) =>
      areaTable.find((item) => item.code === area)
    );
    setAreas(results);
    // fetch(base_url + "/api/search", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ text: query }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     const results = data.areas.map((area) =>
    //       areaTable.find((item) => item.code === area)
    //     );
    //     setAreas(results);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
  };

  return (
    <div>
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content ">
          <label htmlFor="my-drawer" className="small-label">
            <div className="w-5 h-5">
              <FontAwesomeIcon
                className="text-2xl p-8"
                icon={icon({ name: "list" })}
              />
            </div>
          </label>
        </div>
        <div className="drawer-side pt-[5rem] z-[-1]">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="menu px-4 w-2/5 min-h-full bg-base-content text-white">
            <div>
              <div className=" flex pt-3">
                <div>
                  <FontAwesomeIcon
                    className="text-2xl p-4 text-slate-400 flex-1 justify-center items-center"
                    icon={icon({ name: "face-laugh-beam" })}
                  />
                </div>
                <div className="rounded-lg py-[1rem] text-base italic tracking-wide font-normal">
                  Describe your ideal area!
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
                      className="p-2.5 text-start justify-center items-center bg-transparent w-80  h-20 mx-4 my-4 outline-none mb-1 "
                      placeholder="Give me the area with the most amount of transport links and green spaces!"
                    ></textarea>

                    <button
                      className=" mx-2 items-end flex outline-none border-none"
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

            <div className="mb-3">
              <div>
                <FontAwesomeIcon
                  className="text-2xl p-4 text-slate-400"
                  icon={icon({ name: "face-grin-stars" })}
                />
              </div>
              <div className="border border-gray-500 bg-slate-800 rounded-xl p-6 mx-9 mb-8">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
                minima vero officiis ratione nam, provident ab dignissimos.
              </div>
            </div>

            {areas.map((area, i) => (
              <button
                key={area.code}
                className={`btn btn-active mx-[-1rem] bg-gray-800 border-gray-700 h-[4rem] text-slate-300 text-lg  rounded-none hover:!bg-gray-700 hover:border-gray-400 tracking-wider font-light 
                  ${colours[i % colours.length]}`}
              >
                {area.code} {area.name}
              </button>
            ))}

            {/* <button className="btn btn-active mx-[-1rem] bg-gray-800 border-gray-700  mt-8 h-[4rem] text-slate-300 text-lg  rounded-none hover:bg-gray-700 hover:border-gray-400 tracking-wider font-light">
              E14 Limehouse
            </button> */}
            {/* 
            <button className="btn btn-active mx-[-1rem] bg-[#111827ac] border-gray-800 h-[4rem] text-slate-300 text-lg  rounded-none hover:bg-gray-700 hover:border-gray-400 tracking-wider font-light">
              E5 Hackney
            </button> */}

            {/* <button className="btn btn-active mx-[-1rem] bg-gray-900 border-gray-800 h-[4rem] text-slate-300 text-lg  rounded-none hover:bg-gray-700 hover:border-gray-400 tracking-wider font-light">
              E1 Mile End
            </button>

            <button className="btn btn-active mx-[-1rem]  bg-[#030712d3] border-gray-900 h-[4rem] text-slate-300 text-lg  rounded-none hover:bg-gray-700 hover:border-gray-400 tracking-wider font-light">
              EC City of London
            </button>

            <button className="btn btn-active mx-[-1rem]  bg-gray-950 border-gray-900 h-[4rem] text-slate-300 text-lg  rounded-none hover:bg-gray-700 hover:border-gray-400 tracking-wider font-light">
              E2 Bethnal Green
            </button>  */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
