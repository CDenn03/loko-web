import React from "react";
import { BiLogOutCircle } from "react-icons/bi";

export default function Topbar() {
  function signOut() {
    localStorage.removeItem("jwtToken");
  }
  return (
    <div className=" flex w-full p-1 fixed top-0 right-0 left-0 bg-[#6b792f] justify-between">
      <div className=" px-6 self-center">
        <img src="/images/loko.png" className=" h-[74px]"></img>
      </div>
      <button
        className="flex p-2 border-2 rounded-full hover:border-white hover:bg-[#6b792f] hover:bg-opacity-70 hover:shadow-md text-white text-3xl"
        onClick={signOut}
      >
        <div className="flex items-center space-x-2">
          <BiLogOutCircle />
          <span className="text-3xl">Logout</span>
        </div>
      </button>
    </div>
  );
}
