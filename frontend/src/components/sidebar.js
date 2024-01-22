import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Navbar() {
  return (
    <div>
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label htmlFor="my-drawer" className="">
            <h4>
              <FontAwesomeIcon
                className="text-2xl px-7 py-12 "
                icon={icon({ name: "list" })}
              />
            </h4>
          </label>
        </div>
        <div className="drawer-side pt-[5rem]  z-[-1]">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="menu px-4 w-2/5 min-h-full bg-base-content text-white">
            <div>
              <div>
                <div className="">
                  <FontAwesomeIcon
                    className="text-xl p-4 mt-3 text-slate-400 z-10"
                    s
                    icon={icon({ name: "search" })}
                  />
                </div>
              </div>
              <div className=" mb-4 rounded-md  p-9 mx-9 bg-slate-700 text-slate-300">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
                minima vero officiis ratione nam, provident ab dignissimos et
                minus necessitatibus! Accusamus voluptatum in neque, eum est,
                sunt, et fugiat ullam ducimus cumque unde voluptas consequatur!
                ccusamus voluptatum in neque, eum est, sunt, et fugiat ullam
                ducimus cumque unde voluptas consequatur! ccusamus voluptatum in
                neque, eum est,
              </div>
            </div>

            <div>
              <div>
                <FontAwesomeIcon
                  className="text-2xl p-4 text-slate-400"
                  s
                  icon={icon({ name: "robot" })}
                />
              </div>
              <div className="border border-gray-500 bg-slate-800 rounded-md p-6 mx-9">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
                minima vero officiis ratione nam, provident ab dignissimos et
                minus necessitatibus! Accusamus voluptatum in neque, eum est,
                sunt, et fugiat ullam ducimus cumque unde voluptas consequatur!
              </div>
            </div>

            {/* <button className="custom-btn btn btn-active mx-8 bg-gray-950 border-gray-500 mt-9 h-[4rem] text-slate-300  text-lg rounded-xl hover:bg-gray-800 hover:border-gray-400">
              E14 Limehouse
            </button>

            <button className="btn btn-active mx-8 bg-gray-950 border-gray-600 mt-4 h-[4rem] text-slate-300 text-lg rounded-xl hover:bg-gray-800 hover:border-gray-400">
              E1 Mile End
            </button> */}

            <button className="btn btn-active mx-[-1rem] bg-gray-800 border-gray-700  mt-8 h-[4rem] text-slate-300 text-lg  rounded-none hover:bg-gray-700 hover:border-gray-400">
              E14 Limehouse
            </button>

            <button className="btn btn-active mx-[-1rem] bg-[#111827ac] border-gray-800 h-[4rem] text-slate-300 text-lg  rounded-none hover:bg-gray-700 hover:border-gray-400">
              E5 Hackney
            </button>

            <button className="btn btn-active mx-[-1rem] bg-gray-900 border-gray-800 h-[4rem] text-slate-300 text-lg  rounded-none hover:bg-gray-700 hover:border-gray-400">
              E1 Mile End
            </button>

            <button className="btn btn-active mx-[-1rem]  bg-[#030712d3] border-gray-900 h-[4rem] text-slate-300 text-lg  rounded-none hover:bg-gray-700 hover:border-gray-400">
              EC City of London
            </button>

            <button className="btn btn-active mx-[-1rem]  bg-gray-950 border-gray-900 h-[4rem] text-slate-300 text-lg  rounded-none hover:bg-gray-700 hover:border-gray-400">
              E2 Bethnal Green
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
