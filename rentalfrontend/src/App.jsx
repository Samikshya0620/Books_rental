import { React } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// Navigate is for redirect and replace is used with it to avoid extra redirect after the user calls back
import { Outlet } from "react-router-dom";
import Cart from "./pages/Cart";
import CategoryPage from "./pages/CategoryPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductPage from "./pages/ProductPage";
import Register from "./pages/Register";
import { ProductProvider } from "./context/productsContext";
import { CartProvider } from "./context/cartContext";
const Layout = () => {
  return <Outlet />;
};



function App() {
  return (
    <CartProvider>
      <ProductProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="register" element={<Register />} />
              <Route path="product" element={<ProductPage />} />
              <Route path="login" element={<Login />} />
              <Route path="cart" element={<Cart />} />
              <Route path="category" element={<CategoryPage />} />
              <Route path="*" element={<Navigate to={"/"} replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ProductProvider>
    </CartProvider>
  );
}
export default App;
