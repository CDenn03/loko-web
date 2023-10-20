import React, { useEffect, useState } from "react";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";

export default function Dashboard() {
  return (
    <>
      <div className="flex w-full">
        <Topbar />
        <Sidebar />
        <div className="w-full">
          <div className="pt-24 py-4 bg-yellow-50 w-full">
            <span className="p-4 text-3xl">Dashboard</span>
          </div>
          <div className="">
            <div className="flex flex-wrap gap-2 p-3 justify-between">
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
