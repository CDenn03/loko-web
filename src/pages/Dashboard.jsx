import React from "react";
import Card from "../components/Card";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function Dashboard() {
  return (
    <>
      <div className="flex w-full">
        <Topbar />
        <Sidebar />
        <div className="w-full  bg-slate-100 ">
          <div className="pt-24 py-4 w-full">
            <span className="p-4 text-3xl">Dashboard</span>
          </div>
          <div className="">
            <div className="flex flex-wrap gap-4 p-5">
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
