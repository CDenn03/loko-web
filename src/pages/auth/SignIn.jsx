import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../../components/Topbar";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import jwt from "jsonwebtoken";
import axios from "axios";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      return toast.error("Please enter all the details", {
        position: toast.POSITION.TOP_CENTER,
      });
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: email,
      password: password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "https://us-central1-loko-202713.cloudfunctions.net/lokoWebLogin/userLogin?apiKey=AIzaSyCu6L1wyt5YAbXYRarKjeszbTp5CQIiiDI",
        requestOptions
      );

      if (response.status === 200) {
        const result = await response.json();
        if (result.SUCCESS) {
          console.log(result);
          navigate("/verify");
        } else {
          // Handle other success cases if needed
        }
      } else if (response.status === 401) {
        const errorResult = await response.json();
        if (errorResult.ERROR === "Unauthorized") {
          // Unauthorized, show an error message
          console.log("Unauthorized");
        } else if (errorResult.ERROR === "Incorrect Password.") {
          // Incorrect Password, show an error message
          console.log("Incorrect Password.");
        } else {
          // Handle other 401 errors if needed
        }
      } else if (response.status === 500) {
        const errorResult = await response.json();
        // Internal Server Error, show an error message
        console.log("Internal Server Error: " + errorResult.ERROR);
      } else {
        // Handle other response statuses if needed
      }
    } catch (error) {
      // Handle network or other errors
      console.log("Error: " + error);
    }
  };

  return (
    <>
      <Topbar />
      <ToastContainer />
      <div className=" bg-[#eaeddb] w-full h-screen content-center flex justify-center items-center pt-14  ">
        <div className=" w-full md:w-6/12  px-4 m-5 py-5 bg-white rounded-lg  ">
          <div className=" relative shadow-lg rounded-lg bg-blueGray-200 border-0">
            <div className=" flex flex-col justify-center p-3">
              <div className="text-blueGray-300 text-base lg:text-lg font-bold text-center py-1">
                Enter your login details
              </div>
              <hr className="m-4 border-b-1 border-blueGray-300" />
              <form onSubmit={login}>
                <div className="relative w-full mb-3 px-1">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Email
                  </label>
                  <div className="flex items-center">
                    <div className=" px-1 text-xl ">
                      <AiOutlineMail />
                    </div>
                    <input
                      type="email"
                      className="border-0 px-3 py-3  placeholder-blueGray-300 text-blueGray-600 bg-white rounded ring-gray-300 ring-2 text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                      onChange={(e) => {
                        e.preventDefault();
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div className="relative w-full mb-3 mt-2 px-1">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Password
                  </label>
                  <div className="flex items-center">
                    <div className="px-1 text-xl ">
                      <AiOutlineLock />
                    </div>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      onChange={(e) => {
                        e.preventDefault();
                        setPassword(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div className="text-center m-6">
                  <button
                    className="bg-[#d7b244] text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                    type="button"
                    onClick={login}
                  >
                    Sign In
                  </button>
                </div>
              </form>
              <div className=" relative flex mt-4">
                <button>
                  <small className=" hover:cursor-pointer hover:text-blue-800 ">
                    Forgot password?
                  </small>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
