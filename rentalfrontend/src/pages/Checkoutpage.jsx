import React, { Fragment } from "react";
import Checkout from "../components/Checkout";
import Navbar from "../components/Navbar";
import Announce from "../components/announcement";
import { CheckoutProvider } from "../context/CheckoutContext";

const CheckoutPage = () => {
  return (
    <CheckoutProvider>
    <Fragment>
      <Navbar />
      <Checkout />
    </Fragment>
    </CheckoutProvider>
  );
};

export default CheckoutPage;
