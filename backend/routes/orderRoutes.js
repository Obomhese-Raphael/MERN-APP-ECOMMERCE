import express from "express";
import {
  allOrders,
  deleteOrder,
  placeOrder,
  updateStatus,
  userOrders,
} from "../controllers/orderControllers.js";
import authUser from "../middlewear/authUser.js";
import adminAuth from "../middlewear/adminAuth.js";

const orderRouter = express.Router();

orderRouter.post("/place", authUser, placeOrder);
orderRouter.get("/user-orders", authUser, userOrders);
orderRouter.get("/all-orders", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);
orderRouter.delete("/admin/:id", adminAuth, deleteOrder);
orderRouter.delete("/:id", authUser, deleteOrder);

export default orderRouter;
