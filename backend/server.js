import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import productRouter from "./routes/productRoutes.js";
import connectCloudinary from "./config/cloudinary.js";
import orderRouter from "./routes/orderRoutes.js";
import userRouter from "./routes/userRoutes.js";
import cartRouter from "./routes/cartRoutes.js";

// Connect to MongoDB
const app = express();
connectDB();
connectCloudinary();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/users", userRouter);
app.use("/api/cart", cartRouter);

const port = process.env.PORT || 4000;
// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
