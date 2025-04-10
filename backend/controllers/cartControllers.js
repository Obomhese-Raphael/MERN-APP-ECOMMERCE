import userModel from "../models/userModel.js";

// add products to user cart
const addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { itemId, size } = req.body;
    const userData = await userModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    let cartData = await userData.cartData;
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Product added to cart" });
  } catch (error) {
    console.error("Add to Cart Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error (add item to cart): " + error.message,
    });
  }
};

// update quantity of products in user cart
const updateCartItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const { size, itemId, quantity } = req.body;
    const userData = await userModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    let cartData = await userData.cartData;

    cartData[itemId][size] = quantity;
    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Cart Updated" });
  } catch (error) {
    console.error("Update Cart Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error (update cart): " + error.message,
    });
  }
};

// get user cart data
const getUserCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const userData = await userModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    let cartData = await userData.cartData;
    res.json({ success: true, cartData });
  } catch (error) {
    console.error("Get Cart Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error (get cart): " + error.message,
    });
  }
};

// remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { itemId, size } = req.body;
    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!itemId) {
      return res.status(400).json({
        success: false,
        message: "Product ID (itemId) is required",
      });
    }

    let cartData = userData.cartData;

    // If size is specified, remove that specific size variant
    if (size) {
      if (cartData[itemId] && cartData[itemId][size]) {
        delete cartData[itemId][size];

        // If no sizes left for this item, remove the entire item
        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId];
        }
      }
    }
    // If no size specified, remove the entire item
    else if (cartData[itemId]) {
      delete cartData[itemId];
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({
      success: true,
      message: "Item removed from cart",
      userData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error (remove from cart): " + error.message,
    });
  }
};

// clearCart - updated to use userData's cartData
const clearCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Set cartData to empty object
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({
      success: true,
      message: "Cart cleared successfully",
      userData,
      cartData: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error (clear cart): " + error.message,
    });
  }
};

export { addToCart, updateCartItem, getUserCart, clearCart, removeFromCart };
