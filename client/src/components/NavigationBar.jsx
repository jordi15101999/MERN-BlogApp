import { Link } from "react-router-dom";

export default function NavigationBar() {
  const token = localStorage.getItem("token");
  return (
    <div className="px-4 lg:px-28 py-4 flex justify-between items-center font-semibold ">
      <div className="flex text-sm gap-2 lg:gap-8 lg:text-md md:gap-4 md:text-md">
        <img src="/logo.jpg" alt="" className="w-12 h-12 rounded-full" />
        <ul className="flex items-center gap-8">
          <Link to="/">
            <li>Home</li>
          </Link>
        </ul>
      </div>
      <div className="">
        <ul className="flex items-center gap-4 text-sm lg:gap-8 lg:text-md md:text-md md:gap-6 font-semibold">
          {!token ? (
            <>
              <Link to="/login">
                <li>Login</li>
              </Link>
              <Link to="/register">
                <li className="bg-black text-white py-1 px-2 lg:py-2 lg:px-3 rounded-md shadow-lg">
                  Register
                </li>
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard">
                <li className="bg-black text-white py-1 px-2 lg:py-2 lg:px-3 rounded-md shadow-lg">
                  My Dashboard
                </li>
              </Link>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
