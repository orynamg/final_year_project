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
                className="text-2xl py-12 px-12"
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
          <div className="menu p-4 w-2/5 min-h-full bg-base-content text-white">
            <div>
              <div>
                <div className="">
                  <FontAwesomeIcon
                    className="text-xl p-4 text-slate-400 z-10"
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
              <div className="border border-blue-500 bg-slate-800 rounded-md p-6 mx-9">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
                minima vero officiis ratione nam, provident ab dignissimos et
                minus necessitatibus! Accusamus voluptatum in neque, eum est,
                sunt, et fugiat ullam ducimus cumque unde voluptas consequatur!
              </div>
            </div>

            <button className="custom-btn btn btn-active mx-8 bg-blue-950 border-blue-500 mt-9 h-[4rem] text-slate-300  text-lg rounded-xl hover:bg-blue-800 hover:border-blue-400">
              E14 Limehouse
            </button>

            <button className="btn btn-active mx-8 bg-blue-950 border-blue-600 mt-4 h-[4rem] text-slate-300 text-lg rounded-xl hover:bg-blue-800 hover:border-blue-400">
              E1 Mile End
            </button>

            <button className="btn btn-active mx-8 bg-blue-950 border-blue-700 my-4 h-[4rem] text-slate-300 text-lg rounded-xl hover:bg-blue-800 hover:border-blue-400">
              E2 Bethnal Blue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
