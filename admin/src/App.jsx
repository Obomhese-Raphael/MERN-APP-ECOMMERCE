import React, { useEffect, useState } from "react";
import AdminSidebar from "./components/AdminSidebar";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import All from "./pages/All";
import Orders from "./pages/Orders";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "$"


const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );
  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);
  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <div className="flex">
          <AdminSidebar setToken={setToken} />
          <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
            <Routes>
              <Route path="/add-product" element={<Add token={token} />} />
              <Route path="/all-products" element={<All token={token} />} />
              <Route path="/orders" element={<Orders token={token} />} />
              <Route path="/users" element={<Users token={token} />} />
              <Route path="/settings" element={<Settings token={token} />} />
              <Route path="/login" element={<Login setToken={setToken} />} />
            </Routes>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
