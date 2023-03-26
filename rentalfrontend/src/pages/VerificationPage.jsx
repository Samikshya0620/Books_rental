import React from "react";
import { useParams } from "react-router-dom";
import http from "../services/httpService";
import config from "../config.json";
import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const Verification = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { token } = useParams();
  const apiEndpoint = config.apiUrl + `verify-email/${token}`;

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await http.get(apiEndpoint);
        setMessage("Verification successful");
        localStorage.setItem("message", "Verification successful");
        navigate("/");
      } catch (ex) {
        setMessage("Verification failed");
        localStorage.setItem("message", "Verification failed");
        navigate("/");
      }
    };
    verifyEmail();
    /*     return () => {
      localStorage.removeItem("message");
    }; */
  }, []);

  return <div>{/* You can display a loading spinner or a message here */}</div>;
};

export default Verification;
