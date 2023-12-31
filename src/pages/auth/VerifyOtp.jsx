import React, { useState } from "react";
import Topbar from "../../components/Topbar";
import { RiLockPasswordLine } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate("");
  const [responseMessage, setResponseMessage] = useState("");

  const [jwtToken, setJwtToken] = useState(null);
  const id = localStorage.getItem("userId");

  const verify = async (e) => {
    e.preventDefault();
    if (otp == "") {
      return toast.error("Please enter the OTP", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    console.log("Working");
    navigate("/");

    try {
      // Define the request payload
      const data = {
        shopId: id,
        webOTP: otp,
      };

      // Make the POST request to the /verifyOTPWeb endpoint
      const response = await fetch(
        "https://us-central1-loko-202713.cloudfunctions.net/lokoWebLogin/verifyOTPWeb?apiKey=AIzaSyCu6L1wyt5YAbXYRarKjeszbTp5CQIiiDI",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseData = await response.json();

      if (responseData.ERROR) {
        // Handle error responses
        if (responseData.ERROR === "Unauthorized") {
          setResponseMessage("Error: Unauthorized");
        } else if (responseData.ERROR === "Incorrect OTP Code.") {
          setResponseMessage("Error: Incorrect OTP Code.");
          toast.error("Incorrect OTP Code.");
        } else if (responseData.ERROR === "OTP Code Does Not Exist.") {
          setResponseMessage("Error: OTP Code does not exist.");
        } else {
          setResponseMessage("Error: Unknown error.");
        }
      } else if (responseData.SUCCESS) {
        // Handle success responses
        setResponseMessage("Success: " + responseData.SUCCESS);
        toast.success("Successful verification");
        //TODO: implement token
        localStorage.setItem("jwtToken", token);
        navigate("/");
      } else {
        // Handle unknown response format
        setResponseMessage("Unknown response format");
      }
      console.log(responseMessage);
      console.log("Response");
    } catch (error) {
      // Handle network or other errors
      setResponseMessage("Error: " + error.message);
    }
    localStorage.setItem("jwtToken", token);
    navigate("/");
  };

  const resend = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Topbar />
      <ToastContainer />
      <div className=" bg-[#eaeddb] w-full h-screen content-center flex justify-center items-center">
        <div className=" w-full md:w-6/12  px-4 m-5 py-5 bg-white rounded-lg  ">
          <div className=" relative shadow-lg rounded-lg bg-blueGray-200 border-0">
            <div className=" flex flex-col justify-center p-3">
              <div className="  text-sm mb-2 font-bold text-center py-1">
                Enter the OTP code sent to your email.
              </div>
              <form onSubmit={verify}>
                <div className="flex p-3 ">
                  <div className=" flex items-center">
                    <span className=" p-1 align-middle m-1 text-xl ">
                      <RiLockPasswordLine />
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder="OTP Code"
                    className="w-full ring-gray-300 ring-2 rounded-lg p-2 focus:outline-none focus:ring ease-linear transition-all duration-150"
                    onChange={(e) => {
                      e.preventDefault();
                      setOtp(e.target.value);
                    }}
                  />
                </div>
                <div className="flex justify-between mt-5 p-2">
                  <button
                    className=" bg-[#d7b244] container text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-auto ease-linear transition-all duration-150"
                    onClick={() => {
                      verify;
                    }}
                  >
                    <span>Verify OTP</span>
                  </button>
                  <button className=" bg-red-500 container text-white active:bg-blueGray-600 max_sm:text-xs text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-auto ease-linear transition-all duration-150">
                    <span>Resend OTP</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
