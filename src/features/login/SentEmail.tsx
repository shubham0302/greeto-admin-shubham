import { Link } from "react-router-dom";
import { routeConstants } from "../../common/router/routeConstants";
import { Box, Button, Typography } from "@mui/material";
import { ArrowRightAltOutlined } from "@mui/icons-material";
import AppLogo from "../../common/components/AppLogo";

const SentEmail = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          width: "100%",
          py: 2,
          borderBottomWidth: "1px",
          borderBottomColor: "gray.100",
          borderBottomStyle: "solid",
        }}
      >
        <Box
          sx={{
            width: "80%",
            display: "flex",
            mx: "auto",
          }}
        >
          <AppLogo />
        </Box>
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "row-reverse",
          width: "100%",
        }}
      >
        <Box
          sx={{
            width: "55%",
            height: "100%",
            bgcolor: "gray.100",
          }}
        >
          <img
            src="/LoginPage.jpg"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </Box>
        <Box
          sx={{
            flex: 1,
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "70%",
              gap: 1,
              alignItems: "center",
            }}
          >
            <Typography
              variant="h3"
              textAlign={"center"}
              sx={{ width: "100%", mb: 2 }}
            >
              Email sent successfully!
            </Typography>
            <Typography
              textAlign={"center"}
              sx={{ width: "100%" }}
              variant="bodyMd"
            >
              An email has been sent with link to reset your password!
            </Typography>
            <Typography
              textAlign={"center"}
              sx={{ width: "100%", mb: 2 }}
              variant="bodyMd"
            >
              Reset your password to that link and login again
            </Typography>
            <Link to={routeConstants.login}>
              <Button
                variant="contained"
                disableElevation
                endIcon={<ArrowRightAltOutlined />}
                size="medium"
                sx={{ textTransform: "capitalize" }}
              >
                Go to Login
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SentEmail;
