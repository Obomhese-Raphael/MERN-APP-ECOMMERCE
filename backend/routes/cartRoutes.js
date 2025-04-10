import express from "express";
import {
  getUserCart,
  addToCart,
  removeFromCart,
  updateCartItem,
  clearCart,
} from "../controllers/cartControllers.js";
import authUser from "../middlewear/authUser.js";

const cartRouter = express.Router();

// Get user's cart
cartRouter.get("/get", authUser, getUserCart);

// Add item to cart
cartRouter.post("/add", authUser, addToCart);

// Clear entire cart
cartRouter.delete("/clear/:userId", authUser, clearCart);

// Remove specific item from cart
cartRouter.delete("/remove", authUser, removeFromCart);

// Update item quantity in cart
cartRouter.put("/update", authUser, updateCartItem);

export default cartRouter;
