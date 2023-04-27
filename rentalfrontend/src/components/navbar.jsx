import { Badge } from "@mui/material";
import { Search, ShoppingCartOutlined } from "@mui/icons-material";
import React from "react";
import { NavLink, Link } from "react-router-dom";
import { HiMenuAlt1, HiX } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/cartContext";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "../context/authContext";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [active, setActive] = useState(null);

  const navigate = useNavigate();
  const { totalCounter: counter } = useContext(CartContext);
  const { logoutUser, user, authTokens } = useContext(AuthContext);
  const style = "font-bold transition-all duration-300 p-2";
  const handleClick = () => {
    navigate("/cart");
  };
  useEffect(() => {
    const scrollActive = () => {
      setActive(window.scrollY > 20);
    };
    window.addEventListener("scroll", scrollActive);
    return () => window.removeEventListener("scroll", scrollActive);
  }, [active]);

  return (
    <div
      className={`${
        active ? "shadow-lg bg-Teal" : ""
      } h-[60px] w-full top-0 left-0 z-20 mb-5`}
    >
      <ToastContainer />
      <div className="grid grid-cols-3 gap-2">
        <div
          className={`${
            active ? "py-2 transition-all duration-300" : "py-4"
          } container  mx-auto flex items-center justify-between px-2`}
        >
          <div className="flex items-center gap-4">
            <HiMenuAlt1
              className="text-3xl sm:hidden cursor-pointer"
              onClick={() => setToggle(true)}
            />
            <div className="text-2xl text-Teal uppercase tracking-wide font-bold m-2 ml-5">
              B-Book
            </div>
          </div>
        </div>

        <div className="flex justify-end items-center p-2 m-2 gap-4 hover:scale-105">
          {/* <NavLink
            className={style + " bg-[#a9fdd8] p-2 rounded-full"}
            to="/rent"
          >
            Rent Your Books
          </NavLink> */}
        </div>

        <div className="sm:flex items-center hidden justify-end p-2 m-2 gap-4">
          <NavLink
            className={style + " bg-[#a9fdd8] p-2 rounded-md"}
            to="/rent"
          >
            Rent It
          </NavLink>
          <NavLink
            className={style + " bg-[#a9fdd8] p-2 rounded-md"}
            to="/home"
          >
            Home
          </NavLink>
          <NavLink
            className={style + " bg-[#a9fdd8] p-2 rounded-md"}
            to="/category"
          >
            Books
          </NavLink>
          <NavLink
            className={style + " bg-[#a9fdd8] p-2 rounded-md"}
            to="/product"
          >
            Details
          </NavLink>
          {!user && (
            <NavLink
              className={style + " bg-[#a9fdd8] p-2 rounded-md"}
              to="/register"
            >

              Register
            </NavLink>
          )}
          {!user && (

            <NavLink
              className={style + " bg-[#a9fdd8] p-2 rounded-md"}
              to="/login"
            >
              Login
            </NavLink>
          )}
          {user && (
            <button
              className={style + " bg-[#a9fdd8] p-2 rounded-md"}
              onClick={() => logoutUser()}
            >

              Log Out
            </button>
          )}
          <Badge badgeContent={counter} color="primary">
            <ShoppingCartOutlined
              className="cursor-pointer"
              onClick={handleClick}
            />
          </Badge>

          {user && (
            <NavLink className="cursor-pointer" to="/user">
              {" "}
              {user.username}
            </NavLink>
          )}

        </div>
        {toggle && (
          <motion.div
            initial={{ x: -500, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="fixed h-full w-96 top-0 left-0 z-20 bg-Teal text-white flex flex-col justify-center items-center shadow-lg gap-8 py-8"
          >

            <NavLink className={style} to="/rent">
              Rent It
            </NavLink>

            <NavLink className={style} to="/home">
              Home
            </NavLink>
            {!user && (
              <NavLink className={style} to="/register">
                Register
              </NavLink>
            )}
            {!user && (
              <NavLink className={style} to="/login">
                Login
              </NavLink>
            )}
            {user && (
              <button className={style} onClick={() => logoutUser()}>
                Log Out
              </button>
            )}
            <HiX
              className="absolute right-12 top-12 text-3xl cursor-pointer"
              onClick={(prev) => setToggle(!prev)}
            />
            <Badge badgeContent={counter} color="primary">
              <ShoppingCartOutlined
                className="cursor-pointer"
                onClick={handleClick}
              />
            </Badge>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
