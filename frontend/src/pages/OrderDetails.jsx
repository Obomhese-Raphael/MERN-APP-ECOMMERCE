import React, { useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const OrderDetails = () => {
  const navigate = useNavigate();
  const { orders } = useContext(ShopContext);
  const { orderNumber } = useParams();

  // Find the specific order
  const order = orders.find((order) => order.orderNumber === orderNumber);

  if (!order) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
        <p className="mb-6">
          We couldn't find an order with number: {orderNumber}
        </p>
        <Link
          to="/orders"
          className="bg-black text-white px-6 py-3 rounded-md inline-block hover:bg-gray-800"
        >
          View All Orders
        </Link>
      </div>
    );
  }

  // Calculate order total
  const orderTotal = order.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Link
          to="/orders"
          className="text-blue-600 hover:underline flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Orders
        </Link>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            Order #{order.orderNumber}
          </h1>
          <p className="text-gray-600 mt-1">
            Placed on{" "}
            {new Date(order.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              order.status === "Delivered"
                ? "bg-green-100 text-green-800"
                : order.status === "Shipped"
                ? "bg-blue-100 text-blue-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {order.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-medium">Order Items</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {order.items.map((item, index) => (
                <div key={index} className="p-6 flex">
                  <div className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded object-cover"
                    />
                  </div>
                  <div className="ml-6 flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-medium">{item.name}</h3>
                        <p className="text-gray-600 mt-1">
                          Size: {item.size} • Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="text-lg font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 bg-gray-50 border-t border-gray-200">
              <div className="flex justify-between text-lg font-medium">
                <span>Total</span>
                <span>${orderTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          {/* Shipping Information */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-medium">Shipping Information</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Address</h3>
                  <p className="mt-1">
                    {order.shippingInfo.address}, {order.shippingInfo.city}
                    <br />
                    {order.shippingInfo.state}, {order.shippingInfo.country}
                    <br />
                    {order.shippingInfo.zip}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Contact</h3>
                  <p className="mt-1">
                    {order.shippingInfo.firstName} {order.shippingInfo.lastName}
                    <br />
                    {order.shippingInfo.email}
                    <br />
                    {order.shippingInfo.phone}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-medium">Payment Method</h2>
            </div>
            <div className="p-6">
              <div className="flex items-center">
                <div className="ml-4">
                  <h3 className="text-lg font-medium capitalize">
                    {order.paymentMethod === "payondelivery"
                      ? "Pay on Delivery"
                      : order.paymentMethod === "transfer"
                      ? "Bank Transfer"
                      : "Credit/Debit Card"}
                  </h3>
                  {order.paymentMethod === "card" && (
                    <p className="text-gray-600 mt-1">
                      Card ending in •••• 4242
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Tracking Information */}
          {order.trackingNumber && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-medium">Tracking Information</h2>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Tracking Number</h3>
                    <p className="text-gray-600 mt-1">{order.trackingNumber}</p>
                  </div>
                  <button
                    onClick={() => navigate("/orders")}
                    className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                  >
                    Track Package
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
