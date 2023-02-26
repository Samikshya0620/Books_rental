import React from "react";
import { ApiCategories } from "../Api/CategoryApi";
import { useContext } from "react";
import { productsContext } from "../context/productsContext";

import Category from "./Category";
const Categories = () => {
  const {categories} = useContext(productsContext);
  return (
    <div className="flex justify-between items-center p-5 mobile:flex-col">
      {categories.map((category, index) => (
        <Category item={category} key={index} />
      ))}
    </div>
  );
};

export default Categories;
