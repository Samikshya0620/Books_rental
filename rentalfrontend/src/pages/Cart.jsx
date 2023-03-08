import React, { Fragment, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import Counter from "../components/Counter";
import { useContext } from "react";
import { CartContext } from "../context/cartContext";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import http from "../services/httpService";
import config from "../config.json";
import { NavLink } from "react-router-dom";

const Cart = () => {
  const SummaryItemStyle = "SummaryItem flex justify-between mt-3 w-[100%]";
  const ProductDivStyle = "flex w-[100%] h-auto items-center mobile:flex-col";
  const PriceQuantityStyle =
    "flex-auto flex flex-col justify-center items-center mobile:mt-7 mobile:mb-7";

  const { authTokens } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    totalAmount,
    handleAddItem,
    setTotalCounter,
    totalCounter,
    setItems,
    items,
    setTotalAmount,
    calculateTotal,
  } = useContext(CartContext);

  const handleClick = () => {
    navigate("/");
  };

  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getitems = async () => {
      const response = await http.get(config.apiUrl + "cart", {
        headers: {
          Authorization: "Bearer " + authTokens.access_token,
        },
      });
      /*    console.log(await response.data["books"]); */
      setItems(await response.data["books"]);
    };
    getitems();
  }, [authTokens.access_token]);

  useEffect(() => {
    const urls = items.map((item) => {
      const image = new Image();
      image.src = `data:image/jpeg;base64,${item.image_data}`;
      return image.src;
    });

    setImageUrls(urls);
    const total = calculateTotal(items);
    setTotalAmount(total);
    setTotalCounter(items.length);
  }, [items]);

  return (
    <div>
      <Navbar />
      <div className="p-3">
        <div className="flex justify-center text-5xl">Cart</div>

        {/* upper buttons div */}
        <div className="flex items-center justify-between mt-4 mobile:flex-col">
          <button
            onClick={handleClick}
            className="btn font-bold mt-0 rounded-lg p-2 hover:scale-105  bg-teal-500"
          >
            Rent More
          </button>
          <div className="flex text-xl font-bold hover:cursor-pointer mobile:m-5">
            <p>Items in your Cart: {items.length} </p>
          </div>
          {/*           <NavLink
            className="btn mt-0 font-bold rounded-lg p-2 hover:scale-105  bg-teal-500"
            to="/checkout"
          >
            Checkout Now
          </NavLink> */}
          <button
            onClick={() => navigate("/checkout")}
            className="btn mt-0 font-bold rounded-lg p-2 hover:scale-105  bg-teal-500"
          >
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

                    <div className="disc flex items-center justify-center h-auto flex-col ml-6">
                      <p className="font-bold text-2xl">
                        <b className="mr-2"></b>
                        {item.name}
                      </p>
                    </div>
                  </div>

                  {/*Price and Quantity Div*/}
                  <div className={PriceQuantityStyle}>
                    <Counter item={item} />
                    <p className="flex items-center justify-center text-2xl mt-3">
                      <b>Rs. {item.price * item.quantity}</b>
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
              <p>Rs. 0</p>
            </div>
            <div className={SummaryItemStyle}>
              <p>Shipping Discount:</p>
              <p>Rs. 0</p>
            </div>
            <div className={SummaryItemStyle + " text-3xl font-bold"}>
              <p>Total:</p>
              <p>Rs. {totalAmount}</p>
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
