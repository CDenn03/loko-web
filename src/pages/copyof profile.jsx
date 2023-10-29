import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

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

  const [profile, setProfile] = useState([]);

  const shopID = localStorage.getItem("userId");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordCorrect, setPasswordCorrect] = useState(false);
  const [showCurrentPasswordInput, setShowCurrentPasswordInput] =
    useState(false);

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
      console.log(shopsData); // Logging the data you received
      console.log("profile name");
      console.log(profile.name);
      console.log("localStorage");
      console.log(localStorage);
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

  const handleCurrentPasswordChange = async (event) => {
    const newPasswordInput = event.target.value;
    // You would implement your password validation logic here.
    // For this example, we'll just check if the password is "correct".

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: shopProfile.email,
      password: newPasswordInput,
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
        }
      } else {
        // Handle other response statuses if needed
      }
    } catch (error) {
      // Handle network or other errors
      console.log("Error: " + error);
    }

    setPasswordCorrect(newPasswordInput === "correct_password");
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
    // You can trigger your password change function here.
    // For this example, we'll just log the new password to the console.
    console.log("New Password:", newPassword);
    setShowCurrentPasswordInput(true); // Show the current password input after clicking "Change Password".
  };

  // const handleSave = () => {
  //   // Update the Firestore document with the modified shopProfile
  //   const shopCollection = collection(db, "Shops");
  //   const shopId = id;
  //   shopCollection
  //     .doc(shopId)
  //     .update(shopProfile)
  //     .then(() => {
  //       console.log("Document successfully updated!");
  //     })
  //     .catch((error) => {
  //       console.error("Error updating document:", error);
  //     });

  //   //Shopsales subcollection shop name
  //   //products shop name
  //   //shoporder shop name
  //   //items in cart shop name
  // };

  const handleSave = async () => {
    // Update the Firestore document in the "Shops" collection
    const shopCollection = collection(db, "Shops");
    const shopId = shopID;
    shopCollection
      .doc(shopId)
      .update(shopProfile)
      .then(() => {
        console.log("Shop Document successfully updated!");
      })
      .catch((error) => {
        console.error("Error updating Shop Document:", error);
      });

    // Now, update other Firestore documents that have the "shop_name" field.
    // const updatePromises = [];

    // Example: Updating the "ShopSales" subcollection
    // const shopSalesCollection = collection(db, "Sales", shopId, "ShopSales");
    // const shopSalesQuery = query(
    //   shopSalesCollection,
    //   where("shop_name", "==", shopProfile.name)
    // );
    // const shopSalesDocs = await getDocs(shopSalesQuery);
    // shopSalesDocs.forEach((doc) => {
    //   updatePromises.push(updateDoc(doc.ref, { shop_name: shopProfile.name }));
    // });

    // Updating the "Products" collection
    // const productsCollection = collection(db, "Products");
    // const productsQuery = query(
    //   productsCollection,
    //   where("shop_id", "==", shopID)
    // );
    // const productsDocs = await getDocs(productsQuery);
    // productsDocs.forEach((doc) => {
    //   updatePromises.push(updateDoc(doc.ref, { shop_name: shopProfile.name }));
    // });

    // Updating the "ShopOrder" collection
    // const shopOrderCollection = collection(db, "ShopOrder");
    // const shopOrderQuery = query(
    //   shopOrderCollection,
    //   where("shop_id", "==", shopID)
    // );
    // const shopOrderDocs = await getDocs(shopOrderQuery);
    // shopOrderDocs.forEach((doc) => {
    //   updatePromises.push(updateDoc(doc.ref, { shop_name: shopProfile.name }));
    // });

    // update logic for the "Items" subcollection in the "Cart" collection
    //   const cartCollection = collection(db, "Cart");
    //   const cartQuery = query(cartCollection, where("shop_id", "==", shopID));
    //   const cartDocs = await getDocs(cartQuery);

    //   cartDocs.forEach(async (cartDoc) => {
    //     const itemsCollection = collection(cartDoc.ref, "Items");
    //     const itemsQuery = query(itemsCollection);
    //     const itemsDocs = await getDocs(itemsQuery);

    //     itemsDocs.forEach((itemDoc) => {
    //       updatePromises.push(
    //         updateDoc(itemDoc.ref, { shop_name: shopProfile.name })
    //       );
    //     });
    //   });

    //   // Wait for all update promises to complete
    //   await Promise.all(updatePromises);

    //   console.log("Other Documents successfully updated!");
    // };

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
                  <div className="p-2 md:p-3 w-full md:w-1/2 lg:w-1/3 space-x-16 ">
                    <button
                      onClick={handleSave}
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
                    <div>
                      <label className="block font-bold mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        value={currentPassword}
                        onChange={handleCurrentPasswordChange}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  ) : (
                    ""
                  )}

                  {passwordCorrect && (
                    <div>
                      <label className="block font-bold mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={handleNewPasswordChange}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  )}

                  {passwordCorrect && newPassword.length >= 6 && (
                    <div>
                      <label className="block font-bold mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        value={confirmNewPassword}
                        onChange={handleConfirmNewPasswordChange}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  )}
                  {passwordCorrect &&
                    newPassword.length >= 6 &&
                    passwordsMatch && (
                      <div>
                        <button
                          onClick={handleSaveNewPassword}
                          className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                        >
                          Save New Password
                        </button>
                      </div>
                    )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

//make the border glow green when the paassword is okay, red when not
// remember to do pagination
