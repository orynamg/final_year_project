import Navbar from "../components/navbar";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import showcaseImage from "../images/showcase3.jpeg";
import Footer from "../components/footer";
import Stats from "../components/stats";

function Home() {
  return (
    <div>
      <div className="bg-slate-700 h-screen w-screen flex">
        <Navbar isHome={true} className="z-10" />
        <div className="w-7/12 px-4 h-18 z-10 flex items-center justify-between relative m-auto border-2 border-slate-700 bg-[#e5e5e5] p-1 rounded-full">
          <input
            type="text"
            className="pl-4 h-14 bg-transparent text-xl text-start outline-none"
            placeholder="Describe your ideal area!"
          ></input>
          <a className="outline-none border-none flex" href="/search">
            <FontAwesomeIcon
              className="text-lg text-slate-400 items-center z-10 bg-slate-800 p-3  rounded-full btn-paper-plane"
              icon={icon({ name: "house" })}
            />
          </a>
        </div>

        <div className="w-full h-1/2 absolute bg-gradient-to-t from-slate-800 to-slate-400 opacity-70">
          <img
            src={showcaseImage}
            alt=""
            className="w-full h-full absolute object-cover object-fit mix-blend-overlay"
          />
        </div>
        <Stats />
      </div>

      <Footer />
    </div>
  );
}

export default Home;
