import { Box, CircularProgress, Typography } from "@mui/material";
import { FC } from "react";

type LoadingProps = {
  isOpen: boolean;
};

const Loading = ({ isOpen }: LoadingProps) => {
  return (
    <Box
      sx={{
        display: isOpen ? "flex" : "none",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
        bgcolor: "primary.100",
        zIndex: 1000,
        opacity: 0.98,
      }}
    >
      <CircularProgress />
    </Box>
  );
};

type LoadingIndiProps = {
  message?: string;
};

export const LoadingFill: FC<LoadingIndiProps> = (props) => {
  const { message = "Fetching" } = props;
  return (
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
      <CircularProgress title={message} size={30} />
      <Typography variant="labelLr">{message}</Typography>
    </Box>
  );
};

export default Loading;
