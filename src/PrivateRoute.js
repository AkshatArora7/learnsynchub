import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./auth";

const PrivateRoute = () => {
  const storedAuth = localStorage.getItem("isAuthenticated");
  if (storedAuth === "true") {
    return <Outlet />;
  } else {
    <Navigate to="/login" />;
  }
};

export default PrivateRoute;
