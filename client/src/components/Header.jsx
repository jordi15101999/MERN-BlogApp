import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouseChimney,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { API_URL } from "../services/api";
export default function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const avatarUrl = API_URL + `uploads/avatar/${user.avatar}`;
  const navigate = useNavigate();
  // Logout function

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
    // window.location.reload();
  };

  return (
    <div className="bg-white h-12 flex items-center justify-between px-4 lg:px-8 border-b border-slate-200">
      <div className="flex justify-center items-center gap-2">
        <Link to={"/"}>
          <FontAwesomeIcon
            icon={faHouseChimney}
            className="text-md lg:text-lg"
          />
        </Link>
        <FontAwesomeIcon
          icon={faChevronRight}
          className="text-sm text-gray-600"
        />
        <h1 className="text-sm font-semibold lg:font-semibold lg:text-md">
          Blog App with MERN Stack
        </h1>
      </div>
      <div className="flex items-center gap-2 lg:gap-3">
        {/*  */}
        <div className="flex gap-3">
          <div className="hidden lg:flex lg:items-center">
            <span>{user && user.fullName}</span>
          </div>
          <div>
            <img
              src={avatarUrl}
              alt="user image"
              className="rounded-full border border-slate-900 w-8 h-8 object-cover"
            />
          </div>
        </div>
        <div className="flex pl-2 border-l border-gray-300 space-x-2">
          <button
            onClick={handleLogout}
            className="px-2 py-1 hover:bg-slate-200 rounded-lg"
          >
            Logout
          </button>
        </div>
        {/*  */}
      </div>
    </div>
  );
}
