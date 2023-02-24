import React, { createContext } from "react";
import { ApiTopPropduct } from "../Api/TopProductsApi";
export const productsContext = createContext();
export const ProductProvider = ({ children }) => {
  /*  console.log(ApiTopPropduct); */
  const products = ApiTopPropduct.map((product) => product);
  /*  console.log(products); */
  return (
    <productsContext.Provider value={products}>
      {children}
    </productsContext.Provider>
  );
};
