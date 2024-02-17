import { useNavigate } from "react-router-dom";
import { cinema } from "../assets";
const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-[7vh] p-2 bg-[#1D0638] flex justify-between items-center">
        <img src={cinema} className='w-[40px] h-[40px] p-1' />
      <h3 className="font-mono font-semibold text-xl text-white xs:hidden md:block">Watch Videos for Free</h3>
      <div className="flex justify-center gap-2 my-2">
        <button
          className="px-4 py-2 font-mono text-white font-semibold"
          onClick={() => navigate("/")}
        >
          All Videos
        </button>
        <button
          className="px-4 py-2 font-mono text-white font-semibold"
          onClick={() => navigate("/playlist")}
        >
          All Playlists
        </button>
      </div>
    </div>
  );
};

export default NavBar;
