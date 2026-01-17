import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token"); // check JWT token
  return token ? children : <Navigate to="/signup" replace />;
}

export default PrivateRoute;
