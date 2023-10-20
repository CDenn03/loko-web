import React, { useEffect, useState } from "react";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import { db } from "../config/FirebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import ModalAddProduct from "../components/modal/ModalAddProduct";
import { useData } from "../../context/DataProvider";

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
      <div className="w-full">
        <div className="pt-24 py-4 bg-yellow-50 w-full">
          <span className="p-4 text-3xl">Products List</span>
          <div className="text-right pr-4">
            <button
              onClick={() => setshowModalAddProducts(true)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Product
            </button>
          </div>
        </div>

        <div className="container mx-auto p-4 bg-orange-600">
          <h1 className="text-2xl font-semibold mb-4">Product List</h1>
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
