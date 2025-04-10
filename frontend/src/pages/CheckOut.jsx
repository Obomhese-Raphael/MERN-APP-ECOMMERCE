import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Checkout = () => {
  const { backendUrl, token } = useContext(ShopContext);
  const { cartItems, clearCart, getTotalCartCount, getTotalCartValue } =
    useContext(ShopContext);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
    paymentMethod: "payondelivery",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const placeOrder = async () => {
    setLoading(true);

    try {
      const address = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country,
        phone: formData.phone,
      };
      const orderData = {
        items: cartItems,
        amount: grandTotal,
        address, // Ensure this matches your backend schema
        paymentMethod: formData.paymentMethod,
        payment: formData.paymentMethod !== "payondelivery", // true if paid, false if COD
      };
      const response = await axios.post(
        `${backendUrl}/api/orders/place`,
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Use "Authorization" header (not "token")
          },
        }
      );

      if (response.data.success) {
        toast.success("Order placed successfully!");
        clearCart();
        setOrderPlaced(true);
      } else {
        toast.error(response.data.message); // Show backend error message
      }
    } catch (error) {
      console.error("Order error:", error.response?.data || error.message);
      toast.error(
        error.response?.data?.message ||
          "Failed to place order. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    placeOrder();
  };

  if (orderPlaced) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
        <p className="text-lg mb-6">
          Thank you for your purchase. Your order has been placed successfully.
        </p>
        <Link
          to="/shop"
          className="bg-black text-white px-6 py-3 rounded-md inline-block hover:bg-gray-800"
        >
          Continue Shopping
        </Link>
        <Link
          to={"/orders"}
          className="bg-gray-200 text-black px-6 py-3 rounded-md inline-block hover:bg-gray-300 ml-4"
        >
          Go to Orders
        </Link>
      </div>
    );
  }

  if (getTotalCartCount() === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <Link
          to="/shop"
          className="bg-black text-white px-6 py-3 rounded-md inline-block hover:bg-gray-800"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  const total = getTotalCartValue();
  const shipping = total > 1000 ? 0 : 10;
  const grandTotal = total + shipping;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Shipping Information */}
        <div className="lg:w-2/3">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-bold mb-6">Shipping Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium mb-1"
                >
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium mb-1"
                >
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="street"
                className="block text-sm font-medium mb-1"
              >
                Street Address *
              </label>
              <input
                type="text"
                id="street"
                name="street"
                value={formData.street}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium mb-1"
                >
                  City *
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="state"
                  className="block text-sm font-medium mb-1"
                >
                  State *
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label htmlFor="zip" className="block text-sm font-medium mb-1">
                  ZIP Code *
                </label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zip}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>

            <h2 className="text-xl font-bold mb-4">Payment Method</h2>
            <div className="space-y-2 mb-6">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === "card"}
                  onChange={handleChange}
                  className="h-4 w-4 text-black focus:ring-black"
                />
                <span>Credit/Debit Card</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="payondelivery"
                  checked={formData.paymentMethod === "payondelivery"}
                  onChange={handleChange}
                  className="h-4 w-4 text-black focus:ring-black"
                />
                <span>Pay on Delivery</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="transfer"
                  checked={formData.paymentMethod === "transfer"}
                  onChange={handleChange}
                  className="h-4 w-4 text-black focus:ring-black"
                />
                <span>Bank Transfer</span>
              </label>
            </div>

            {formData.paymentMethod === "card" && (
              <div className="mb-6">
                <h3 className="font-medium mb-2">Card Details</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Card Number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800"
            >
              Place Order
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-gray-50 p-6 rounded-lg sticky top-4">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="divide-y divide-gray-200 mb-4">
              {cartItems.map((item) => (
                <div key={item.uniqueKey} className="py-3 flex justify-between">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      {item.size} • Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-2 font-bold">
                <span>Total</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <Link
              to="/cart"
              className="text-blue-600 hover:underline text-sm block mb-4"
            >
              ← Back to Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
