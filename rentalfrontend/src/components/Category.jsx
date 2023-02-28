import React from "react";
import { useNavigate } from "react-router-dom";
const Category = ({ item }) => {
  const image = new Image();
  image.src = `data:image/jpeg;base64,${item.image}`;
  const navigate = useNavigate();
  const value = item.categoryvalue;
  return (
    <div className="flex-1 m-2 shadow-lg rounded-md overflow-hidden relative mobile: flex-col">
      <img src={image.src} className="w-[100px] h-[100px]" alt="category_img" />
      <div className="flex relative w-[100%] h-[100%]  items-center justify-center">
        <h2 className="text-purple-700 font-medium text-[25px]">
          {item.title}
        </h2>
        <button className="btn ml-3" onClick={() => navigate("/category")}>
          See more
        </button>
      </div>
    </div>
  );
};

export default Category;
