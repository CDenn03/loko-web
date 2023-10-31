import React from "react";
import { BiLogOutCircle } from "react-icons/bi";

export default function Topbar() {
  function signOut() {
    localStorage.removeItem("jwtToken");
  }
  return (
    <div className=" flex w-full p-1 fixed top-0 right-0 left-0 bg-[#6b792f] justify-between z-20 bg-opacity-95 ">
      <div className=" px-6 self-center">
        <img src="/images/loko.png" className=" h-[74px]"></img>
      </div>
      <button
        className="flex px-3 h-fit w-fit py-2 align-middle self-center border-[#e4bd47] justify-center border-2 rounded-full hover:bg-[#4d5720] text-white text-xl"
        onClick={signOut}
        //border-[#e4bd47] border-2 rounded-full hover:border-white
      >
        <div className="flex items-center w-full h-full space-x-2 align-middle">
          <BiLogOutCircle />
          <span className="text-xl">Logout</span>
        </div>
      </button>
    </div>
  );
}
