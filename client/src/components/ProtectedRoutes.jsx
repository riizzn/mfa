import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "../context/SessionContext";

const ProtectedRoutes = () => {
  const { isLoggedIn, loading } = useSession();
  if (loading) return <div>Loading...</div>;
  console.log("logged in user is ", isLoggedIn);
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
