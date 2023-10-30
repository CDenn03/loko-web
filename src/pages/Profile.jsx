import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import {
  getDocs,
  where,
  query,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../config/dbConfig";

export default function Profile() {
  const [shopProfile, setShopProfile] = useState({
    name: "",
    shopType: { name: "" },
    phone: "",
    email: "",
    address: "",
    deliveryContact: "",
  });

  const [profile, setProfile] = useState([]);

  const shopID = localStorage.getItem("userId");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordCorrect, setPasswordCorrect] = useState(false);
  const [showCurrentPasswordInput, setShowCurrentPasswordInput] =
    useState(false);
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);

  async function getProfile() {
    try {
      const shopsRef = collection(db, "Shops");
      const q = query(shopsRef, where("shopId", "==", shopID));

      const querySnapshot = await getDocs(q);
      const shopsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProfile(shopsData);
      localStorage.setItem("shopName", shopProfile.name);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    if (profile.length > 0) {
      setShopProfile(profile[0]);
    }
  }, [profile]);

  const handleNameChange = (event) => {
    setShopProfile({ ...shopProfile, name: event.target.value });
  };

  const handleShopTypeChange = (event) => {
    setShopProfile({
      ...shopProfile,
      shopType: { name: event.target.value },
    });
  };

  const handleAddressChange = (event) => {
    setShopProfile({ ...shopProfile, address: event.target.value });
  };

  const handleEmailChange = (event) => {
    setShopProfile({ ...shopProfile, email: event.target.value });
  };

  const handlePhoneChange = (event) => {
    setShopProfile({ ...shopProfile, phone: event.target.value });
  };

  const handleDeliveryContactChange = (event) => {
    setShopProfile({ ...shopProfile, deliveryContact: event.target.value });
  };

  const handleCurrentPasswordChange = async (event) => {
    const newPasswordInput = event.target.value;
    setCurrentPassword(newPasswordInput);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmNewPasswordChange = (event) => {
    setConfirmNewPassword(event.target.value);
  };

  const isSubmitDisabled = !(
    newPassword.length >= 6 && newPassword === confirmNewPassword
  );

  const handleSubmit = () => {
    setShowCurrentPasswordInput(true);
  };

  const handleSave = async () => {
    // Update the Firestore document in the "Shops" collection
    const shopCollection = collection(db, "Shops");
    const shopId = shopID;

    // Use the doc method to reference the specific document by its ID
    const shopDoc = doc(shopCollection, shopId);

    // Use the update method to update the document with the new data
    try {
      await updateDoc(shopDoc, shopProfile);
      console.log("Shop Document successfully updated!");
    } catch (error) {
      console.error("Error updating Shop Document:", error);
    }
  };

  const verifyPassword = async (event) => {
    const password = event.target.value;
    setCurrentPassword(password);
    // You should implement your password verification logic here
    // For the sake of this example, I'll assume a hardcoded correct password.

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: shopProfile.email,
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
        setIsPasswordCorrect(true);
      } else {
        setIsPasswordCorrect(false);
      }
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  const updatePassword = () => {
    if (isPasswordCorrect) {
      if (confirmNewPassword === "" || newPassword === "") {
        return toast.error("Please enter all the details", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      if (confirmNewPassword != newPassword) {
        return toast.error("passwords do not match", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      //send post to hash and store new password
    }
  };

  return (
    <div className="flex w-full">
      <Topbar />
      <Sidebar />
      <div className="bg-gray-100 w-full">
        <div className="pt-[100px] ">
          <span className="p-6 font-bold text-3xl">Profile</span>
        </div>
        <div className="flex flex-col">
          <div className="p-4">
            <form className="box-border w-full">
              <div className="flex-col">
                <div className="flex">
                  <div className="md:p-3 w-full md:w-1/2 lg:w-1/3 justify-between shadow-slate-500 drop-shadow-lg">
                    <div className="">Shop Name</div>
                    <div className="w-full">
                      <input
                        placeholder="Enter the Shop's name"
                        className="w-full border-1 p-2 border-gray-100 rounded-md"
                        value={shopProfile.name || ""}
                        onChange={handleNameChange}
                      />
                    </div>
                  </div>
                  <div className="p-2 md:p-3 w-full md:w-1/2 lg:w-1/3 justify-between shadow-slate-500 drop-shadow-lg">
                    <div className="">Shop Type</div>
                    <div className="w-full">
                      <input
                        placeholder="Enter Shop type"
                        className="w-full border-1 p-2 border-gray-100 rounded-md"
                        value={
                          shopProfile.shopType
                            ? shopProfile.shopType.name || ""
                            : ""
                        }
                        onChange={handleShopTypeChange}
                      />
                    </div>
                  </div>
                  <div className="p-2 md:p-3 w-full md:w-1/2 lg:w-1/3 justify-between shadow-slate-500 drop-shadow-lg">
                    <div className="">Address</div>
                    <div className="w-full">
                      <input
                        placeholder="Enter Address"
                        className="w-full border-1 p-2 border-gray-100 rounded-md"
                        value={shopProfile.address || ""}
                        onChange={handleAddressChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex">
                  <div className="p-2 md:p-3 w-full md:w-1/2 lg:w-1/3 justify-between shadow-slate-500 drop-shadow-lg">
                    <div className="">Email</div>
                    <div className="w-full">
                      <input
                        placeholder="Enter Email"
                        className="w-full border-1 p-2 border-gray-100 rounded-md"
                        value={shopProfile.email || ""}
                        onChange={handleEmailChange}
                      />
                    </div>
                  </div>
                  <div className="p-2 md:p-3 w-full md:w-1/2 lg:w-1/3 justify-between shadow-slate-500 drop-shadow-lg">
                    <div className="">Phone</div>
                    <div className="w-full">
                      <input
                        placeholder="Enter Phone"
                        className="w-full border-1 p-2 border-gray-100 rounded-md"
                        value={shopProfile.phone || ""}
                        onChange={handlePhoneChange}
                      />
                    </div>
                  </div>
                  <div className="p-2 md:p-3 w-full md:w-1/2 lg:w-1/3 justify-between shadow-slate-500 drop-shadow-lg">
                    <div className="">Delivery Contact</div>
                    <div className="w-full">
                      <input
                        placeholder="Enter Delivery Contact"
                        className="w-full border-1 p-2 border-gray-100 rounded-md"
                        value={shopProfile.deliveryContact || ""}
                        onChange={handleDeliveryContactChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="p-2 md:p-3 w-full md:w-1/2 lg:w-1/3 space-x-16 ">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleSave();
                    }}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Save
                  </button>
                  <button
                    className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowCurrentPasswordInput(!showCurrentPasswordInput);
                    }}
                  >
                    Change password
                  </button>
                </div>
                {showCurrentPasswordInput ? (
                  <div className="flex">
                    <div className="flex flex-col w-5/12">
                      <div className=" p-3 py-3">
                        <label className=" mb-2">Current Password</label>
                        <input
                          type="password"
                          value={currentPassword}
                          onChange={handleCurrentPasswordChange}
                          onBlur={verifyPassword}
                          className={`w-full border-1 p-2 rounded-md ${
                            isPasswordCorrect
                              ? "border-green-500 border-2"
                              : "shadow-slate-500 drop-shadow-lg"
                          }`}
                        />
                      </div>

                      <div className=" p-3 py-3">
                        <label className=" mb-2">New Password</label>
                        <input
                          type="password"
                          value={newPassword}
                          onChange={handleNewPasswordChange}
                          className="w-full border-1 p-2 border-gray-100 rounded-md shadow-slate-500 drop-shadow-lg"
                        />
                      </div>

                      <div className=" p-3 py-3">
                        <label className=" mb-2">Confirm New Password</label>
                        <input
                          type="password"
                          value={confirmNewPassword}
                          onChange={handleConfirmNewPasswordChange}
                          className="w-full border-1 p-2 border-gray-100 rounded-md shadow-slate-500 drop-shadow-lg"
                        />
                      </div>
                    </div>
                    <div className="flex items-center p-7 ">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                      >
                        Update Password
                      </button>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
