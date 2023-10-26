import { collection, getDocs, query, where } from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import ModalAddProduct from "../components/modal/ModalAddProduct";
import { db } from "../config/FirebaseConfig";
import { useData } from "../context/DataProvider";

const ProductList = () => {
  const { id } = useData();

  const [products, setProducts] = useState([]);

  const [showModalAddProducts, setshowModalAddProducts] = useState(false);

  async function getProducts() {
    const productsRef = collection(db, "Products");
    const q = query(productsRef, where("shop_id", "==", id));

    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);
    const productsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setProducts(productsData);
    console.log(id);
    console.log("gap");
    console.log(products);
    console.log("gap 2");
    console.log(productsData);
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="flex w-full">
      <Topbar />
      <Sidebar />
      <div className=" bg-slate-100 w-screen">
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
            <tbody className="">
              {products?.map((product) => (
                <tr key={product.id}>
                  <td className=" w-1/5  ">
                    <div className="border border-white rounded-lg p-2 ">
                      {product.prodName}
                    </div>
                  </td>
                  <td className="w-1/5">
                    <div className="border border-white rounded-lg p-2">
                      {product.prodStock}
                    </div>
                  </td>
                  <td className="w-1/5">
                    <div className="border border-white rounded-lg p-2">
                      {product.prodBuying}
                    </div>
                  </td>
                  <td className="w-1/5 ">
                    <div className="border border-white rounded-lg p-2">
                      {product.prodSelling}
                    </div>
                  </td>
                  <td className="w-1/5">
                    <div className="flex px-10 justify-center p-2 ">
                      <button
                        onClick={() => handleEditProduct(product.id)} // Define the edit action
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)} // Define the delete action
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
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
      />
    </div>
  );
};

export default ProductList;
