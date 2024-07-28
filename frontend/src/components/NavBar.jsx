import React, { useContext, useEffect, useState } from "react";
import { TbLayout2Filled } from "react-icons/tb";
import { IoIosSettings } from "react-icons/io";
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { SiTask } from "react-icons/si";
import { HiUserCircle } from "react-icons/hi";
import { GlobalState } from "../context/GlobalState";
import { Link } from "react-router-dom";

function NavBar({ active }) {
  const { user, mode, setMode } = useContext(GlobalState);

  console.log("Entered navbar")
  console.log(user)

  const handleToggleMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
    document.body.classList.toggle("darkmode");
    document
      .querySelectorAll(".mode-items")
      .forEach((el) => el.classList.toggle("text-white"));
  };

  return (
    <nav className="nav-bar w-52 bg-nav-color h-screen cursor-default pt-4 relative">
      <div className=" mb-5 pl-3">
        <h2 className="font-roboto font-extrabold text-lg mode-items ">
          <SiTask className="inline mr-1" />
          Taskly
        </h2>
        <span className="text-[11px] text-[#767575] font-lato">
          Focus.Prioritize.Execute
        </span>
      </div>
      <div className="user m-2 rounded-xl h-14 mb-12 border-[1px] border-border-color flex items-center p-3">
        <HiUserCircle size={35} className="mr-2 text-priority-color"/>
       
        <div className="flex flex-col">
          <span className="font-bold font-roboto text-sm mode-items">
            {user.name}
          </span>
          <span className="text-[10px] text-[#767575]">{user.email}</span>
        </div>
      </div>
      <span className="text-[#767575]  font-roboto text-sm pl-4 ">Menu</span>
      <ul className="nav-list text-sm mt-5  text-[#767575] font-roboto pl-6">
        <Link to="/dashboard">
          <li className="h-10 flex items-center justify-between cursor-pointer my-5 ">
            <span className={active === "/dashboard" ? "active-text" : ""}>
              <TbLayout2Filled className="inline mr-3" size={20} />
              Overview
            </span>
            <span
              className={active === "/dashboard" ? "active-tag" : ""}
            ></span>
          </li>
        </Link>
        <Link to="/settings">
          <li className="h-10 flex items-center  justify-between cursor-pointer ">
            <span className={active === "/settings" ? "active-text" : ""}>
              <IoIosSettings className="inline mr-3 -ml-[2px]" size={24} />
              Settings
            </span>
            <span className={active === "/settings" ? "active-tag" : ""}></span>
          </li>
        </Link>
      </ul>

      <div className="cursor-pointer absolute bottom-6 pl-3">
        {mode === "light" ? (
          <MdDarkMode size={25} onClick={handleToggleMode} fill="#767575" />
        ) : (
          <MdLightMode size={25} onClick={handleToggleMode} fill="#767575" />
        )}
      </div>
    </nav>
  );
}

export default NavBar;
