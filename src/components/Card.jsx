import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";

export default function Card() {
  return (
    <div className=" flex flex-col text-white  bg-amber-600 rounded-lg">
      <div className=" bg-amber-600 flex justify-between w-full rounded-t-lg p-3">
        <div>TOTAL ORDERS</div>
        <div>arrow/number</div>
      </div>
      <div className="flex justify-between p-3 items-center mx-2">
        <div className=" font-medium text-5xl">
          <AiOutlineShoppingCart />
        </div>
        <div className=" text-6xl">00</div>
      </div>
      <div className=" bg-amber-700 rounded-b-lg p-2 text-white text-sm">
        <span className=" hover:cursor-pointer p-1">View more...</span>
      </div>
    </div>
  );
}
