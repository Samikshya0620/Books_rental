import React, { useContext } from "react";
import { Route, Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export const PrivateRoute = ({ Component }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  return user ? (
    <Component />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};
