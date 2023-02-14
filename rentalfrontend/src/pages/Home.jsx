import React from "react";
import Announce from "../components/announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NewsLetter from "../components/NewsLetter";
import Products from "../components/Products";
import Slider from "../components/Slider";
import { useState } from "react";
const Home = () => {
  const [counter, setCounter] = useState(0);
  const handleCounterChange = (newCounter) => {
    setCounter(newCounter);
  };
  return (
    <div>
      <Announce />
      <Navbar counter={counter} />
      <Slider />
      <Categories />
      <Products onCounterChange={handleCounterChange} />
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default Home;
