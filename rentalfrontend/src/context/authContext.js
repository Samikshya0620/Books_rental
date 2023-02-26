import { createContext, useState, useEffect } from "react";
import http from "../services/httpService";
import config from "../config.json";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const apiEndpoint = config.apiUrl + "signin";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  let [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens"))
      : null
  );
  /*  console.log(user); */
  let [loading, setLoading] = useState(true);

  let registerUser = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    let username = data.get("username");
    let password = data.get("password");
    let email = data.get("email");
    let firstname = data.get("firstName");
    let lastname = data.get("lastName");
    try {
      let response = await http.post(config.apiUrl + "cusr", {
        username: username,
        password: password,
        email: email,
        firstname: firstname,
        lastname: lastname,
      });
      if (response.status === 200) {
        toast.success("User Created successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  let loginUser = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    let username = data.get("username");
    let password = data.get("password");
    let response = await http.post(apiEndpoint, { username, password });
    const jwt = await response.data;
    /* console.log(jwt); */
    if (response.status === 200) {
      setAuthTokens(jwt);
      setUser(jwtDecode(jwt.access_token));
      localStorage.setItem("authTokens", JSON.stringify(jwt));
      navigate("/");
    } else {
      toast.error("Something went wrong!");
    }
  };
  let logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
  };
  let contextData = {
    user: user,
    authTokens: authTokens,
    loginUser: loginUser,
    logoutUser: logoutUser,
    registerUser: registerUser,
  };
  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
