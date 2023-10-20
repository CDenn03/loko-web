import React from "react";
import { AiOutlineHome, AiOutlineTags, AiOutlineUser } from "react-icons/ai";

export default function Sidebar() {
  return (
    <nav className=" pt-20 w-48   bg-green-50 h-screen">
      <ul className="space-y-1 p-1">
        <span className=" text-sm uppercase font-semibold">Navigation</span>
        <li className="text-black p-2 bg-green-100 rounded-lg">
          <p className=" flex items-center text-lg uppercase font-semibold">
            <AiOutlineHome />
            <span>Dashboard</span>
          </p>
        </li>
        <li className="text-black p-2 bg-green-100 rounded-lg">
          <p className=" flex items-center text-lg uppercase font-semibold">
            <AiOutlineTags />
            <span>Products</span>
          </p>
        </li>
        <li className="text-black p-2 bg-green-100 rounded-lg">
          <p className=" flex items-center text-lg uppercase font-semibold">
            <AiOutlineUser />
            <span>Profile</span>
          </p>
        </li>
      </ul>
    </nav>
  );
}
