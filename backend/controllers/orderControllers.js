import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Placing orders for users
const placeOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { items, amount, address, paymentMethod } = req.body;

    const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const orderData = {
      userId,
      items,
      amount,
      address, // Now properly structured
      orderNumber,
      paymentMethod,
      payment: paymentMethod !== "payondelivery",
      status: "Order Placed",
      date: Date.now(),
    };

    const newOrder = await orderModel.create(orderData);
    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });
    res.json({
      success: true,
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Place Order Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error (Placing Order): " + error.message,
    });
  }
};

// All orders data for Admin panel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.error("All Orders Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error (All Orders): " + error.message,
    });
  }
};

// User Order data for Frontend panel
const userOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.error("User Orders Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error (User Orders): " + error.message,
    });
  }
};

// Update Order status from Admin panel
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status updated successfully" });
  } catch (error) {
    console.error("Update Order Status Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error (Update Order Status): " + error.message,
    });
  }
};

// Delete Order from Admin panel
// const deleteOrder = async (req, res) => {
//   try {
//     const orderId = req.params.id;
//     await orderModel.findByIdAndDelete(orderId);
//     res.json({ success: true, message: "Order deleted successfully" });
//   } catch (error) {
//     console.error("Delete Order Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server Error (Delete Order): " + error.message,
//     });
//   }
// };

// orderControllers.js
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const isAdmin = req.user.role === 'admin'; // Assuming you have role in user model

    // Find the order
    const order = isAdmin 
      ? await orderModel.findById(id)
      : await orderModel.findOne({ _id: id, userId });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found or you don't have permission to delete it"
      });
    }

    // Only allow deletion if order is not shipped/delivered (unless admin)
    if (!isAdmin && order.status !== "Order Placed") {
      return res.status(400).json({
        success: false,
        message: "Cannot delete order that has already been processed"
      });
    }

    await orderModel.findByIdAndDelete(id);
    res.json({
      success: true,
      message: "Order deleted successfully"
    });
  } catch (error) {
    console.error("Delete Order Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error (Deleting Order): " + error.message
    });
  }
};

export { placeOrder, allOrders, userOrders, updateStatus, deleteOrder };
