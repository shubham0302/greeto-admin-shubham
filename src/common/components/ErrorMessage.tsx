import { Typography } from "@mui/material";
import React from "react";

const ErrorMessage: React.FC<any> = ({ children }) => {
  return (
    <Typography variant="bodySm" color={"error.main"}>
      {children}
    </Typography>
  );
};

export default ErrorMessage;
