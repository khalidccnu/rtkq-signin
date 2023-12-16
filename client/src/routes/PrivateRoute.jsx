import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUserQuery } from "../redux/auth/authAPI.js";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { isLoading, data: user } = useUserQuery();

  return !isLoading ? (
    user ? (
      children
    ) : (
      <Navigate to="/" state={{ fromURL: location }}></Navigate>
    )
  ) : null;
};

export default PrivateRoute;
