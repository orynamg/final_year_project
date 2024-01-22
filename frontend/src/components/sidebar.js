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
                className="text-3xl p-5 color-red-500"
                icon={icon({ name: "list" })}
              />
            </h4>
          </label>
        </div>
        <div className="drawer-side pt-[5rem]">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="menu p-4 w-2/5 min-h-full bg-base-content text-white">
            {/* Sidebar content here */}

            <div>
              <FontAwesomeIcon
                className="text-2xl p-4"
                s
                icon={icon({ name: "robot" })}
              />
            </div>
            <div className="border border-indigo-500 bg-slate-800 rounded-md p-6 mx-9">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
              minima vero officiis ratione nam, provident ab dignissimos et
              minus necessitatibus! Accusamus voluptatum in neque, eum est,
              sunt, et fugiat ullam ducimus cumque unde voluptas consequatur!
            </div>

            <div className=" mt-10 rounded-md  p-9 mx-9 bg-slate-700 text-slate-300">
              <FontAwesomeIcon
                className="pr-2 text-md"
                icon={icon({ name: "search" })}
              />
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
              minima vero officiis ratione nam, provident ab dignissimos et
              minus necessitatibus! Accusamus voluptatum in neque, eum est,
              sunt, et fugiat ullam ducimus cumque unde voluptas consequatur!
              ccusamus voluptatum in neque, eum est, sunt, et fugiat ullam
              ducimus cumque unde voluptas consequatur! ccusamus voluptatum in
              neque, eum est,
            </div>

            <button class="btn btn-active mx-8 bg-indigo-900 border-indigo-700 mt-9 h-[4rem] text-white text-md">
              E14 Limehouse
            </button>

            <button class="btn btn-active mx-8 bg-indigo-900 border-indigo-700 mt-9 h-[4rem] text-white text-md">
              E1 Mile End
            </button>

            <button class="btn btn-active mx-8 bg-indigo-900 border-indigo-700 my-9 h-[4rem] text-white text-md">
              E2 Bethnal Green
            </button>

            <li>{/* <a>Sidebar Item 2</a> */}</li>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
