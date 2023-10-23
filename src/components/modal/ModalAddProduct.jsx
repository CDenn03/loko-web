import React, { useState } from "react";
import { useData } from "../../context/DataProvider";
import { addDoc, collection, getDocs, query, where } from "@firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../config/FirebaseConfig";

const ModalAddProduct = ({
  showModalAddProducts,
  setshowModalAddProducts,
  getProducts,
}) => {
  const [productData, setProductData] = useState({
    name: "",
    buyingPrice: "",
    sellingPrice: "",
    quantity: "",
    category: "",
    description: "",
    image: "",
  });
  const { id, shopName } = useData();

  const checkDuplicate = async (name, id) => {
    const productsRef = collection(db, "Products");
    const que = query(
      productsRef,
      where("name", "==", name),
      where("shopId", "==", id)
    );

    const querySnapshot = await getDocs(que);

    if (querySnapshot.size === 0) {
      return false;
    } else {
      toast.error("Name already exists.", {
        position: toast.POSITION.TOP_CENTER,
      });
      return true;
    }
  };

  const handleAddProduct = async () => {
    if (await checkDuplicate(productData.name, id)) {
      return; // Don't proceed if there's a duplicate
    }

    try {
      const productsRef = collection(db, "Products");
      await addDoc(productsRef, {
        ...productData, // Include the product data from the state
        shopId: id, // Include the shopId
        shopName: shopName, // Include the shopName
      });

      setshowModalAddProducts(false);
      getProducts();
    } catch (error) {
      console.error("Error adding product to Firestore:", error);
    }
  };

  return (
    <div className="">
      {showModalAddProducts ? (
        <div className="fixed inset-0 flex items-center justify-center z-50 h-screen">
          <div className="modal-bg fixed inset-0 bg-black opacity-50"></div>
          <div className="modal relative bg-white p-4 rounded-lg shadow-lg w-96">
            <span
              className="close absolute top-2 right-2 text-gray-500 cursor-pointer text-2xl"
              onClick={() => {
                setshowModalAddProducts(false);
              }}
            >
              &times;
            </span>
            <h2 className="text-xl font-semibold mb-4">Add Product</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  onChange={(e) =>
                    setProductData({ ...productData, name: e.target.value })
                  }
                  className="form-input border border-gray-300 rounded p-2 mt-1 block w-full"
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
                  className="form-input border border-gray-300 rounded p-2 mt-1 block w-full"
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
                  className="form-input border border-gray-300 rounded p-2 mt-1 block w-full"
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
                  className="form-input border border-gray-300 rounded p-2 mt-1 block w-full"
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
                  className="form-textarea border border-gray-300 rounded p-2 mt-1 block w-full"
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
                  className="form-input border border-gray-300 rounded p-2 mt-1 block w-full"
                />
              </div>

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

              <button
                type="button"
                onClick={handleAddProduct}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ModalAddProduct;
