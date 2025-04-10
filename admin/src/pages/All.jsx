import axios from "axios";
import React from "react";
import { useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Loader from "./Loader";

const All = ({ token }) => {
  const [allProducts, setAllProducts] = useState([]);
  const currency = "$";
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/products/list");
      if (response.data.success) {
        setAllProducts(response.data.products);
        setLoading(false);
      } else {
        console.error("Failed to fetch products", response.data.message);
        toast.error("Failed to fetch products", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching products: " + error);
      toast.error("Error fetching products: " + error.message);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const response = await axios.delete(
        backendUrl + "/api/products/delete/" + productId,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        toast.success("Product deleted successfully", response.data.message);
        fetchProducts(); // Refresh the product list after deletion
      } else {
        toast.error("Failed to delete product", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting product: " + error);
      toast.error("Error deleting product: " + error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div>
      {loading === true ? (
        <Loader />
      ) : (
        <>
          <p className="mb-2">All Products List</p>
          <div className="flex flex-col gap-2">
            {/* List Table title */}
            <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
              <b>Image</b>
              <b>Name</b>
              <b>Category</b>
              <b>Price</b>
              <b className="text-center">Action</b>
            </div>
            {/* List table attributes */}
            {allProducts.map((product, index) => (
              <div
                key={index}
                className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
              >
                <img className="w-12" src={product.image[0]} alt="" />
                <p>{product.name}</p>
                <p>{product.category}</p>
                <p>
                  {currency}
                  {product.price}
                </p>
                <p
                  className="text-right md:text-center cursor-pointer text-lg"
                  onClick={() => deleteProduct(product._id)}
                >
                  X
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default All;
All;
