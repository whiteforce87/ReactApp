import React from "react";

import { useAuth } from "./AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";

const PrivateRoutes = () => {
  const authContext = useAuth();
  const accessToken = localStorage.getItem("accessToken");
  const username = localStorage.getItem("username");
  const refreshToken = localStorage.getItem("refreshToken");


  console.log("varmıymıs:",accessToken)


  useEffect(() => {
    const setCredentials = () => {
      if (accessToken) {
        authContext.setUsername(username);
        authContext.setAuthenticated(true);
        authContext.setRefreshToken(refreshToken);
      }
    };
    setCredentials();
  }, [accessToken, username, refreshToken, authContext]);



  return accessToken != null ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;