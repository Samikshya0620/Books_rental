import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/cartContext";


function Counter({ item }) {
  const {removeItem, addItem} = useContext(CartContext);
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="counter flex items-center text-2xl justify-start">
        Quantity
        <div className="ml-5 shadow-md flex">
          <button onClick={()=> removeItem(item)} className="bg-[#8a4af3] text-white w-8 flex items-center justify-center rounded-l-lg cursor-pointer">
            -
          </button>
          <div className="w-8 flex items-center justify-center border-[1px] border-[#8a4af3]">
            {item.quantity}
          </div>
          <button onClick={()=>addItem(item)} className="bg-[#8a4af3] text-white w-8 flex items-center justify-center rounded-r-lg cursor-pointer">
            + </button> 
  
        </div>
      </div>
{/*       <div className="counter flex items-center text-2xl justify-start mt-2">
        Months
        <div className="ml-5 shadow-md flex">
          <div className="bg-[#8a4af3] text-white w-8 flex items-center justify-center rounded-l-lg cursor-pointer">
            -
          </div>
          <div className="w-8 flex items-center justify-center border-[1px] border-[#8a4af3]">
            1
          </div>
          <div className="bg-[#8a4af3] text-white w-8 flex items-center justify-center rounded-r-lg cursor-pointer">
            +
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default Counter;
