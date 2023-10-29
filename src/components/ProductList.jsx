import React, { useEffect, useState } from "react";

import {
  getDocs,
  where,
  orderBy,
  limit,
  query,
  collection,
} from "firebase/firestore";

import { db } from "../config/FirebaseConfig";

const ProductList = () => {
  const id = localStorage.getItem("userId");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getProducts() {
      const productsRef = collection(db, "Products");
      const q = query(productsRef, where("shop_id", "==", id));

      try {
        const querySnapshot = await getDocs(q);
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(productsData);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }

    getProducts();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id} className="mb-2">
            {product.productName} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
