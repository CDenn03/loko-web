import React from "react";
import { AiOutlineHome, AiOutlineTags, AiOutlineUser } from "react-icons/ai";

export default function Sidebar() {
  return (
    <nav className=" pt-20 w-48   bg-slate-800 text-white h-screen">
      <ul className="space-y-1 p-1">
        <span className=" text-sm uppercase font-bold">Navigation</span>
        <li className="p-2 text-white bg-slate-800 rounded-lg">
          <p className=" flex items-center text-lg uppercase font-semibold">
            <AiOutlineHome />
            <span className=" cursor-pointer">Dashboard</span>
          </p>
        </li>
        <li className=" text-white bg-slate-800 rounded-lg">
          <p className=" flex items-center text-lg uppercase font-semibold">
            <AiOutlineTags />
            <span>Products</span>
          </p>
        </li>
        <li className=" p-2  text-white bg-slate-800 rounded-lg">
          <p className=" flex items-center text-lg uppercase font-semibold">
            <AiOutlineUser />
            <span>Profile</span>
          </p>
        </li>
      </ul>
    </nav>
  );
}
