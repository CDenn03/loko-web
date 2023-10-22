import { collection, getDocs, query, where } from "firebase/firestore";
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

    const productsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setProducts(productsData);
    console.log(products);
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
        {/* <h1 className="text-2xl  font-bold mb-4">Product List</h1> */}
        <div className="container shadow-lg mx-auto p-4 bg-white">
          <table className="w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Buying Price</th>
                <th>Selling Price</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.prodStock}</td>
                  <td>{product.prodBuying}</td>
                  <td>{product.prodSelling}</td>
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
