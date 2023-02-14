import React from "react";
import { ApiTopPropduct } from "../Api/TopProductsApi";
import Product from "./Product";
const Products = ({ onCounterChange, totalCounter, totalCountChange }) => {
  return (
    <div className="p-5 flex flex-wrap">
      {ApiTopPropduct.map((product, index) => (
        <Product
          item={product}
          key={index}
          onChange={onCounterChange}
          totalCounter={totalCounter}
          totalCountChange={totalCountChange}
        />
      ))}
    </div>
  );
};

export default Products;
