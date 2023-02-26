import React, { Fragment, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import Counter from "../components/Counter";
import Announce from "../components/announcement";
import { useContext } from "react";
import { CartContext } from "../context/cartContext";
const Cart = () => {
  const SummaryItemStyle = "SummaryItem flex justify-between mt-3 w-[100%]";
  const ProductDivStyle = "flex w-[100%] h-auto items-center mobile:flex-col";
  const PriceQuantityStyle =
    "flex-auto flex flex-col justify-center items-center mobile:mt-7 mobile:mb-7";
  const { items, totalAmount, addItem } = useContext(CartContext);
  const [total, setTotal] = useState(totalAmount);
  const add = addItem;
  const [imageUrls, setImageUrls] = useState([]);
  useEffect(() => {
    const urls = items.map((item) => {
      const image = new Image();
      image.src = `data:image/jpeg;base64,${item.image}`;
      return image.src;
    });
    setImageUrls(urls);
  }, [items]);
  return (
    <div>
      <Announce />
      <Navbar />
      <div className="p-3">
        <div className="flex justify-center text-5xl">Cart</div>

        {/* upper buttons div */}
        <div className="flex items-center justify-between mt-4 mobile:flex-col">
          <button className="btn mt-0 rounded px-1 py-1 bg-gradient-to-r from-cyan-500 to to-blue-500">
            Rent More
          </button>
          <div className="flex underline text-lg hover:cursor-pointer mobile:m-5">
            <p>Items in your Cart: {items.length}</p>
            <p className="ml-5">Whishlist Items: 0</p>
          </div>
          <button className="btn mt-0 rounded px-1 py-1 bg-gradient-to-r from-cyan-500 to to-blue-500">
            Checkout Now
          </button>
        </div>

        {/* vertically center parent div */}
        <div className="flex flex-row mobile:flex-col mt-7 sm:flex-col md:flex-row">
          {/* product div */}
          <div className="flex flex-col flex-1">
            {/* 1st product div */}
            {items.map((item, index) => (
              <Fragment key={index}>
                <div className={ProductDivStyle}>
                  <div className=" product flex pl-5 self-start">
                    <img
                      className="product_img w-[7rem]"
                      src={imageUrls[index]}
                      alt="product_img"
                    />
                    {/* {console.log(item[0].src)} */}

                    <div className="disc flex items-start justify-start h-auto flex-col ml-6">
                      <p>
                        <b className="mr-2">ID:</b>
                        {item.id}
                      </p>
                      <p>
                        <b className="mr-2">Product:</b>
                        {item.title}
                      </p>
                    </div>
                  </div>

                  {/*Price and Quantity Div*/}
                  <div className={PriceQuantityStyle}>
                    <Counter />
                    <p className="flex items-center justify-center text-4xl mt-3">
                      <b>{item.price}</b>
                    </p>
                  </div>
                </div>
                <hr className="mb-7 mt-7 mobile:mt-0" />
              </Fragment>
            ))}

            {/*Second Product Div*/}
          </div>
          <div className="Summary flex-[0.4] flex flex-col items-center w-auto h-[40vh] border-2 border-[#8a4af3] rounded-md shadow-lg p-5 text-lg mobile:mb-6">
            <h1 className="text-[2rem]">SUMMARY</h1>
            <div className={SummaryItemStyle}>
              <p>SubTotal:</p>
              <p></p>
            </div>
            <div className={SummaryItemStyle}>
              <p>Shipping:</p>
              <p>100</p>
            </div>
            <div className={SummaryItemStyle}>
              <p>Shipping Discount:</p>
              <p>-100</p>
            </div>
            <div className={SummaryItemStyle + " text-3xl font-bold"}>
              <p>Total:</p>
              <p>{totalAmount}</p>
            </div>
          </div>
        </div>
        <NewsLetter />
        <Footer />
      </div>
    </div>
  );
};

export default Cart;
