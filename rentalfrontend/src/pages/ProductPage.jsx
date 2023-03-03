import React, { Fragment, useContext, useState, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NewsLetter from "../components/NewsLetter";
import { productsContext } from "../context/productsContext";
import { CartContext } from "../context/cartContext";
import { motion } from "framer-motion";

const ProductPage = () => {
  const { products } = useContext(productsContext);
  const { addItem } = useContext(CartContext);
  const [imageUrls, setImageUrls] = useState([]);
  const [selectedUrls, setSelectedImageUrls] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const selected = (prod) => {
    setSelectedProduct(prod);
    const image = new Image();
    image.src = `data:image/jpeg;base64,${prod.image}`;
    setSelectedImageUrls(image.src);
  };
  useEffect(() => {
    const urls = products.map((item) => {
      const image = new Image();
      image.src = `data:image/jpeg;base64,${item.image}`;
      return image.src;
    });
    setImageUrls(urls);
  }, [products]);

  return (
    <div>
      <Navbar />
      <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-10 gap-8">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
            whileHover={{ scale: 1.05 }}
            onClick={() => selected(product)}
          >
            <div className="flex justify-center items-center">
              <img
                src={imageUrls[index]}
                alt={product.name}
                className="h-[200px] w-[200px]"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-center items-center">
                <h2 className="text-lg font-semibold">{product.name}</h2>
              </div>
              <div className="flex justify-center items-center">
                <p className="text-gray-600 mt-2 font-bold">
                  Rs {product.price}
                </p>
              </div>
{/*               <div className="flex items-center justify-center">
                <button
                  onClick={() => addItem(product)}
                  className="text-white bg-[#8a4af3] rounded-md shadow-md mt-[30px] p-3"
                >
                  Add to Cart
                </button>
              </div> */}
            </div>
          </motion.div>
        ))}
        {selectedProduct && (
          <motion.div
            className="fixed inset-0 z-50 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center justify-center min-h-screen">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="flex justify-center items-center">
                  <img
                    src={selectedUrls}
                    alt={selectedProduct.name}
                    className="h-[200px] w-[200px]"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold">
                    {selectedProduct.name}
                  </h2>
                  <p className="text-gray-600 mt-2">
                    Rs{selectedProduct.price}
                  </p>
                  <p className="text-gray-700 mt-4">
                    {selectedProduct.description}
                  </p>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full mt-4"
                    onClick={() => setSelectedProduct(null)}
                  >
                    Close
                  </button>
                  <button
                    onClick={() => addItem(selectedProduct)}
                    className="text-white bg-[#8a4af3] rounded-full shadow-md mt-[30px] ml-[30px] p-3"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default ProductPage;
