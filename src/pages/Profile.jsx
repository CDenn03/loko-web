import React from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { useData } from "../context/DataProvider";

export default function Profile() {
  return (
    <div className="flex w-full">
      <Topbar />
      <Sidebar />
      <div className="w-full bg-[#EAEDDB]">
        <div className="pt-24 py-4  w-full">
          <span className="p-4 text-3xl">Profile</span>
        </div>
        <div className=" flex flex-col m-2">
          <div className="bg-gray-200 flex p-2 md:p-4 w-full">
            <form className="box-border flex flex-wrap w-full">
              <div className="flex p-2 md:p-3 w-full md:w-1/2 lg:w-1/3 justify-between shadow-slate-500 drop-shadow-lg">
                <div className="mx-1">Shop Name</div>
                <div className="w-full">
                  <input className="w-full border-2 border-gray-400 p-1 rounded-md" />
                </div>
              </div>
              <div className="flex p-2 md:p-3 w-full md:w-1/2 lg:w-1/3 justify-between shadow-slate-500 drop-shadow-lg">
                <div className="mx-1">Shop Type</div>
                <div className="w-full">
                  <input className="w-full border-2 p-1 border-gray-400 rounded-md" />
                </div>
              </div>
              <div className="flex p-2 md:p-3 w-full md:w-1/2 lg:w-1/3 justify-between shadow-slate-500 drop-shadow-lg">
                <div className="mx-1">Address</div>
                <div className="w-full">
                  <input className="w-full border-2 p-1 border-gray-400 rounded-md" />
                </div>
              </div>
              <div className="flex p-2 md:p-3 w-full md:w-1/2 lg:w-1/3 justify-between shadow-slate-500 drop-shadow-lg">
                <div className="mx-1">Email</div>
                <div className="w-full">
                  <input className="w-full border-2 p-1 border-gray-400 rounded-md" />
                </div>
              </div>
              <div className="flex p-2 md:p-3 w-full md:w-1/2 lg:w-1/3 justify-between shadow-slate-500 drop-shadow-lg">
                <div className="mx-1">Password</div>
                <div className="w-full">
                  <input
                    className="w-full border-2 p-1 border-gray-400 rounded-md"
                    type="password"
                  />
                </div>
              </div>
              <div className="flex p-2 md:p-3 w-full md:w-1/2 lg:w-1/3 justify-between shadow-slate-500 drop-shadow-lg">
                <div>Confirm</div>
                <div className="w-full">
                  <input
                    className="w-full border-2 p-1 border-gray-400 rounded-md"
                    type="password"
                  />
                </div>
              </div>
              <div className="flex p-2 md:p-3 w-full justify-between shadow-slate-500 drop-shadow-lg">
                <div>Image</div>
                <div className="w-full">
                  <div className="bg-black rounded-md">
                    <div className="w-48 h-48 bg-white relative flex flex-col min-w-0">
                      <img
                        src="path_to_user_profile_photo.jpg"
                        alt="User Profile Photo"
                        className="w-full h-full object-cover"
                      />
                      <input className="hidden" />
                    </div>
                    <div className="p-2 flex break-words flex-col justify-between">
                      <button className=" w-auto bg-purple-500 p-2 m-2 px-3 rounded-xl">
                        Edit
                      </button>
                      <button className=" w-auto bg-purple-500 p-2 px-3 m-2 rounded-xl">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="bg-[#d7b244] text-white w-auto active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                Save changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
