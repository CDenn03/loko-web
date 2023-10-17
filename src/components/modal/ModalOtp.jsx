import React, { useState } from 'react'
import { RiLockPasswordLine } from 'react-icons/ri'

export default function ModalOtp() {

  const [otp, setOtp] = useState;

  const verify = async(e) => {
    e.preventDefault();
    
  }

  const resend = async(e) => {
    e.preventDefault();

  }

  return (
    <>
      <div class="flex flex-col justify-center content-center items-center w-auto z-50  h-screen p-5">
        <div class="  w-full lg:w-3/5 p-4 rounded-lg bg-[#f2f5f7]">
          <div class=" p-3 rounded-lg relative shadow-lg bg-[#f5fafc] focus:outline-none">
            <div class="  text-sm mb-2 font-bold text-center py-1">Enter the OTP code you've recieved.</div>
            <form onSubmit={verify}>
              <div class="flex p-3 ">
                <span class=" bg-slate-100 p-1 align-middle m-1"><RiLockPasswordLine /></span>
                <input
                  type="text"
                  placeholder="OTP Code"
                  class="w-full rounded-lg p-2 focus:outline-none focus:ring ease-linear transition-all duration-150"
                  onChange={(e) => {
                    e.preventDefault();
                    setOtp(e.target.value);
                  }}
                />
              </div>
              <div class="flex justify-between mt-5 p-2">
                <button
                  class=" bg-[#d7b244] text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-4/12 ease-linear transition-all duration-150"
                  onSubmit={verify}
                >
                  <span>Verify OTP</span>
                </button>
                <button
                  class=" bg-red-500 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-4/12 ease-linear transition-all duration-150"
                  onSubmit={resend}
                >
                  <span>Resend OTP</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
