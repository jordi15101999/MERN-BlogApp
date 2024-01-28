import { useState } from "react";
import {
  Home,
  PlusCircle,
  Newspaper,
  CircleUserRound,
  Menu,
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/dashboard");

  const handleNavLinkClick = (to) => {
    setActiveLink(to);
    // Close the sidebar after clicking a link on small screens
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="w-60 lg:w-1/8 min-h-full bg-black text-slate-50 flex flex-col overflow-y-auto transition-all duration-300 transform">
      {/* Top Part */}
      <div className="bg-slate-800 flex justify-between items-center h-12 px-4 lg:px-6">
        <span className="text-center font-semibold text-xl lg">Dashboard</span>
        <button className="lg:hidden text-white" onClick={toggleSidebar}>
          <Menu className="w-6 h-6" />
        </button>
      </div>
      <nav
        className={`flex flex-col gap-3 px-4 py-6 lg:py-8 ${
          isSidebarOpen ? "" : "hidden"
        } lg:flex`}
      >
        <NavLink
          to="/dashboard"
          onClick={() => handleNavLinkClick("/dashboard")}
          className={`p-2 flex items-center space-x-2 rounded-lg ${
            activeLink === "/dashboard"
              ? "bg-slate-300 text-black"
              : "hover:bg-slate-300 hover:text-black"
          }`}
          exact
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </NavLink>
        <NavLink
          to="/dashboard/newArticle"
          onClick={() => handleNavLinkClick("/dashboard/newArticle")}
          className={`p-2 flex items-center space-x-2 rounded-lg ${
            activeLink === "/dashboard/newArticle"
              ? "bg-slate-300 text-black"
              : "hover:bg-slate-300 hover:text-black"
          }`}
          exact
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create Article</span>
        </NavLink>
        <NavLink
          to="/dashboard/myArticles"
          onClick={() => handleNavLinkClick("/dashboard/myArticles")}
          className={`p-2 flex items-center space-x-2 rounded-lg ${
            activeLink === "/dashboard/myArticles"
              ? "bg-slate-300 text-black"
              : "hover:bg-slate-300 hover:text-black"
          }`}
          exact
        >
          <Newspaper className="w-4 h-4" />
          <span>My Articles</span>
        </NavLink>
        <NavLink
          to={`/dashboard/profile/${user.email}`}
          onClick={() => handleNavLinkClick(`/dashboard/profile/${user.email}`)}
          className={`p-2 flex items-center space-x-2 rounded-lg ${
            activeLink === `/dashboard/profile/${user.email}`
              ? "bg-slate-300 text-black"
              : "hover:bg-slate-300 hover:text-black"
          }`}
          exact
        >
          <CircleUserRound className="w-4 h-4" />
          <span>My Profile</span>
        </NavLink>
      </nav>
    </div>
  );
}
