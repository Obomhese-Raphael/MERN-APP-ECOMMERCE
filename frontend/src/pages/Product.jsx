import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import assets from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import Loader from "../../../admin/src/pages/Loader";

const Product = () => {
  const { productList, currency, addToCart } = useContext(ShopContext);
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [sizeError, setSizeError] = useState(false);

  const fetchProductDetails = async () => {
    const product = productList.find((p) => p._id === productId);
    setProductDetails(product);
    setImage(product.image[0]);
    return;
  };

  useEffect(() => {
    fetchProductDetails();
  }, [productId, productList]);

  if (!productDetails) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    )
  }

  return productDetails ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Images */}
        <div className="flex flex-1 flex-col-reverse sm:flex-row gap-3">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productDetails.image.map((image, index) => (
              <img
                src={image}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt=""
                onClick={() => setImage(image)}
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%] relative">
            {/* Main product image */}
            <img src={image} className="w-full h-auto" alt="" />
            <div className="absolute bottom-4 right-4 flex gap-2 mb-5">
              {/* Left arrow button */}
              <button
                className="bg-white/80 hover:bg-white text-black p-4 cursor-pointer rounded-full shadow-md transition-all"
                onClick={() => {
                  // Logic to go to previous image
                  const currentIndex = productDetails.image.findIndex(
                    (img) => img === image
                  );
                  const prevIndex =
                    (currentIndex - 1 + productDetails.image.length) %
                    productDetails.image.length;
                  setImage(productDetails.image[prevIndex]);
                }}
              >
                <FaArrowLeft />
              </button>

              {/* Right arrow button */}
              <button
                className="bg-white/80 hover:bg-white text-black p-4 cursor-pointer rounded-full shadow-md transition-all"
                onClick={() => {
                  // Logic to go to next image
                  const currentIndex = productDetails.image.findIndex(
                    (img) => img === image
                  );
                  const nextIndex =
                    (currentIndex + 1) % productDetails.image.length;
                  setImage(productDetails.image[nextIndex]);
                }}
              >
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
        {/* Product details */}
        <div className="flex-1">
          <h1 className="text-2xl font-medium mt-2 mb-1">
            {productDetails.name}
          </h1>
          <p className="font-normal">{productDetails.category}&apos;s Shoes</p>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} className="w-3 5" alt="" />
            <img src={assets.star_icon} className="w-3 5" alt="" />
            <img src={assets.star_icon} className="w-3 5" alt="" />
            <img src={assets.star_icon} className="w-3 5" alt="" />
            <img src={assets.star_dull_icon} className="w-3 5" alt="" />
            <span className="pl-2">(122)</span>
          </div>
          <p className="text-xl mt-5 font-medium">
            {currency}
            {productDetails.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productDetails.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productDetails.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border font-medium py-2 px-4 bg-gray-100 cursor-pointer ${
                    item === size ? "border-orange-500" : ""
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
            {sizeError && (
                <p className="text-red-500 text-sm mt-1">
                  Please select a size
                </p>
              )}
          </div>

          <div className="flex flex-col gap-2 w-[60%]">
            <button
              className="bg-black text-white px-8 py-3 text-sm active:bg-gray-800 cursor-pointer rounded-3xl"
              onClick={() => {
                if (!size) {
                  setSizeError(true);
                  return;
                }
                addToCart(productDetails, size, image);
                setSizeError(false);
              }}
            >
              Add to Bag
            </button>
            <button className="text-black px-8 py-3 text-sm active:bg-gray-100 cursor-pointer justify-center border rounded-3xl flex items-center">
              <CiHeart className="mr-2" size="1em" /> Favourite
            </button>
          </div>
        </div>
      </div>
      {/* Description & Review Section */}
      <div className="mt-20">
        <div className="flex">
          <p className="border px-5 text-sm py-3 font-semibold">Description</p>
          <p className="border px-5 text-sm py-3">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-900">
          <p>
            Step into next-level comfort with the {productDetails.name},
            featuring responsive Air cushioning and a lightweight mesh upper.
            Perfect for performance or street style.
            <span className="flex flex-col gap-2 mt-5">
              <span>
                ✔ Revolutionary Air Cushioning: Adaptive dual-pressure air units
                for ultra-responsive comfort.
              </span>
              <span>
                ✔ Lightweight Breathability: Engineered mesh upper keeps your
                feet cool and supported.
              </span>
              <span>
                ✔ Street-Ready Style: Sleek silhouette with bold color accents
                for standout looks.
              </span>
            </span>
          </p>
        </div>
      </div>
      {/* Related Products */}
      <RelatedProducts
        category={productDetails.category}
        subCategory={productDetails.subCategory}
      />
    </div>
  ) : (
    "No product"
  );
};

export default Product;
