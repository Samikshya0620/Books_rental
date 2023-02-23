import React, { Fragment, useContext } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NewsLetter from "../components/NewsLetter";
import Counter from "../components/Counter";
import Announce from "../components/announcement";
import { productsContext } from "../context/productsContext";
import { CartContext } from "../context/cartContext";


const ProductPage = () => {
  const products = useContext(productsContext);
  const { addItem } = useContext(CartContext);

  console.log(products[0]);
  return (
    <div>
      <Announce />
      <Navbar />
      <div className="flex justify-center mobile:flex-col sm:flex-col md:flex-row lg:flex-row mobile:mt-4 mobile:p-3">
        {products[0].map((product, index) => (
          <Fragment key={index}>
            <div className="flex-1 flex items-center justify-center">
              <img
                src={product.src}
                className="product_img w-4/6 h-4/6"
                alt="product_image"
              />
            </div>
            <div className="flex-[1.3] flex flex-col items-start  justify-items-center mt-10 mobile:items-center">
              <h1 className="title text-[40px] mobile:text-[30px]">
                {product.title}
              </h1>
              <p className="disription pr-[4rem] text-justify mt-4 mobile:pr-0">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Laudantium accusamus, culpa neque ex sunt placeat. Vitae quia
                qui quo, doloribus dolore aliquam veniam. Natus totam odit
                consequatur consectetur delectus nihil!
              </p>
              <div className="flex flex-col place-self-start">
                <p className="mt-7 text-3xl">
                  Price: <b>{product.price}</b>
                </p>
                <div className="mt-7">
                  <Counter />
                </div>
              </div>

              <button
                onClick={() => addItem(product)}
                className="text-white bg-[#8a4af3] rounded-md shadow-md mt-[30px] p-3"
              >
                Add to Cart
              </button>
            </div>
          </Fragment>
        ))}
      </div>
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default ProductPage;
