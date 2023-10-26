import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
  Link,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import ProductList from "./pages/Products";
import Profile from "./pages/Profile";
import SignIn from "./pages/auth/SignIn";
import VerifyOtp from "./pages/auth/VerifyOtp";

function App() {
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    // Check if userId is not stored and if on a protected route, then navigate to the sign-in route.
    if (
      !userId &&
      (window.location.pathname === "/products" ||
        // window.location.pathname === "/profile" ||
        window.location.pathname === "/verify")
    ) {
      // navigate("/signin");
      <Navigate to="/signin" replace />;
    }
  }, [userId]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/verify" element={<VerifyOtp />} />
        <Route
          path="/products"
          element={userId ? <ProductList /> : <Navigate to="/signin" />}
        />
        <Route
          path="/profile"
          element={<Profile />}
          // element={userId ? <Profile /> : <Navigate to="/signin" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
