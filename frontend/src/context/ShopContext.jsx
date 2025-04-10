import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [productList, setProductList] = useState([]);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [token, setToken] = useState("");
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);
  
  const addToCart = (
    item,
    selectedSize = null,
    selectedImage = null,
    quantity = 1
  ) => {
    setCartItems((prevItems) => {
      // Create unique key combining ID, size and image URL
      const uniqueKey = `${item.id}-${selectedSize}-${selectedImage}`;

      const existingItemIndex = prevItems.findIndex(
        (cartItem) => cartItem.uniqueKey === uniqueKey
      );

      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        };
        return updatedItems;
      } else {
        return [
          ...prevItems,
          {
            ...item,
            uniqueKey, // Store the unique identifier
            image: selectedImage, // Store the exact selected image
            size: selectedSize,
            quantity: quantity,
            addedAt: new Date().toISOString(),
          },
        ];
      }
    });
  };

  const removeFromCart = (uniqueKey) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.uniqueKey !== uniqueKey)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const updateCartQuantity = (uniqueKey, newQuantity) => {
    setCartItems((prevItems) => {
      if (newQuantity < 1) {
        return prevItems.filter((item) => item.uniqueKey !== uniqueKey);
      }

      return prevItems.map((item) =>
        item.uniqueKey === uniqueKey ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  const getTotalCartCount = () => {
    return cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
  };

  const getTotalCartValue = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0
    );
  };

  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("orders");
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  const getProducts = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/products/list");
      if (response.data.success) {
        setProductList(response.data.products);
      } else {
        console.error("Failed to fetch products:", response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Error fetching products. Please try again later.");
    }
  };

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  useEffect(() => {
    getProducts();
  }, []);

  const value = {
    products: productList,
    productList,
    setProducts: setProductList,
    currency,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getTotalCartCount,
    removeFromCart,
    clearCart,
    updateCartQuantity,
    getTotalCartValue,
    orders,
    setOrders,
    token,
    setToken,
    backendUrl,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
