import React, { useEffect } from "react";
import { useState } from "react";

export const CartContext = React.createContext({});

export const CartProvider = (props) => {
  const [items, setItems] = useState([]);
  const [totalCounter, setTotalCounter] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);
    return total;
  };

  const handleAddItem = (item) => {
    setTotalCounter(totalCounter + 1);
    const includesItemWithQuantity = items.some((obj) => {
      return (
        Object.keys(obj).every((key) => {
          return obj[key] === item[key];
        }) && obj.hasOwnProperty("quantity")
      );
    });

    if (!includesItemWithQuantity) {
      setItems((prevItems) => [...prevItems, { ...item, quantity: 1 }]);
    } else {
      console.log("We are in else");
      setItems((prevItems) =>
        prevItems.map((prevItem) =>
          prevItem.id === item.id
            ? { ...prevItem, quantity: prevItem.quantity + 1 }
            : prevItem
        )
      );
    }
  };

  const handleRemoveItem = (id) => {
    setTotalCounter(totalCounter - 1);
    setItems((prevItems) =>
      prevItems.map((prevItem) =>
        prevItem.id === id
          ? { ...prevItem, quantity: prevItem.quantity - 1 }
          : prevItem
      )
    );
  };

  const cartCtx = {
    items: items,
    totalAmount: totalAmount,
    totalCounter: totalCounter,
    addItem: handleAddItem,
    removeItem: handleRemoveItem,
  };
  useEffect(() => {
    const total = calculateTotal(items);
    setTotalAmount(total);
    /*  console.log(items); */
  }, [items]);

  return (
    <CartContext.Provider value={cartCtx}>
      {props.children}
    </CartContext.Provider>
  );
};
