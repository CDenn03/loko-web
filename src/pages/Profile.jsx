import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { useData } from "../context/DataProvider";
import {
  getDocs,
  where,
  orderBy,
  limit,
  query,
  collection,
} from "firebase/firestore";

import { db } from "../config/FirebaseConfig";

export default function Profile() {
  const [shopProfile, setShopProfile] = useState({
    name: "",
    shopType: { name: "" },
    phone: "",
    email: "",
    address: "",
    deliveryContact: "",
  });

  const { id } = useData();

  useEffect(() => {
    const shopCollection = firebase.firestore().collection("shop");

    const shopsRef = collection(db, "Products");
    const q = query(productsRef, where("shop_id", "==", id));

    try {
    } catch {}

    const shopId = id;
    // Fetch the user data based on the user ID
    shopCollection
      .doc(shopId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          // Data found, set it in the state
          setShopProfile(doc.data());
        } else {
          console.log("Shop not found in Firestore");
        }
      })
      .catch((error) => {
        console.error("Error getting user data:", error);
      });
  }, []);

  // Define onChange handlers for each input field
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

  return (
    <div className="flex w-full">
      <Topbar />
      <Sidebar />
      <div className="bg-gray-100 w-full">
        <div className="pt-28">
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
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
