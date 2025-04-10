import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import { toast } from "react-toastify";

const Orders = () => {
  const { currency, backendUrl, token } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);  

  const loadOrderData = async () => {
    try {
      if (!token) {
        setLoading(false);
        return;
      }

      setLoading(true);
      const response = await axios.get(backendUrl + "/api/orders/user-orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error(error.response?.data?.message || "Error fetching orders");
    } finally { 
      setLoading(false);
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      if (window.confirm("Are you sure you want to cancel this order?")) {
        const response = await axios.delete(
          `${backendUrl}/api/orders/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          toast.success("Order cancelled successfully");
          // Optimistically update UI instead of refetching all orders
          setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      if (error.response?.status === 401) {
        navigate('/login');
      }
      toast.error(error.response?.data?.message || "Error cancelling order");
    }
  };


  useEffect(() => {
    loadOrderData(); 
  }, [token, backendUrl]); 

  if (loading) {
    return (
      <div className="border-t pt-16 flex justify-center items-center h-64">
        <div className="text-center">
          <p>Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="border-t pt-16 flex justify-center items-center h-64">
        <div className="text-center">
          <p>Please login to view your orders</p>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="border-t pt-16 flex justify-center items-center h-64">
        <div className="text-center">
          <p>You have no orders yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>
      
      <div className="space-y-8">
        {orders.map((order) => (
          <div key={order._id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-medium">Order #{order.orderNumber}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(order.date).toLocaleDateString()} • {order.status}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">
                  {currency}
                  {order.amount.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">
                  {order.paymentMethod === "payondelivery" 
                    ? "Cash on Delivery" 
                    : "Paid Online"}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {order.items.map((item) => (
                <div
                  key={item.uniqueKey}
                  className="flex items-start gap-4 py-3 border-t"
                >
                  <img 
                    src={item.image} 
                    className="w-16 sm:w-20 object-cover" 
                    alt={item.name} 
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <div className="flex flex-wrap gap-3 mt-1 text-sm text-gray-600">
                      <p>{currency}{item.price}</p>
                      <p>•</p>
                      <p>Qty: {item.quantity}</p>
                      <p>•</p>
                      <p>Size: {item.size}</p>
                    </div>
                  </div>
                  <button
                    className="border px-3 py-1 text-sm rounded hover:bg-gray-50 cursor-pointer"
                    onClick={loadOrderData}
                  >
                    Track
                  </button>
                  {order.status === "Order Placed" && (
                      <button
                        className="border px-3 py-1 text-sm rounded hover:bg-red-50 cursor-pointer text-red-600"
                        onClick={() => deleteOrder(order._id)}
                      >
                        Cancel
                      </button>
                    )}
                </div>
                
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;