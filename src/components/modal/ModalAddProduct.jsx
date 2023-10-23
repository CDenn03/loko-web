import React, { useState } from "react";
import { useData } from "../context/DataProvider";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "@firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import { toast } from "react-toastify";

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
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [buyingPrice, setBuyingPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [image, setImage] = useState();
  const { id } = useData();
  const { shopName } = useData();

  async function checkDuplicate(name, id) {
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
  }

  async function AddProduct() {
    // if (checkDuplicate) {
    //   try{
    //     const productsRef = collection(db, "Products");
    //     await addDoc()
    //     setshowModalAddProducts(false);
    //     getProducts();
    //   }
    //   }catch (error) {
    // console.error('Error adding product to Firestore:', error);
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
                onChange={(e) => {
                  e.preventDefault();
                  setName(e.target.value);
                }}
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
                onChange={(e) => {
                  e.preventDefault();
                  setBuyingPrice(e.target.value);
                }}
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
                onChange={(e) => {
                  e.preventDefault();
                  setSellingPrice(e.target.value);
                }}
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
                onChange={(e) => {
                  e.preventDefault();
                  setQuantity(e.target.value);
                }}
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
                onChange={(e) => {
                  e.preventDefault();
                  setCategory(e.target.value);
                }}
                className="form-textarea border border-gray-300 rounded p-2 mt-1 block w-full"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                onChange={(e) => {
                  e.preventDefault();
                  setDescription(e.target.value);
                }}
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
                onChange={(e) => {
                  e.preventDefault();
                  setImage(e.target.value);
                }}
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

export default ModalAddProduct;
