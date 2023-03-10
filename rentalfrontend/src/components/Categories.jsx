import React from "react";
import { ApiCategories } from "../Api/CategoryApi";
import { useContext } from "react";
import { productsContext } from "../context/productsContext";
import { motion } from "framer-motion";

import Category from "./Category";
const Categories = () => {
  const { categories } = useContext(productsContext);
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
  return (
    <div className="w-full items-center justify-center" id="courses">
      <div className="text-center">
        <div className="sm:text-3xl text-2xl font-bold mt-5 mb-5">
          Our Top <span className="text-Teal">Categories</span>
        </div>
        {/*         <p className="text-sm text-gray leading-7 max-w-[700px] mx-auto">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
          tempora illo laborum ex cupiditate tenetur doloribus non velit atque
          amet repudiandae ipsa modi numquam quas odit optio, totam voluptate
          sit! Lorem ipsum dolor sit amet.
        </p> */}
      </div>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        className="grid md:grid-cols-4 sm:grid-cols-2 mt-12 gap-8"
      >
        {" "}
        {categories.map((category, index) => (
          <Category item={category} key={index} />
        ))}
      </motion.div>
    </div>
  );
};

export default Categories;
