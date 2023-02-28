import React, { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "./authContext";
import http from "../services/httpService";
import config from "../config.json";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const CartContext = React.createContext({});

export const CartProvider = (props) => {
  const navigate = useNavigate();
  const { authTokens, user } = useContext(AuthContext);

  const [items, setItems] = useState([]);
  const [totalCounter, setTotalCounter] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);
    return total;
  };

  const getitems = async () => {
    if (!authTokens) {
      return null;
    }
    const response = await http.get(config.apiUrl + "cart", {
      headers: {
        Authorization: "Bearer " + authTokens.access_token,
      },
    });
    setItems(await response.data["books"]);
    setTotalCounter(items.length);
  };

  const handleAddItem = async (item) => {
    if (!authTokens) {
      toast.error("You must login first ");
      await sleep(2000);
      navigate("/login");
    }
    try {
      const response = await http.post(
        config.apiUrl + "cartpost",
        { book_id: item.id, quantity: 1, user_id: user.user_id },
        {
          headers: {
            Authorization: "Bearer " + authTokens.access_token,
          },
        }
      );
      setTotalCounter(totalCounter + 1);
      getitems();
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveItem = async (item) => {
    if (!authTokens) {
      toast.error("You must login first ");
      await sleep(2000);
      navigate("/login");
    }
    try {
      const response = await http.delete(config.apiUrl + "cart", {
        headers: {
          Authorization: "Bearer " + authTokens.access_token,
        },
        data: { book_id: item.id, quantity: 1, user_id: user.user_id },
      });
      setTotalCounter(totalCounter - 1);
      getitems();
    } catch (error) {
      console.log(error);
    }
  };

  const cartCtx = {
    items: items,
    totalAmount: totalAmount,
    totalCounter: totalCounter,
    setItems: setItems,
    setTotalAmount: setTotalAmount,
    setTotalCounter: setTotalCounter,
    addItem: handleAddItem,
    removeItem: handleRemoveItem,
    getItems: getitems,
    calculateTotal: calculateTotal,
  };

  return (
    <CartContext.Provider value={cartCtx}>
      {props.children}
    </CartContext.Provider>
  );
};
