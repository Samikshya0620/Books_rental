import React, { createContext, useState } from "react";

export const CheckoutContext = createContext();

export const CheckoutProvider = ({ children }) => {
  const [addressInfo, setAddressInfo] = useState({
    firstName: "",
    lastName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    contactno: "",
  });
  const [paymentInfo, setPaymentInfo] = useState({
    method: "",
  });

  const values = {
    addressInfo,
    paymentInfo,
    setAddressInfo,
    setPaymentInfo,
  };

  return (
    <CheckoutContext.Provider value={values}>
      {children}
    </CheckoutContext.Provider>
  );
};
