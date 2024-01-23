import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Navbar() {
  return (
    <div>
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content z-[-1]">
          {/* Page content here */}
          <label htmlFor="my-drawer" className="">
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
                    s
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
                    s
                    icon={icon({ name: "search" })}
                  />
                </div>

                <div className="flex">
                  <p className=" p-2.5 text-start justify-center items-center">
                    Give me the area with the least amount of theft or
                    unauthorised. This area should also contain at least 3
                    grocery stores in a half a mile radius, and a tube station.
                  </p>

                  <div className=" mx-2 items-end flex">
                    <FontAwesomeIcon
                      className="text-lg text-slate-400 z-10 bg-slate-900 p-3 rounded-xl btn-paper-plane"
                      s
                      icon={icon({ name: "paper-plane" })}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <div>
                <FontAwesomeIcon
                  className="text-2xl p-4 text-slate-400"
                  s
                  icon={icon({ name: "face-grin-stars" })}
                />
              </div>
              <div className="border border-gray-500 bg-slate-800 rounded-xl p-6 mx-9">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
                minima vero officiis ratione nam, provident ab dignissimos et
                minus necessitatibus! Accusamus voluptatum in neque, eum est,
                sunt, et fugiat ullam ducimus cumque unde voluptas consequatur!
              </div>
            </div>

            <button className="btn btn-active mx-[-1rem] bg-gray-800 border-gray-700  mt-8 h-[4rem] text-slate-300 text-lg  rounded-none hover:bg-gray-700 hover:border-gray-400 tracking-wider font-light">
              E14 Limehouse
            </button>

            <button className="btn btn-active mx-[-1rem] bg-[#111827ac] border-gray-800 h-[4rem] text-slate-300 text-lg  rounded-none hover:bg-gray-700 hover:border-gray-400 tracking-wider font-light">
              E5 Hackney
            </button>

            <button className="btn btn-active mx-[-1rem] bg-gray-900 border-gray-800 h-[4rem] text-slate-300 text-lg  rounded-none hover:bg-gray-700 hover:border-gray-400 tracking-wider font-light">
              E1 Mile End
            </button>

            <button className="btn btn-active mx-[-1rem]  bg-[#030712d3] border-gray-900 h-[4rem] text-slate-300 text-lg  rounded-none hover:bg-gray-700 hover:border-gray-400 tracking-wider font-light">
              EC City of London
            </button>

            <button className="btn btn-active mx-[-1rem]  bg-gray-950 border-gray-900 h-[4rem] text-slate-300 text-lg  rounded-none hover:bg-gray-700 hover:border-gray-400 tracking-wider font-light">
              E2 Bethnal Green
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
