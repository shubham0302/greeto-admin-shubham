import { Box } from "@mui/material";
import { Navigate } from "react-router-dom";
import { routeConstants } from "../../common/router/routeConstants";

const HomePage = () => {
  return <Box pb={20}>HomePage</Box>;
};

export const HomePageRedirect = () => (
  <Navigate to={routeConstants.home} replace />
);

export default HomePage;
