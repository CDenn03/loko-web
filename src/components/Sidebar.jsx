import React from "react";
import { AiOutlineHome, AiOutlineTags, AiOutlineUser } from "react-icons/ai";

export default function Sidebar() {
  return (
    <nav className=" pt-20  p-5 bg-slate-100 text-black h-screen">
      <ul className=" flex-col justify-center flex gap-2 ">
        <span className=" p-4 text-xl uppercase font-bold">Navigation</span>
        {/* start of components */}
        <li className="  shadow-lg cursor-pointer  hover:text-white hover:bg-amber-600 p-2 text-black bg-white rounded-lg">
          <p className=" flex items-center text-lg uppercase font-semibold">
            <AiOutlineHome />
            <span className=" pl-2 pr-7">Dashboard</span>
          </p>
        </li>
        <li className=" cursor-pointer shadow-lg   hover:text-white hover:bg-amber-600 p-2 text-black bg-white rounded-lg">
          <p className=" flex items-center text-lg uppercase font-semibold">
            <AiOutlineTags />
            <span className=" pl-2">Products</span>
          </p>
        </li>
        <li className=" shadow-lg cursor-pointer hover:text-white hover:bg-amber-600 p-2 text-black bg-white rounded-lg">
          <p className=" flex items-center text-lg uppercase font-semibold">
            <AiOutlineUser />
            <span className=" pl-2 ">Profile</span>
          </p>
        </li>
      </ul>
    </nav>
  );
}
