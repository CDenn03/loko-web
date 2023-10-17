import React, { useState } from "react";
import Topbar from "../components/Topbar";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import axios from "axios";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const login = async (e) => {
  //   e.preventDefault();
  //   if (email === "" || password === "") {
  //     return toast.error("Please enter all the details", {
  //       position: toast.POSITION.TOP_CENTER,
  //     });
  //   }

  //   var myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");

  //   var raw = JSON.stringify({
  //     email: "isaackariuki108@gmail.com",
  //     password: "bhevjfd",
  //   });

  //   var requestOptions = {
  //     method: "POST",
  //     mode: "no-cors",
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: "follow",
  //   };

  //   await fetch(
  //     "https://us-central1-loko-202713.cloudfunctions.net/lokoWebLogin/userLogin?apiKey=AIzaSyCu6L1wyt5YAbXYRarKjeszbTp5CQIiiDI",
  //     requestOptions
  //   )
  //     .then((response) => response.text())
  //     .then((result) => console.log(result))
  //     .catch((error) => console.log("error", error));

  //   // try {
  //   //   const response = await fetch(
  //   //     "https://us-central1-loko-202713.cloudfunctions.net/lokoWebLogin/userLogin?apiKey=AIzaSyCu6L1wyt5YAbXYRarKjeszbTp5CQIiiDI",
  //   //     {
  //   //       method: "POST", // *GET, POST, PUT, DELETE, etc.
  //   //       mode: "no-cors", // no-cors, *cors, same-origin

  //   //       headers: {
  //   //         "Content-Type": "application/json",
  //   //       },
  //   //       body: JSON.stringify({
  //   //         email: email,
  //   //         password: password,
  //   //       }),
  //   //     }
  //   //   );

  //   //   if (response.status == 200) {
  //   //     const data = await response.json();
  //   //     // Handle the response data as needed
  //   //     console.log("Authentication successful:", data);
  //   //   } else {
  //   //     // Request failed
  //   //     console.error(
  //   //       "Authentication failed:",
  //   //       response.status,
  //   //       response.statusText
  //   //     );
  //   //   }
  //   // } catch (error) {
  //   //   console.error("Error during authentication request:", error);
  //   // }
  // };

  // const login = async (e) => {
  //   e.preventDefault();
  //   if (email === "" || password === "") {
  //     return toast.error("Please enter all the details", {
  //       position: toast.POSITION.TOP_CENTER,
  //     });
  //   }

  //   const api_key = "AIzaSyCu6L1wyt5YAbXYRarKjeszbTp5CQIiiDI";

  //   const headers = {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${api_key}`,
  //     "Access-Control-Allow-Origin": "*",
  //     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  //     withCredentials: false,
  //     mode: "no-cors",
  //     params: { apiKey: api_key },
  //   };

  //   const data = {
  //     email: email,
  //     password: password,
  //   };

  //   try {
  //     const response = await axios.post(
  //       "https://us-central1-loko-202713.cloudfunctions.net/lokoWebLogin/userLogin",
  //       data,
  //       { headers: headers }
  //     );

  //     if (response.status === 200) {
  //       // Request was successful
  //       const responseData = response.data;
  //       console.log("Authentication successful:", responseData);
  //     } else {
  //       // Request failed
  //       console.error(
  //         "Authentication failed:",
  //         response.status,
  //         response.statusText
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Error during authentication request:", error);
  //   }
  // };

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

    await fetch(
      "https://us-central1-loko-202713.cloudfunctions.net/lokoWebLogin/userLogin?apiKey=AIzaSyCu6L1wyt5YAbXYRarKjeszbTp5CQIiiDI",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <Topbar />
      <div className=" bg-[#eaeddb] w-full h-screen content-center flex justify-center items-center">
        <div className=" w-full lg:w-6/12 px-4 m-5 py-5 bg-white rounded-lg  ">
          <div className=" relative shadow-lg rounded-lg bg-blueGray-200 border-0">
            <div className=" flex flex-col justify-center p-3">
              <div className="">
                <div className="text-blueGray-300 text-base font-bold text-center py-1">
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
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
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
      </div>
    </>
  );
}
