import React, { useContext } from "react";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { ShopContext } from "../context/ShopContext";

const LatestCollection = () => {
  const { productList } = useContext(ShopContext);
  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"ARRIVALS"} />
        <p className="text-sm w-3/4 font-normal text-center m-auto sm:text-sm md:text-base">
          These are the Latest arrivals on the Shoes available on the market
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {productList.slice(0, 5).map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
