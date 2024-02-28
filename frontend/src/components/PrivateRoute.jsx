import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate, useLocation } from "react-router-dom";

function PrivateRoute() {
  const location = useLocation();

  const { currentUser } = useSelector((state) => state.user);

  return currentUser !== null ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" replace state={{ from: location }} />
  );
}

export default PrivateRoute;
