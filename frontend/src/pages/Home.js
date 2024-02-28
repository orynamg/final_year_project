import Navbar from "../components/navbar";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Home() {
  return (
    <div className="bg-slate-700 h-screen w-screen flex">
      <Navbar isHome={true} />

      <div className="w-2/5 px-4 h-18 flex items-center justify-between relative m-auto border-none bg-[#e5e5e5] p-1 rounded-full">
        <input
          type="text"
          className="pl-4 h-14 bg-transparent text-xl text-start outline-none"
          placeholder="Describe your ideal area!"
        ></input>
        <a className="outline-none border-none flex" href="/search">
          <FontAwesomeIcon
            className="text-lg text-slate-400 items-center z-10 bg-slate-800 p-3  rounded-full btn-paper-plane"
            icon={icon({ name: "paper-plane" })}
          />
        </a>
      </div>
    </div>
  );
}

export default Home;
