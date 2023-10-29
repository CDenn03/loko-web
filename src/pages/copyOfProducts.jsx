import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import ModalAddProduct from "../components/modal/ModalAddProduct";
import { db } from "../config/FirebaseConfig";

import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  deleteDoc,
} from "@firebase/firestore";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const ProductList = () => {
  const id = localStorage.getItem("userId");

  const shopID = localStorage.getItem("userId");

  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showModalAddProducts, setshowModalAddProducts] = useState(false);

  async function getProducts() {
    const productsRef = collection(db, "Products");
    const q = query(productsRef, where("shop_id", "==", shopID));

    const querySnapshot = await getDocs(q);
    const productsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setProducts(productsData);
  }

  const handleEditProduct = (productId) => {
    setEditingProduct(productId);
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const productDocRef = doc(db, "Products", productId);
        await deleteDoc(productDocRef);
        getProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const showDeleteConfirmation = (productId) => {
    confirmAlert({
      title: "Confirm Deletion",
      message: "Are you sure you want to delete this product?",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleDeleteProduct(productId),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const handleSaveProduct = async (productId, updatedData) => {
    const productDocRef = doc(db, "Products", productId);

    try {
      await updateDoc(productDocRef, updatedData);
      setEditingProduct(null);
      getProducts();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="flex w-full">
      <Topbar />
      <Sidebar />
      <div className="bg-slate-100 w-screen">
        <div className="pt-24 py-4">
          <span className="p-4 font-bold text-3xl">Products List</span>
          <div className="text-right pr-4">
            <button
              onClick={() => setshowModalAddProducts(true)}
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Product
            </button>
          </div>
        </div>

        <div className="container mx-auto p-4 bg-[#ece3b6]">
          <h1 className="text-2xl font-semibold mb-4">Product List</h1>
          <table className="w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Buying Price</th>
                <th>Selling Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product) => (
                <tr key={product.id}>
                  <td className="w-1/5">
                    <div className="border border-white rounded-lg p-2">
                      {editingProduct === product.id ? (
                        <input
                          type="text"
                          value={product.name || ""}
                          onChange={(e) => {
                            const updatedProduct = {
                              ...product,
                              name: e.target.value,
                            };
                          }}
                        />
                      ) : (
                        <span>{product.name}</span>
                      )}
                    </div>
                  </td>
                  <td className="w-1/5">
                    <div className="border border-white rounded-lg p-2">
                      {editingProduct === product.id ? (
                        <input
                          type="text"
                          value={product.quantity}
                          onChange={(e) => {
                            e.preventDefault();
                            setEmail(e.target.value);
                          }}
                        />
                      ) : (
                        <span>{product.quantity}</span>
                      )}
                    </div>
                  </td>
                  <td className="w-1/5">
                    <div className="border border-white rounded-lg p-2">
                      {editingProduct === product.id ? (
                        <input
                          type="text"
                          value={product.buyingPrice}
                          onChange={(e) => {
                            e.preventDefault();
                            setEmail(e.target.value);
                          }}
                        />
                      ) : (
                        <span>{product.buyingPrice}</span>
                      )}
                    </div>
                  </td>
                  <td className="w-1/5">
                    <div className="border border-white rounded-lg p-2">
                      {editingProduct === product.id ? (
                        <input
                          type="text"
                          value={product.sellingPrice}
                          onChange={(e) => {
                            e.preventDefault();
                            setEmail(e.target.value);
                          }}
                        />
                      ) : (
                        <span>{product.sellingPrice}</span>
                      )}
                    </div>
                  </td>
                  <td className="w-1/5 p-5">
                    <div className="flex justify-between">
                      {editingProduct === product.id ? (
                        <button
                          onClick={() => handleSaveProduct(product.id, product)}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEditProduct(product.id)}
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                        >
                          Edit
                        </button>
                      )}
                      <button
                        onClick={() => showDeleteConfirmation(product.id)}
                        className="bg-red-500 hover-bg-red-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ModalAddProduct
        showModalAddProducts={showModalAddProducts}
        setshowModalAddProducts={setshowModalAddProducts}
        getProducts={getProducts}
      />
    </div>
  );
};

export default ProductList;
