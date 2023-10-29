import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import ProductList from "./pages/Products";
import Profile from "./pages/Profile";
import SignIn from "./pages/auth/SignIn";
import VerifyOtp from "./pages/auth/VerifyOtp";

function App() {
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    // if (!userId) {
    //   if (
    //     window.location.pathname === "/products" ||
    //     window.location.pathname === "/verify"
    //   ) {
    //     navigate("/signin");
    //   }
    // }
  }, [userId]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/verify" element={<VerifyOtp />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
