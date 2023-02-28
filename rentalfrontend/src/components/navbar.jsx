import { Badge } from "@mui/material";
import { Search, ShoppingCartOutlined } from "@mui/icons-material";
import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/cartContext";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "../context/authContext";
const Navbar = () => {
  const navigate = useNavigate();
  const { totalCounter: counter } = useContext(CartContext);
  const { logoutUser } = useContext(AuthContext);
  const style = "text-[14px] cursor-pointer ml-[25px] mobile:ml-[5px]";
  const handleClick = () => {
    navigate("/cart");
  };

  return (
    <div className="navbar h-[60px] shadow-md relative z-10">
      <ToastContainer />
      <div className="wrapper pl-[20px] pr-[20px] pt-[10px] pb-[10px] flex justify-between items-center mobile:pl-0 mobile:pr-0">
        <div className=" left flex flex-1  items-center">
          {/* <div className="cursor-pointer text-[16px] mobile:hidden">En</div> */}

          {/* Search Input */}
          <div className="SearchContainer flex border-[2px] border-solid border-lightgrey rounded-md items-center ml-[10px] p-[5px]">
            <input
              type="text"
              className="border-none mobile:w-[50px]"
              placeholder="Search"
            />
            <Search className="text-[#8a4af3] m" style={{ fontSize: "16px" }} />
          </div>
        </div>

        {/* Logo */}
        <div className="center flex-1 text-center  mobile:ml-6">
          <div className="logo text-3xl font-serif text mobile:text-sm">
            B-BOOK
          </div>
        </div>

        {/* Right Side */}
        <div className="right flex flex-1 items-center justify-end mobile:justify-center mobile:flex-[2]">
          <NavLink className={style} to="/home">
            Home
          </NavLink>
          <NavLink className={style} to="/register">
            Register
          </NavLink>
          <NavLink className={style} to="/login">
            Sign In
          </NavLink>
          <button className={style} onClick={() => logoutUser()}>
            Log Out
          </button>
          <div className={style}>
            <Badge badgeContent={counter} color="primary">
              <ShoppingCartOutlined onClick={handleClick} />
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
