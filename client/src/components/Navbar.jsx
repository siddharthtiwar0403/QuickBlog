import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const { navigate, token } = useAppContext();

  return (
    <div className="flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32 cursor-pointer">
      <p
        onClick={() => navigate("/")}
        className="text-primary font-semibold text-3xl transition-all duration-300 ease-in-out  hover:text-blue-700 hover:scale-105 hover:-translate-y-1"
      >Siddharth Tiwari </p>
      <button
        onClick={() => navigate("/admin")}
        className="flex items-center gap-2 rounded-full text-sm cursor-pointer hover:scale-110 transition bg-primary hover:bg-blue-700 text-white px-10 py-2.5"
      >
        {" "}
        {token ? "Dashboard" : "Login"}
        <img src={assets.arrow} className="w-3" alt="" />
      </button>
    </div>
  );
};

export default Navbar;
