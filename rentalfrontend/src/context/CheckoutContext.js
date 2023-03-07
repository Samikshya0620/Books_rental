import React, { createContext, useState } from "react";

export const CheckoutContext = createContext();

export const CheckoutProvider = ({ children }) => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [saveAddress, setSaveAddress] = React.useState(false);
  const [paymentMethod, setPaymentMethod] = React.useState("cash_on_delivery");
  const [reviewData, setReviewData] = useState(null);
  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  const handleSaveAddressChange = (event) => {
    setSaveAddress(event.target.checked);
  };
  const handlePlaceOrder = () => {
    console.log(firstName, lastName);
    // make API call using reviewData
    console.log("Placing order with data:");
  };

  const values = {
    handleFirstNameChange: handleFirstNameChange,
    handleLastNameChange: handleLastNameChange,
    handleAddressChange: handleAddressChange,
    handleCityChange: handleCityChange,
    handleStateChange: handleStateChange,
    handleSaveAddressChange: handleSaveAddressChange,
    handlePaymentMethodChange: handlePaymentMethodChange,
    handlePlaceOrder: handlePlaceOrder,
    setReviewData: setReviewData,
    paymentMethod: paymentMethod,
    firstName: firstName,
    lastName: lastName,
    address: address,
    city: city,
    state: state,
    saveAddress: saveAddress,
  };

  return (
    <CheckoutContext.Provider value={values}>
      {children}
    </CheckoutContext.Provider>
  );
};
