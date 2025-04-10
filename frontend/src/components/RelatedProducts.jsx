import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useParams } from "react-router-dom";
import Title from "../components/Title";
import ProductItem from "./ProductItem";

const RelatedProducts = ({ category }) => {
  const { productList } = useContext(ShopContext);
  const { productId } = useParams();
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (productList.length > 0 && category) {
      // Check if category is available
      const related = productList
        .filter((item) => item.category === category && item.id !== productId) // Filter by category and exclude the current product
        .slice(0, 5); // Take the first 5 related products

      setRelatedProducts(related);
    } else {
      setRelatedProducts([]); // Set to empty array if no related products
    }
  }, [productList, category, productId]);

  return (
    <div className="my-24">
      <div className="text-3xl py-2">
        <Title text1={"You Might Also Like"} text2={""} />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-5">
          {relatedProducts.map((product, index) => (
            <ProductItem
              key={index}
              id={product._id}
              image={product.image[0]}
              name={product.name}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;
