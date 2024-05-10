import { Route, useLocation } from "react-router-dom";
import { routeHandler } from "./routeHendler";
import { LoginRedirect } from "../../features/login/LoginPage";
import NotFoundPage from "../../features/notFound/NotFoundPage";

const RouteChecker = () => {
  const { pathname, search } = useLocation();
  const url = pathname + search;
  if (routeHandler.hasRoute(pathname)) {
    return <LoginRedirect redirectFrom={url} />;
  }
  return <Route Component={NotFoundPage} />;
};

export default RouteChecker;
