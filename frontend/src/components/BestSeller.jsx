import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { productList } = useContext(ShopContext);
  const [bestseller, setBestseller] = useState([]);

  useEffect(() => {
    // Corrected filter condition:
    const bestProduct = productList.filter((item) => item.bestseller === true);
    setBestseller(bestProduct);
  }, [productList]);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"Shop"} text2={"Our Icons"} />
        <p className="text-sm w-3/4 font-normal text-center m-auto sm:text-sm md:text-base">
          Discover our best-selling products.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestseller.slice(0, 5).map((item, index) => ( 
          <ProductItem
            key={index}
            id={item._id}
            image={item.image[0]}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;