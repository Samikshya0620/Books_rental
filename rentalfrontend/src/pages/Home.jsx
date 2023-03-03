import React, { useContext, useEffect, useState } from "react";
import Announce from "../components/announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NewsLetter from "../components/NewsLetter";
import Products from "../components/Products";
import Slider from "../components/Slider";
import { CartContext } from "../context/cartContext";
const Home = () => {
  const [loading, setLoading] = useState(true);
  const [secondloading, setSecondLoading] = useState(true);
  const { getItems } = useContext(CartContext);
  useEffect(() => {
    getItems();
    setLoading(false);
  }, [loading]);
  useEffect(() => {
    setSecondLoading(false);
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
