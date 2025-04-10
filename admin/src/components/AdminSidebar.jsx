import { NavLink } from 'react-router-dom';
import { assets } from "../assets/admin_assets/assets";
import { FaCartPlus } from "react-icons/fa";
import { FaBox } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { PiUsersFill } from "react-icons/pi";
import { IoSettings } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";

const AdminSidebar = ({setToken}) => {
  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Sidebar Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <img src={assets.logo} className="w-[max(10%,80px)]" alt="" />
        <p className="text-sm text-gray-500 mt-1 font-bold">
          admin@forever.com
        </p>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-2 py-4">
        <ul className="space-y-1">
          {/* Add Product */}
          <NavLink to={"/add-product"}> 
            <div className="flex items-center px-4 py-3 text-sm font-medium cursor-pointer text-gray-600 rounded-lg gap-2">
              <FaCartPlus  style={{fontSize: "18px"}} />
              Add Product
            </div>
          </NavLink>
          <hr />

          {/* Products */}
          <NavLink to={"/all-products"}>
            <div className="flex items-center px-4 py-3 text-sm font-medium text-gray-600 cursor-pointer rounded-lg hover:bg-gray-100 gap-3">
              <FaBox style={{fontSize: "18px"}} />
              Products
            </div>
          </NavLink>
          <hr />

          {/* Orders */}
          <NavLink to={"/orders"}>
            <div className="flex items-center px-4 py-3 text-sm font-medium text-gray-600 gap-3 cursor-pointer rounded-lg hover:bg-gray-100">
              <FaShoppingBag />
              Orders
            </div>
          </NavLink>
          <hr />

          {/* Users */}
          <NavLink to={"/users"}>
            <div className="flex items-center px-4 py-3 text-sm font-medium text-gray-600 gap-3 cursor-pointer rounded-lg hover:bg-gray-100">
              <PiUsersFill  style={{fontSize: "18px"}} />
              Users
            </div>
          </NavLink>
          <hr />
        </ul>
      </nav>

      {/* Sidebar Footer */}
      <div className="px-4 py-4 border-t border-gray-200">
        <button onClick={() => setToken("")} className="flex items-center w-full px-4 py-3   text-sm font-medium text-gray-600 gap-3 cursor-pointer rounded-lg hover:bg-gray-100">
         <IoLogOutOutline  style={{fontSize: "20px"}} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
