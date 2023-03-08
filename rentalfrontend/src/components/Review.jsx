import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/cartContext";
import { CheckoutContext } from "../context/CheckoutContext";

const Review = () => {
  const { items, totalAmount, setTotalAmount, calculateTotal } = useContext(
    CartContext
  );
  const { address, paymentMethod, state } = useContext(CheckoutContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const total = calculateTotal(items);
    setTotalAmount(total);
    setLoading(false);
  }, [loading]);

  return (
    <div className="bg-white p-4 rounded-md shadow-sm">
      <div className="flex justify-between">
      <h3 className="text-lg font-medium mb-4">Order summary</h3>
      <div className="flex justify-between">
      <h1>Quantity</h1>
      <h1 className="ml-2">Price</h1>
      </div>
      </div>
      <ul className="divide-y divide-gray-200">
        {items.map((product, index) => (
          <li key={index} className="py-2">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-gray-700 font-medium">{product.name}</h4>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-500 mr-10">{product.quantity}</span>
                <span className="text-gray-700 font-medium">{product.price}</span>
              </div>
            </div>
          </li>
        ))}
        <li className="py-2">
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Total</span>
            <span className="text-gray-700 font-medium">{totalAmount}</span>
          </div>
        </li>
      </ul>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <h4 className="text-lg font-medium mb-2">Shipping</h4>
          <p className="text-gray-700">{address}</p>
          <p className="text-gray-500">{state}</p>
        </div>
        <div>
          <h4 className="text-lg font-medium mb-2">Payment details</h4>
          <p className="text-gray-700">{paymentMethod}</p>
        </div>
      </div>
    </div>
  );
};

export default Review;
