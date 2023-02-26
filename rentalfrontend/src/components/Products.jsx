import React from "react";
import { useContext } from "react";
import { productsContext } from "../context/productsContext";
import Product from "./Product";

const Products = () => {
  const {products} = useContext(productsContext);
  return (
    <div className="p-5 flex flex-wrap">
      {products.map((product, index) => (
        <Product item={product} key={index} />
      ))}
    </div>
  );
};

export default Products;
