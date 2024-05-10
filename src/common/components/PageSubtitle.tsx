import { Typography } from "@mui/material";
import React, { ReactNode } from "react";

interface PageSubtitleProps {
  sx?: object;
  children: ReactNode;
}

const PageSubtitle: React.FC<PageSubtitleProps> = ({ children, sx }) => {
  return (
    <Typography sx={sx} variant="h4" fontWeight={"600"} color={"gray.900"}>
      {children}
    </Typography>
  );
};

export default PageSubtitle;
