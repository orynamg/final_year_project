import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import ZooplaImg from "../images/zlogo.jpeg";

function Stats() {
  return (
    <div>
      <div className="stats absolute right-20 bottom-40 bg-transparent">
        <div className="stat">
          <div className="stat-figure text-[#181818]"></div>
          <div className="stat-title text-slate-400">User Accepted Offers</div>
          <div className="stat-value text-[#181818]">
            12.5%{" "}
            <FontAwesomeIcon
              icon={faArrowUp}
              className="text-[2rem] mb-0.5 ml-20 mr-[-1rem]"
            />
          </div>
          <div className="stat-desc text-slate-400">
            21% more than last month
          </div>
        </div>

        <div className="stat">
          <div className="stat-figure text-violet-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
          </div>
          <div className="stat-title text-slate-400">Page Views</div>
          <div className="stat-value text-violet-400">20K</div>
          <div className="stat-desc text-slate-400">
            21% more than last month
          </div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <div className="avatar">
              <div className="w-16 rounded-full">
                <img src={ZooplaImg} />
              </div>
            </div>
          </div>
          <div className="stat-value text-neutral-200">
            5
            <FontAwesomeIcon
              className="text-[1.8rem] mb-[0.2rem] ml-1 font-light"
              icon={faStar}
            />
          </div>
          <div className="stat-title text-neutral-200">Reviews</div>
          <div className="stat-desc text-violet-400 italic">Zoopla</div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
