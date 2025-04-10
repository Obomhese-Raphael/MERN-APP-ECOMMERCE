import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  // 1. Get token from Authorization header
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    console.error("Token is MISSING"); // Debug line
    return res.status(401).json({
      success: false,
      message: "No token provided.",
    });
  }

  try {
    // 4. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 5. Attach user to request object (not req.body)
    req.user = {
      _id: decoded.id,
      // Add other user properties you might need:
      isAdmin: decoded.isAdmin || false,
    };

    next();
  } catch (error) {
    console.error("Authentication Error:", error);

    // 6. Handle different JWT errors specifically
    let statusCode = 401;
    let message = "Not authorized - invalid token";

    if (error.name === "TokenExpiredError") {
      message = "Session expired - please login again";
    } else if (error.name === "JsonWebTokenError") {
      message = "Invalid token - please login again";
    } else {
      statusCode = 500;
      message = "Authentication failed";
    }

    res.status(statusCode).json({
      success: false,
      message,
      // Only show stack in development
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export default authUser;
