import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/cartContext";
import { CheckoutContext } from "../context/CheckoutContext";

const Review = () => {
  const { items, totalAmount, setTotalAmount, calculateTotal } =
    useContext(CartContext);
  const { address, paymentMethod, state } = useContext(CheckoutContext);
  const [loading, setLoading] = useState(true);
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const total = calculateTotal(items);
    setTotalAmount(total);
    setLoading(false);
    const urls = items.map((item) => {
      const image = new Image();
      image.src = `data:image/jpeg;base64,${item.image_data}`;
      return image.src;
    });

    setImageUrls(urls);
  }, [loading, items]);

  return (
    <div className="bg-white p-4 rounded-md shadow-sm">
      <div className="flex justify-between">
        <h3 className="text-lg font-medium mb-4">Order summary</h3>
        <div className="flex justify-between">
          <h1>Quantity</h1>
          <h1 className="ml-2">Price</h1>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        {items.map((product, index) => (
          <div
            key={index}
            className="grid grid-cols-3 items-center justify-between py-2 border-b border-gray-200"
          >
            <div className="col-span-2 flex items-center space-x-4">
              <img
                src={imageUrls[index]}
                alt={product.name}
                className="w-16 h-16 object-contain"
              />
              <h4 className="text-gray-700 font-medium">{product.name}</h4>
            </div>
            <div className="col-span-1 flex justify-end space-x-2">
              <span className="text-gray-500 mr-8">{product.quantity}</span>
              <span className="text-gray-700 font-medium">{product.price}</span>
            </div>
          </div>
        ))}
        <div className="flex items-center justify-between py-2">
          <span className="text-gray-500">Total</span>
          <span className="text-gray-700 font-medium">{totalAmount}</span>
        </div>
      </div>
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
