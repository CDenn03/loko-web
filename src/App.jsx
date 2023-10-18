import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/auth/SignIn";
import Products from "./pages/Products";
import VerifyOtp from "./pages/auth/VerifyOtp";

function App() {
  const [session, setSession] = useState(null);

  // Simulate session setup, e.g., using a useEffect
  useEffect(() => {
    // You should implement your authentication logic here to set the session.
    // For this example, let's assume session is set based on authentication.
    // Replace this with your actual authentication logic.
    const isAuthenticated = () => {};
    if (isAuthenticated) {
      setSession(/* Your session data */);
    } else {
      setSession(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route
          path="/signin"
          element={session ? <Navigate to="/" /> : <SignIn />}
        />
        <Route path="/verify" element={<VerifyOtp />} />
        <Route
          path="/products"
          element={session ? <Products /> : <Navigate to="/signin" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
