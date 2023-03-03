import React from "react";
import { useContext } from "react";
import { productsContext } from "../context/productsContext";
import Product from "./Product";

const Products = () => {
  const container = {
    hidden: {
      opacity: 0,
      scale: 0,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };
  const {products} = useContext(productsContext);
  return (
    <>
    <div className="flex justify-center items-center text-2xl font-bold mt-32">Our Popular <span className="text-Teal m-2"> Books</span></div>
    <div className="mt-12 overflow-x-hidden w-full  relative">
      <div className="flex gap-8 md:w-full sm:w-[170%] xs:w-[340%] w-[480%] animate-slide">
      {products.map((product, index) => (
        <Product item={product} key={index} />
      ))}
        </div>
      </div>
    </>
  );
};

export default Products;
