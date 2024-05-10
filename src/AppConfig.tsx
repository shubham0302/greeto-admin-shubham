import { Box, CircularProgress, Typography } from "@mui/material";
import RouterComponent from "./common/router/RouterComponent";
import { useAuth } from "./common";

const AppConfig = () => {
  const { isLoggedIn, isFetching } = useAuth(true);
  console.log(document.cookie, "calledCookie");
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        bgcolor: "gray.50",
      }}
    >
      {isFetching && (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <CircularProgress title="Loading application...." size={30} />
          <Typography variant="labelLr">Loading application....</Typography>
        </Box>
      )}
      {!isFetching && <RouterComponent isUserLoggedIn={isLoggedIn} />}
    </Box>
  );
};

export default AppConfig;
