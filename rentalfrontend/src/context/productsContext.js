import React, { createContext, useEffect, useState } from "react";
import http from "../services/httpService";
import config from "../config.json";
import { toast } from "react-toastify";

const apiEndpoint = config.apiUrl + "bookapi";

export const productsContext = createContext();

export const ProductProvider = ({ children }) => {
  const [productapi, setProductapi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryapi, setCategoryapi] = useState([]);

  async function getCategories() {
    try {
      const response = await http.get(config.apiUrl + "ctgapi");
      setCategoryapi(response.data);
    } catch (error) {
      const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;
      if (expectedError) {
        toast.error("Something Went wrong");
      }
    }
  }

  async function getProducts() {
    try {
      const response = await http.get(apiEndpoint);
      setProductapi(response.data);
      setLoading(false);
    } catch (error) {
      const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;
      if (expectedError) {
        toast.error("No connection made");
      }
      setLoading(false);
    }
  }
  useEffect(() => {
    if (loading) {
      getCategories();
      getProducts();
    }
  }, [loading]);

  const products = productapi.map((product) => product);
  const categories = categoryapi.map((category) => category);

  const productcontext = {
    products: products,
    categories: categories,
  };
  return (
    <productsContext.Provider value={productcontext}>
      {children}
    </productsContext.Provider>
  );
};
