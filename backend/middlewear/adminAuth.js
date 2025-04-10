import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const adminAuth = async (req, res, next) => {
  try {
    // Get token from Authorization header (consistent with authUser)
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user is admin (using your User model)
    const user = await User.findById(decoded.id);

    if (!user || !user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Admin privileges required",
      });
    }

    next();
  } catch (error) {
    console.error("Admin Authentication Error:", error);
    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export default adminAuth;
