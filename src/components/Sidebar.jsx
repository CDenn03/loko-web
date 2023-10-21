import React from "react";
import { AiOutlineHome, AiOutlineTags, AiOutlineUser } from "react-icons/ai";

export default function Sidebar() {
  return (
    <nav className=" flex justify-center pt-20  p-3  bg-slate-800 text-white h-screen">
      <ul className="space-y-1">
        <span className=" p-4 text-xl uppercase font-bold">Navigation</span>
        {/* start of components */}
        <li className=" w-60 cursor-pointer hover:bg-slate-700 p-3 text-white bg-slate-800 rounded-lg">
          <p className=" flex items-center text-lg uppercase font-semibold">
            <AiOutlineHome />
            <span className=" pl-2">Dashboard</span>
          </p>
        </li>
        <li className=" cursor-pointer hover:bg-slate-700 p-3  text-white bg-slate-800 rounded-lg">
          <p className=" flex items-center text-lg uppercase font-semibold">
            <AiOutlineTags />
            <span className=" pl-2">Products</span>
          </p>
        </li>
        <li className=" cursor-pointer hover:bg-slate-700 p-3  text-white bg-slate-800 rounded-lg">
          <p className=" flex items-center text-lg uppercase font-semibold">
            <AiOutlineUser />
            <span className=" pl-2 ">Profile</span>
          </p>
        </li>
      </ul>
    </nav>
  );
}
