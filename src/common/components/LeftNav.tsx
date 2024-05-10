import { Box, Typography } from "@mui/material";
import React, { FC, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { routeHandler } from "../router/routeHendler";

const LeftNav = () => {
  const { pathname } = useLocation();
  const routes = useMemo<React.ReactElement[]>(() => {
    const routes: Props[] = [];
    const privateRoutes = routeHandler.getPrivateRoutes();
    const publicRoutes = routeHandler.getPublicRoutes();
    privateRoutes.forEach((entry) => {
      const { options, props } = entry;
      if (options.shouldIncludeInNavigation) {
        routes.push({
          currentPath: pathname,
          icon: options.icon,
          label: options.name,
          path: props.path,
        });
      }
    });
    publicRoutes.forEach((entry) => {
      const { options, props } = entry;
      if (options.shouldIncludeInNavigation) {
        routes.push({
          currentPath: pathname,
          icon: options.icon,
          label: options.name,
          path: props.path,
        });
      }
    });

    return routes.map((e, idx) => <NavItem {...e} key={`${idx}-${e.path}`} />);
  }, [pathname]);

  return (
    <Box
      sx={{
        width: "240px",
        bgcolor: "gray.800",
        color: "white",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        pt: 2,
      }}
    >
      {routes}
    </Box>
  );
};

type Props = {
  label: string;
  currentPath: string;
  icon: React.ReactElement;
  path: string;
};

const NavItem: FC<Props> = (props) => {
  const { currentPath, label, icon, path } = props;
  const isCurrentRoute = useMemo(
    () => routeHandler.isCurrentRoute(path, currentPath),
    [currentPath, path]
  );

  return (
    <Link
      to={path.replace(":courseId", "create")}
      style={{ textDecoration: "none" }}
    >
      <Box
        sx={{
          bgcolor: isCurrentRoute ? "primary.main" : "transparent",
          display: "flex",
          gap: 1,
          alignItems: "center",
          px: 2,
          py: 1,
          textDecoration: "none",
          color: "white",
        }}
      >
        {icon}
        <Typography variant="labelLr" color={"white"}>
          {label}
        </Typography>
      </Box>
    </Link>
  );
};

export default LeftNav;
