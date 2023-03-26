import { React, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// Navigate is for redirect and replace is used with it to avoid extra redirect after the user calls back
import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Cart from "./pages/Cart";
import CategoryPage from "./pages/CategoryPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductPage from "./pages/ProductPage";
import Registers from "./pages/Registers";
import { ProductProvider } from "./context/productsContext";
import { CartProvider } from "./context/cartContext";
import { AuthProvider } from "./context/authContext";
import { PrivateRoute } from "./services/privateRoute";
import CheckoutPage from "./pages/Checkoutpage";
import ProfilePage from "./pages/ProfilePage";
import Verification from "./pages/VerificationPage";
import Rent from "./pages/ApplyRent";
const Layout = () => {
  return <Outlet />;
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ProductProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="register" element={<Registers />} />
              <Route path="product" element={<ProductPage />} />
              <Route path="login" element={<Login />} />
              <Route path="cart" element={<PrivateRoute Component={Cart} />} />
              <Route path="category" element={<CategoryPage />} />
              <Route path="user" element={<ProfilePage />} />
              <Route
                path="checkout"
                element={<PrivateRoute Component={CheckoutPage} />}
              />
              <Route path="rent" element={<PrivateRoute Component={Rent} />} />
              <Route path="/verify-email/:token" element={<Verification />} />
              <Route path="*" element={<Navigate to={"/"} replace />} />
            </Route>
          </Routes>
        </ProductProvider>
      </CartProvider>
    </AuthProvider>
  );
}
export default App;