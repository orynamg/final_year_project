import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";

function Stats() {
  return (
    <div>
      <div className="stats absolute right-20 bottom-40 bg-transparent">
        <div className="stat">
          <div className="stat-figure text-[#181818]">
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
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
          </div>
          <div className="stat-title text-slate-400">Total Likes</div>
          <div className="stat-value text-[#181818]">25.6K</div>
          <div className="stat-desc text-slate-400">
            21% more than last month
          </div>
        </div>

        <div className="stat">
          <div className="stat-figure text-blue-400">
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
          <div className="stat-value text-blue-400">2.6M</div>
          <div className="stat-desc text-slate-400">
            21% more than last month
          </div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <div className="avatar online">
              <div className="w-16 rounded-full">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
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
          <div className="stat-desc text-blue-400 italic">Zoopla</div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
