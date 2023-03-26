import React, { useContext, useEffect, useState } from "react";
import Announce from "../components/announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NewsLetter from "../components/NewsLetter";
import Products from "../components/Products";
import Slider from "../components/Slider";
import { CartContext } from "../context/cartContext";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Home = () => {
  const [loading, setLoading] = useState(true);
  const { getItems, items} = useContext(CartContext);
  const [secondloading, setSecondLoading] = useState(true);
  const location = useLocation();
  useEffect(() => {
    const fetchItems = async () => {
      try {
        await getItems();
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchItems();
  }, [loading]);

  useEffect(() => {
    const message = localStorage.getItem("message");
    if (message) {
      if (message === "Verification successful") {
        toast.success(message);
      } else {
        toast.error(message);
      }
      setSecondLoading(false);
    }
    return()=>{
      localStorage.removeItem("message");
    }
  }, [secondloading]);
  return (
    <div>
      <Navbar />
      <Slider />
      <Categories />
      <Products />
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default Home;