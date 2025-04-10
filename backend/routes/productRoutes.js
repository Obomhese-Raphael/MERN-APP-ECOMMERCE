import express from "express";
import {
  addProduct,
  deleteProductById,
  getProductById,
  listProducts,
  updateProductById,
} from "../controllers/productController.js";
import upload from "../middlewear/multer.js";
import adminAuth from "../middlewear/adminAuth.js";

const productRouter = express.Router();

productRouter.post(
  "/add",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);

productRouter.get("/list", listProducts);
productRouter.get("/:productId", getProductById);
productRouter.put(
  "/:productId",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  updateProductById
);
productRouter.delete("/delete/:productId", adminAuth, deleteProductById);

export default productRouter;
