import React, { useContext, useState, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NewsLetter from "../components/NewsLetter";
import Product from "../components/Product";
import { productsContext } from "../context/productsContext";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const CategoryPage = () => {
  const { products } = useContext(productsContext);
  const [selectedOption, setSelectedOption] = useState("option1");
  const [sortBy, setSortBy] = useState("newest");
  const [sortedProducts, setSortedProducts] = useState([]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleClick = () => {
    toast.success("Added to Cart Successfully");
  };

  useEffect(() => {
    const filteredProducts = products.filter((product) => {
      if (selectedOption === "option1") {
        return true;
      } else {
        return product.category_id.toString() === selectedOption;
      }
    });
    // Make a copy of the products array to avoid modifying the original array
    const productsCopy = [...filteredProducts];

    // Sort the products array based on the selected option
    switch (sortBy) {
      case "newest":
        productsCopy.sort((a, b) => b.id - a.id);
        break;
      case "oldest":
        productsCopy.sort((a, b) => a.id - b.id);
        break;
      case "priceAsc":
        productsCopy.sort((a, b) => a.price - b.price);
        break;
      case "priceDesc":
        productsCopy.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    // Update the sorted products state with the sorted array
    setSortedProducts(productsCopy);
  }, [products, sortBy, selectedOption]);
  return (
    <div>
      <Navbar />
      <div className="flex flex-col p-5">
        <div className="flex items-center justify-between mt-3">
          <div className="flex mobile:flex-col">
            <p>Filter by</p>
            <select
              value={selectedOption}
              onChange={handleOptionChange}
              className="ml-3 border-2 border-silver mobile:ml-0"
            >
              <option value="option1">Category</option>
              <option value="1">Romance</option>
              <option value="2">Thriller</option>
              <option value="3">Horror</option>
              <option value="5">Comedy</option>
              <option value="6">Self Help</option>
              <option value="11">Biographies</option>
              {/* <option value="comics">Comics</option> */}
            </select>
          </div>
          <div className="flex mobile:flex-col mobile:items-end">
            <p>Sort by</p>
            <select
              defaultValue="newest"
              className="ml-3 border-2 border-silver"
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest (first)</option>
              <option value="oldest">Oldest (first)</option>
              <option value="priceAsc">Price (asc)</option>
              <option value="priceDesc">Price (desc)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-4 sm:grid-cols-2 mt-12 gap-8 place-items-center place-content-center">
        {sortedProducts.map((product, index) => (
          <motion.div whileHover={{ scale: 1.2 }} key={index}>
            <Product item={product} key={index} onClick={handleClick} />
          </motion.div>
        ))}
      </div>

      {/*     <Products /> */}
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default CategoryPage;
