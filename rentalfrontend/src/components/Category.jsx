import React from "react";

const Category = ({ item }) => {
  return (
    <div className="flex-1 m-2 shadow-lg rounded-md overflow-hidden relative mobile: flex-col">
      <img src={item.src} className="w-[100px] h-[100px]" alt="category_img" />
      <div className="flex relative w-[100%] h-[100%]  items-center justify-center">
        <h2 className="text-purple-700 font-medium text-[25px]">
          {item.title}
        </h2>
        <buttton className="btn ml-3">See more</buttton>
      </div>
    </div>
  );
};

export default Category;
