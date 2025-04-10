import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// Helper function to upload images to Cloudinary
const uploadImages = async (files) => {
  const images = [
    files?.image1?.[0],
    files?.image2?.[0],
    files?.image3?.[0],
    files?.image4?.[0],
  ].filter(Boolean);

  return Promise.all(
    images.map(async (image) => {
      const result = await cloudinary.uploader.upload(image.path, {
        resource_type: "image",
        folder: "products", // Organize in Cloudinary folder
      });
      return result.secure_url;
    })
  );
};

// Helper function to safely parse sizes
const parseSizes = (sizes) => {
  try {
    if (!sizes) return [];
    return typeof sizes === "string" ? JSON.parse(sizes) : sizes;
  } catch (error) {
    console.error("Error parsing sizes:", error);
    return [];
  }
};

// Function to add a product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    // Validate required fields
    if (!name || !price || !category) {
      return res.status(400).json({
        success: false,
        message: "Name, price and category are required fields",
      });
    }

    // Upload images to Cloudinary
    const imagesUrl = await uploadImages(req.files);

    // Create product data object
    const productData = {
      name,
      description: description || "",
      price: Number(price),
      category,
      subCategory: subCategory || "",
      sizes: parseSizes(sizes),
      bestseller: bestseller === "true",
      image: imagesUrl,
      date: Date.now(),
    };

    // Save to database
    const product = new productModel(productData);
    await product.save();

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.error("Add Product Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error: " + error.message,
      hint: error.message.includes("JSON")
        ? "Check your sizes format (should be valid JSON)"
        : undefined,
    });
  }
};

// Function to list out all the products
const listProducts = async (req, res) => {
  try {
    // TODO: Fetch products from database (e.g., MongoDB find())
    const products = await productModel.find({}); // Example
    res.json({ success: true, products });
  } catch (error) {
    console.error("List Products Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server Error: " + error.message });
  }
};

// Function to get a specific product by its id
const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await productModel.findById(productId);
    if (!product) {
      console.error("No product found for ID:", id);
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Getting Product Details): ", error);
    res.status(500).json({
      success: false,
      message: "Server Error (Getting Product Details)" + error.message,
    });
  }
};

// Function to update a specific product by its id
const updateProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const updateData = req.body;

    // Validate ID and update data (keep your existing validation)

    // Get the current product first
    const currentProduct = await productModel.findById(productId);
    if (!currentProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Handle image updates - merge new with existing
    if (req.files) {
      const newImages = await uploadImages(req.files);
      updateData.image = [...currentProduct.image, ...newImages]; // Merge arrays

      updateData.image = [...new Set([...currentProduct.image, ...newImages])];
    }

    // Perform the update
    const updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Update Product Error: ", error);

    let errorMessage = "Server Error";
    if (error.name === "ValidationError") {
      errorMessage = "Validation Falied: " + error.message;
    }

    res.status(500).json({
      success: false,
      message: errorMessage,
      errorDetails: error.message,
    });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({
        succes: false,
        message: "Product not found",
      });
    }

    await productModel.findByIdAndDelete(productId);

    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Delete Product Error", error);
    res.status(500).json({
      success: false,
      message: "Error deleting product",
      error: error.message,
    });
  }
};

export { addProduct, listProducts, getProductById, updateProductById, deleteProductById };
