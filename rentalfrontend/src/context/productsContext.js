import React, { createContext, useEffect } from "react";
import { ApiTopPropduct } from "../Api/TopProductsApi";
import http from "../services/httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "bookapi";

export const productsContext = createContext();
export const ProductProvider = ({ children }) => {
  async function getProducts() {
    try {
      console.log(apiEndpoint);
      const response = await http.get(apiEndpoint);
      console.log(response);
    } catch (error) {
      const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;
      if (expectedError) {
        console.log("No connection made");
      }
    }
  }
  /*  console.log(ApiTopPropduct); */
  useEffect(() => {
    getProducts();
  }, []);
  const products = ApiTopPropduct.map((product) => product);
  /*  console.log(products); */
  return (
    <productsContext.Provider value={products}>
      {children}
    </productsContext.Provider>
  );
};
