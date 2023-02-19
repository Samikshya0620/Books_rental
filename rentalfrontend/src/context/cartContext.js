import React from "react";
import { useState } from "react";

export const CartContext = React.createContext({
  items: [{
    id: 1,
    title: "Alchemist",
    src: require("../assets/Bookimg/Alchemist.jpg"),
    price: 20,
    quantity_available: 20,
  },
  {
    id: 2,
    title: "Spy",
    src: require("../assets/Bookimg/spy.jpg"),
    price: 10,
    quantity_available: 50,
  },
  {
    id: 3,
    title: "Subconscious",
    src: require("../assets/Bookimg/Subconscious.jpg"),
    price: 100,
    quantity_available: 35,
  },],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
});

export const CartProvider = (props) => {
  const [items, setItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);
    return total;
  };
  const handleAddItem = (item) => {
    if (!items.includes(item)) {
      setItems((prevItems) => [...prevItems, { ...item, quantity: 1 }]);
      /* console.log(item); */
    } else {
      setItems((prevItems) =>
        prevItems.map((prevItem) =>
          prevItem.id === item.id
            ? { ...prevItem, quantity: prevItem.quantity + 1 }
            : prevItem
        )
      );
    }
    const total = calculateTotal(items);
    setTotalAmount(total);
  };
  const handleRemoveItem = (id) => {
    setItems((prevItems) =>
      prevItems.map((prevItem) =>
        prevItem.id === id
          ? { ...prevItem, quantity: prevItem.quantity - 1 }
          : prevItem
      )
    );
    const total = calculateTotal(items);
    setTotalAmount(total);
  };
  const cartCtx = {
    items: items,
    totalAmount: totalAmount,
    addItem: handleAddItem,
    removeItem: handleRemoveItem,
  };

  return (
    <CartContext.Provider value={cartCtx}>
      {props.children}
    </CartContext.Provider>
  );
};
