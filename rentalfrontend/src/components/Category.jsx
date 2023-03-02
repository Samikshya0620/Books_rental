import React from "react";
import { useNavigate } from "react-router-dom";
import {motion} from "framer-motion";

const Category = ({ item }) => {
  const image = new Image();
  image.src = `data:image/jpeg;base64,${item.image}`;
  const navigate = useNavigate();
  const value = item.categoryvalue;
  const itemm = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };
  return (
    <motion.div
    variants={itemm}
    whileHover={{ scale: 1.1 }}
    className="flex items-center flex-col gap-4 bg-white p-8 rounded-md"
  >
      <img src={image.src} className="w-[200px] h-[150px]" alt="category_img" />
      <div className="font-bold">{item.name}</div>
        <button className="btn ml-3" onClick={() => navigate("/category")}>
          View More{" "}
        </button>
        </motion.div>
  );
};

export default Category;
