import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { LoginRedirect } from "../../features/login/LoginPage";
import { useAuth } from "../hooks";

const PrivateRoute: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const { pathname, search } = useLocation();

  if (isLoggedIn) {
    return <Outlet />;
  }
  return <LoginRedirect redirectFrom={pathname + search} />;
};

export default PrivateRoute;
