import express from "express";
import {
  adminLogin,
  getAllUsers,
  loginUser,
  registerAdmin,
  registerUser,
  verifyToken,
} from "../controllers/userControllers.js";
import authUser from "../middlewear/authUser.js";
import adminAuth from "../middlewear/adminAuth.js";

const userRouter = express.Router();
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin/register", registerAdmin);
userRouter.post("/admin/login", adminLogin);
userRouter.get("/all-users", adminAuth, getAllUsers);

// Add this temporary route to verify tokens
userRouter.get("/verify", authUser, verifyToken);

export default userRouter;
