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

  const { getItems, items} = useContext(CartContext);
  
  useEffect(() => {
    console.log(items);
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
