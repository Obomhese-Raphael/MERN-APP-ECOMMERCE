import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, updateCartQuantity, removeFromCart } =
    useContext(ShopContext);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0
    );
  };

  const calculateShipping = () => {
    return calculateSubtotal() > 1000 ? 0 : 10;
  };

  const applyPromoCode = () => {
    // Add your promo code logic here
    if (promoCode === "FOREVER") {
      setDiscount(calculateSubtotal() * 0.2);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg mb-4">Your cart is empty</p>
          <Link
            to="/shop"
            className="bg-black text-white px-6 py-3 rounded-md inline-block hover:bg-gray-800"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <div
                  key={item.uniqueKey}
                  className="py-6 flex flex-col sm:flex-row gap-4"
                >
                  <div className="w-32 h-32 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="text-lg font-medium">{item.name}</h3>
                      <button
                        onClick={() => removeFromCart(item.uniqueKey)}
                        className="text-gray-500 cursor-pointer hover:text-red-500"
                      >
                        Remove
                      </button>
                    </div>

                    <p className="text-gray-600 mt-1">
                      Size: {item.size || "UK 8"}
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button
                          onClick={() =>
                            updateCartQuantity(
                              item.uniqueKey,
                              (item.quantity || 1) - 1
                            )
                          }
                          className="px-3 py-1 text-lg hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="px-3">{item.quantity || 1}</span>
                        <button
                          onClick={() =>
                            updateCartQuantity(
                              item.uniqueKey,
                              (item.quantity || 1) + 1
                            )
                          }
                          className="px-3 py-1 text-lg hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>

                      <p className="text-lg font-medium">
                        $
                        {(item.price * (item.quantity || 1)).toLocaleString(
                          undefined,
                          {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-gray-50 p-6 rounded-lg sticky top-4">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${calculateSubtotal().toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${calculateShipping().toFixed(2)}</span>
                </div>

                <div className="flex justify-between border-t border-gray-200 pt-3">
                  <span className="font-medium">Total</span>
                  <span className="font-bold">
                    $
                    {(
                      calculateSubtotal() +
                      calculateShipping() -
                      discount
                    ).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="promo-code"
                  className="block text-sm font-medium mb-1"
                >
                  Promo Code
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="promo-code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-l-md px-3 py-2"
                    placeholder="Enter code"
                  />
                  <button
                    onClick={applyPromoCode}
                    className="bg-gray-800 text-white px-4 py-2 rounded-r-md hover:bg-gray-700"
                  >
                    Apply
                  </button>
                </div>
              </div>

              <Link to={"/checkout"}>
                <button className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 mb-4 cursor-pointer">
                  Proceed to Checkout
                </button>
              </Link>

              <p className="text-sm text-gray-500 text-center">
                or{" "}
                <Link to="/shop" className="text-blue-600 hover:underline">
                  Continue Shopping
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
