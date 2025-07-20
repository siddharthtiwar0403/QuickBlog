import React from "react";
import { assets } from "../../assets/assets";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import { useAppContext } from "../../context/AppContext";

const Layout = () => {
  const { axios, setToken, navigate } = useAppContext();

  const logout = () => {
    localStorage.removeItem("token");
    axios.defaults.headers.common["Authorization"] = null;
    setToken(null);
    navigate("/");
  };
  return (
    <div className="">
      <div className="flex items-center justify-between py-2 h-[70px] px-4 sm:px-2 border-b border-gray-200">
        <p
          onClick={() => navigate("/")}
          className="text-primary font-semibold text-3xl transition-all duration-300 ease-in-out  hover:text-blue-700 hover:scale-105 hover:-translate-y-1 cursor-pointer py-5 mx-8"
        >Siddharth Tiwari </p>
        <button
          onClick={logout}
          className="text-sm px-8 py-2 bg-primary hover:scale-115 mr-10 hover:bg-blue-700 transition-all text-white rounded-full cursor-pointer"
        >Logout
        </button>
      </div>

      <div className="flex h-[calc(100vh-70px)]">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
