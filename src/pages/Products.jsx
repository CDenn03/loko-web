import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import ModalAddProduct from "../components/modal/ModalAddProduct";
import { db } from "../config/FirebaseConfig";
import { useData } from "../context/DataProvider";
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from "@firebase/firestore";

const ProductList = () => {
  const { id } = useData();

  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null); // Track the product being edited
  const [showModalAddProducts, setshowModalAddProducts] = useState(false);

  async function getProducts() {
    const productsRef = collection(db, "Products");
    const q = query(productsRef, where("shop_id", "==", id));

    const querySnapshot = await getDocs(q);
    const productsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setProducts(productsData);
    console.log(products);
  }

  const handleEditProduct = (productId) => {
    setEditingProduct(productId);
  };

  const handleSaveProduct = async (productId, updatedData) => {
    const productDocRef = doc(db, "Products", productId);

    try {
      await updateDoc(productDocRef, updatedData);
      setEditingProduct(null); // Exit edit mode after saving
      getProducts(); // Refresh the product list after saving
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
                    {editingProduct === product.id ? ( // Check if the product is being edited
                      <input
                        type="text"
                        value={product.name}
                        onChange={(e) =>
                          handleSaveProduct(product.id, {
                            prodName: e.target.value,
                          })
                        }
                      />
                    ) : (
                      product.name
                    )}
                  </td>
                  <td className="w-1/5">
                    {editingProduct === product.id ? (
                      <input
                        type="text"
                        value={product.prodStock}
                        onChange={(e) =>
                          handleSaveProduct(product.id, {
                            prodStock: e.target.value,
                          })
                        }
                      />
                    ) : (
                      product.prodStock
                    )}
                  </td>
                  <td className="w-1/5">
                    {editingProduct === product.id ? (
                      <input
                        type="text"
                        value={product.prodBuying}
                        onChange={(e) =>
                          handleSaveProduct(product.id, {
                            prodBuying: e.target.value,
                          })
                        }
                      />
                    ) : (
                      product.prodBuying
                    )}
                  </td>
                  <td className="w-1/5">
                    {editingProduct === product.id ? (
                      <input
                        type="text"
                        value={product.prodSelling}
                        onChange={(e) =>
                          handleSaveProduct(product.id, {
                            prodSelling: e.target.value,
                          })
                        }
                      />
                    ) : (
                      product.prodSelling
                    )}
                  </td>
                  <td className="w-1/5">
                    {editingProduct === product.id ? (
                      <button
                        onClick={() => handleSaveProduct(product.id, product)} // Save changes
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEditProduct(product.id)} // Enter edit mode
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="bg-red-500 hover-bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Delete
                    </button>
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
      />
    </div>
  );
};

export default ProductList;
