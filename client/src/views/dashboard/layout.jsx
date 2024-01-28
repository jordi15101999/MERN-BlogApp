/* eslint-disable react/prop-types */
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { Outlet } from "react-router-dom";

export default function LayoutDashboard() {
  return (
    <div className="flex flex-col lg:flex-row">
      <Sidebar />
      <main className="flex-1 min-h-screen">
        <Header />
        <div className="px-4 lg:px-8 mt-10">
          <div className="h-full w-full mb-10 text-black bg-white rounded-lg shadow-lg">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
