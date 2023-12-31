import React, { useState } from "react";

import { addDoc, collection, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../config/dbConfig";
import { BiSolidSave } from "react-icons/bi";

const ModalAddProduct = ({
  showModalAddProducts,
  setshowModalAddProducts,
  getProducts,
}) => {
  const [productData, setProductData] = useState({
    prodName: "",
    buyingPrice: "",
    sellingPrice: "",
    quantity: "",
    category: "",
    description: "",
    image: "",
  });
  const id = localStorage.getItem("userId");
  const shopName = localStorage.getItem("shopName");
  console.log(id);

  const handleAddProduct = async () => {
    try {
      const productsCollection = collection(db, "Products");

      //implement category
      const newProduct = {
        id: "",
        prodName: productData.prodName,
        buyingPrice: productData.buyingPrice,
        sellingPrice: productData.sellingPrice,
        quantity: productData.quantity,
        category: productData.category,
        description: productData.description,
        image: productData.image,
        shop_id: id,
        shop_name: shopName,
        active: true,
        featured: false,
      };

      // Add the document to the collection
      const docRef = await addDoc(productsCollection, newProduct);

      // Update the 'id' field with the generated document ID
      await updateDoc(docRef, { id: docRef.id });

      // Clear the form fields
      setProductData({
        prodName: "",
        buyingPrice: "",
        sellingPrice: "",
        quantity: "",
        category: "",
        description: "",
        image: "",
      });

      // Close the modal
      setshowModalAddProducts(false);

      // Refresh the product list by calling the getProducts function
      getProducts();

      // Show a success message using toast
      toast.success("Product added successfully");
    } catch (error) {
      console.error("Error adding product:", error);
      // Show an error message using toast
      toast.error("Error adding product");
    }
  };

  return (
    <div>
      {showModalAddProducts ? (
        <div className="fixed inset-0 flex items-center justify-center z-50 overflow-hidden h-fit">
          <div className="modal-bg fixed inset-0 bg-black opacity-50"></div>
          <div className="modal relative bg-white p-4 mt-3 rounded-lg shadow-lg w-1/3 mx-auto h-full">
            <span
              className="close absolute top-2 right-2 text-gray-500 cursor-pointer text-2xl"
              onClick={() => {
                setshowModalAddProducts(false);
              }}
            >
              &times;
            </span>
            <h2 className="text-xl font-semibold mb-2">Add Product</h2>
            <form className="overflow-y-auto">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  onChange={(e) =>
                    setProductData({ ...productData, prodName: e.target.value })
                  }
                  required
                  className="form-input border border-gray-300 rounded p-1 mt-1 block w-full"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Buying Price
                </label>
                <input
                  type="text"
                  name="buyingPrice"
                  onChange={(e) =>
                    setProductData({
                      ...productData,
                      buyingPrice: e.target.value,
                    })
                  }
                  required
                  className="form-input border border-gray-300 rounded p-1 mt-1 block w-full"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Selling Price
                </label>
                <input
                  type="text"
                  name="sellingPrice"
                  onChange={(e) =>
                    setProductData({
                      ...productData,
                      sellingPrice: e.target.value,
                    })
                  }
                  required
                  className="form-input border border-gray-300 rounded p-1 mt-1 block w-full"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <input
                  type="text"
                  name="quantity"
                  onChange={(e) =>
                    setProductData({ ...productData, quantity: e.target.value })
                  }
                  required
                  className="form-input border border-gray-300 rounded p-1 mt-1 block w-full"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  onChange={(e) =>
                    setProductData({ ...productData, category: e.target.value })
                  }
                  required
                  className="form-textarea border border-gray-300 rounded p-1 mt-1 block w-full"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  onChange={(e) =>
                    setProductData({
                      ...productData,
                      description: e.target.value,
                    })
                  }
                  required
                  className="form-input border border-gray-300 rounded p-1 mt-1 block w-full"
                />
              </div>
              <div className="flex justify-between  items-center">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    onChange={(e) =>
                      setProductData({ ...productData, image: e.target.value })
                    }
                    className="form-input mt-1 block w-full"
                  />
                </div>
                <div className=" pl-2 ">
                  <button
                    type="button"
                    className="bg-[#e4bd47] hover:bg-[#ccab49] text-white font-bold py-1 px-4 rounded mr-2 "
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddProduct();
                    }}
                  >
                    <div className="flex justify-center items-center">
                      <BiSolidSave />
                      <span className="px-1 text-base ">Save</span>
                    </div>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ModalAddProduct;
