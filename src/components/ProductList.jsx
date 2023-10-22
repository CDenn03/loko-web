import React, { useEffect, useState } from "react";

import { getDocs, where, orderBy, limit, query } from "firebase/firestore";
import { db } from "../config/FirebaseConfig";
import { useData } from "../../context/DataProvider";

const ProductList = () => {
  const { id } = useData();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      const productsRef = collection(db, "Products");
      const q = query(productsRef, where("shop_id", "==", id));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        console.log("one");
      });
      console.log("two");
      const productsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts(productsData);
    }

    getProducts(); // Call the function to fetch products.
  }, []); // Use an empty dependency array to run this effect only once.

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id} className="mb-2">
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
