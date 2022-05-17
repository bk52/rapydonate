import React from 'react';
import { Navigate, useLocation, } from 'react-router-dom';
import isLogin from "../common/isLogin";

export default function RequireAuth({ children, ...rest }) {
  let location = useLocation();

  if (!isLogin()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}