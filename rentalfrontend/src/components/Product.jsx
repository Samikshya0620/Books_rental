import { ShoppingCartOutlined } from "@mui/icons-material";

import React, { useContext, useState } from "react";
import { CartContext } from "../context/cartContext";
import { toast } from "react-toastify";
import { AuthContext } from "../context/authContext";

const Product = ({ item }) => {
  const { user } = useContext(AuthContext);
  const image = new Image();
  image.src = `data:image/jpeg;base64,${item.image}`;
  const { addItem } = useContext(CartContext);
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    addItem(item);
    if (user) {
      toast.success("Added to cart Successfully");
      setClicked(true);
    } else {
      toast.error("You Must Login First");
    }
  };
  return (
    <div className="p-2 shadow-lg min-w-[15rem] bg-white rounded-md m-2">
      <div className="flex justify-center items-center">
        <img src={image.src} alt="" className="w-[200px] h-[200px]" />
      </div>
      <div className="text-sm mt-2 font-bold">{item.name}</div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-Solitude p-1 rounded-full">
            <ShoppingCartOutlined
              className="cursor-pointer hover:scale-125"
              onClick={handleClick}
            />
          </div>
          {/* <div className="text-sm font-bold">Rating</div> */}
        </div>
        <div className="text-sm font-bold">Rs.{item.price}</div>
      </div>
    </div>
  );
};

export default Product;
