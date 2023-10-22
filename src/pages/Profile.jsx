import React from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { useData } from "../context/DataProvider";

export default function Profile() {
  const { id } = useData();

  return (
    <div className="flex w-full">
      <Topbar />
      <Sidebar />
      <div className=" bg-gray-100 w-full">
        <div className="pt-28 ">
          <span className=" p-6  font-bold text-3xl">Profile</span>
        </div>
        <div className=" flex flex-col">
          <div className="  p-4">
            <form className="box-border  w-full">
              <div className="  flex-col">
                <div className=" flex">
                  <div className=" md:p-3 w-full md:w-1/2 lg:w-1/3 justify-between shadow-slate-500 drop-shadow-lg">
                    <div className="">Shop Name</div>
                    <div className="w-full">
                      <input
                        placeholder="Enter the Shop's name"
                        className="w-full border-1 p-2 border-gray-100 rounded-md"
                      />
                    </div>
                  </div>
                  <div className=" p-2 md:p-3 w-full md:w-1/2 lg:w-1/3 justify-between shadow-slate-500 drop-shadow-lg">
                    <div className="">Shop Type</div>
                    <div className="w-full">
                      <input
                        placeholder="Enter Shop type"
                        className="w-full border-1 p-2 border-gray-100 rounded-md"
                      />
                    </div>
                  </div>
                  <div className=" p-2 md:p-3 w-full md:w-1/2 lg:w-1/3 justify-between shadow-slate-500 drop-shadow-lg">
                    <div className="">Address</div>
                    <div className="w-full">
                      <input
                        placeholder="Enter Address"
                        className="w-full border-1 p-2 border-gray-100 rounded-md"
                      />
                    </div>
                  </div>
                </div>

                <div className=" flex">
                  <div className=" p-2 md:p-3 w-full md:w-1/2 lg:w-1/3 justify-between shadow-slate-500 drop-shadow-lg">
                    <div className="">Email</div>
                    <div className="w-full">
                      <input
                        placeholder="Enter Email"
                        className="w-full border-1 p-2 border-gray-100 rounded-md"
                      />
                    </div>
                  </div>
                  <div className=" p-2 md:p-3 w-full md:w-1/2 lg:w-1/3 justify-between shadow-slate-500 drop-shadow-lg">
                    <div className="">Password</div>
                    <div className="w-full">
                      <input
                        className="w-full border-1 p-2 border-gray-100 rounded-md"
                        placeholder="Enter Password"
                        type="password"
                      />
                    </div>
                  </div>
                  <div className=" p-2 md:p-3 w-full md:w-1/2 lg:w-1/3 justify-between shadow-slate-500 drop-shadow-lg">
                    <div>Confirm Password</div>
                    <div className="w-full">
                      <input
                        placeholder="Re-Enter Password"
                        className="w-full border-1 p-2 border-gray-100 rounded-md"
                        type="password"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-lg mt-5 md:p-4">
                <div className="  text-xl font-bold">Image</div>
                <div className="w-full">
                  <div className=" pt-2 rounded-md">
                    <div className=" rounded-full w-48 h-48 relative flex flex-col min-w-0">
                      <img
                        src="/public/images/moon.png"
                        alt="User Profile Photo"
                        className="w-full h-full object-cover"
                      />
                      <input className="hidden" />
                    </div>
                    <div className="py-3 break-words flex-col ">
                      <button className="  text-white font-bold w-36 hover:bg-amber-500 bg-amber-600 p-2 m-2 px-3 rounded-xl">
                        Edit
                      </button>
                      <button className="text-white font-bold w-36 hover:bg-amber-500 bg-amber-600 p-2 px-3 m-2 rounded-xl">
                        Delete
                      </button>
                    </div>
                    <button
                      className="bg-amber-700 hover:bg-amber-900 text-white w-auto active:bg-blueGray-600 text-sm font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                    >
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
