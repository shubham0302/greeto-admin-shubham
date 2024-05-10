import React, { useEffect, useMemo, useState } from "react";
import { createPublicRoutes } from "./PublicRoutes";
import { createPrivateRoutes } from "./PrivateRoutes";
import { Route, Routes, useLocation } from "react-router-dom";
import { routeHandler } from "./routeHendler";
import PrivateRoute from "./PrivateRoute";
import RouteChecker from "./RouteChecker";
import NotFoundPage from "../../features/notFound/NotFoundPage";
import LeftNav from "../components/LeftNav";
import { Box } from "@mui/material";
import Header from "../components/Header";

export const createRoutes = () => {
  createPublicRoutes();
  createPrivateRoutes();
};

type Props = {
  isUserLoggedIn: boolean;
};

const RouterComponent: React.FC<Props> = (props) => {
  const { isUserLoggedIn } = props;
  const { pathname } = useLocation();
  const [routeRegistered, setRouteRegistered] = useState(false);
  useEffect(() => {
    createRoutes();
    setRouteRegistered(true);
  }, []);

  const privateRoutes = useMemo(() => {
    const routes = routeRegistered ? routeHandler.getPrivateRoutes() : [];
    return routes.map((props, idx) => (
      <Route path={props.props.path} element={<PrivateRoute />} key={idx}>
        <Route {...props.props} />
      </Route>
    ));
  }, [routeRegistered]);

  const publicRoutes = useMemo(() => {
    const routes = routeRegistered ? routeHandler.getPublicRoutes() : [];
    return routes.map((props, idx) => <Route key={idx} {...props.props} />);
  }, [routeRegistered]);

  const routeComponents = useMemo(
    () => (
      <Routes>
        {privateRoutes}
        {publicRoutes}
        {!isUserLoggedIn && <Route Component={RouteChecker} />}
        <Route Component={NotFoundPage} />
      </Routes>
    ),
    [isUserLoggedIn, privateRoutes, publicRoutes]
  );

  const appComponent = useMemo(() => {
    if (routeRegistered) {
      const { options } = routeHandler.getRouteByMatch(pathname);
      console.log(options, pathname, "calledOptions");

      const { hideHeader = true, hideSideBar = true } = options || {};
      return (
        <Box sx={{ width: "100%", height: "100%" }}>
          {!hideHeader && <Header />}
          <Box
            sx={{
              width: "100%",
              flex: 1,
              height: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: "100%",
                height: "100%",
              }}
            >
              {!hideSideBar && <LeftNav />}
              <Box
                sx={{
                  flex: 1,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    flex: 1,
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{ width: "100%", height: "100%", overflow: "scroll" }}
                  >
                    {routeComponents}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      );
    }
    return <></>;
  }, [pathname, routeComponents, routeRegistered]);

  return appComponent;
};

export default RouterComponent;
