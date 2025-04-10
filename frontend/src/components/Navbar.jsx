import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import assets from "../assets/assets";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { getTotalCartCount, token, setToken } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to={"/"}>
        <img src={assets.logo} alt="" className="w-30" />
      </Link>
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to={"/"} className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to={"/shop"} className="flex flex-col items-center gap-1">
          <p>SHOP</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to={"/about"} className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to={"/contact"} className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-6">
        <div>
          <Link to={"/orders"}>
            <img
              src={assets.orders_icon}
              className="w-10 cursor-pointer"
              alt=""
            />
          </Link>
        </div>

         <div className="group relative">
          <img
            onClick={() => (token ? null : navigate("/login"))}
            src={assets.profile_icon}
            className="w-5 cursor-pointer"
            alt=""
          />
          {/* Dropdown Menu for Login */}
          {token && (
            <div
              className="group-hover:block hidden absolute dropdown-menu right-0 pt-4
            "
            >
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                <p className="cursor-pointer hover:text-black">My Profile</p>
                <p onClick={() => navigate("/orders")} className="cursor-pointer hover:text-black">Orders</p>
                <p className="cursor-pointer hover:text-black" onClick={logout}>
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>

        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="Cart" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getTotalCartCount()}
          </p>
        </Link>

        <img
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt="Menu"
          onClick={() => setVisible(!visible)}
        />
      </div>
      {/* MENU LINK FOR SMALL SCREENS */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all z-50 ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(!visible)}
            className="flex items-center gap-4 p-5 cursor-pointer"
          >
            <img
              src={assets.dropdown_icon}
              className="h-4 rotate-180 text-black"
              alt=""
            />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(!visible)}
            className={"py-5 pl-6 border"}
            to={"/"}
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(!visible)}
            className={"py-5 pl-6 border"}
            to={"/shop"}
          >
            SHOP
          </NavLink>
          <NavLink
            onClick={() => setVisible(!visible)}
            className={"py-5 pl-6 border"}
            to={"/about"}
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisible(!visible)}
            className={"py-5 pl-6 border"}
            to={"/contact"}
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
