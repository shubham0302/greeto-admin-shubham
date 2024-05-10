import React, { ReactNode } from "react";
import { Box } from "@mui/material";

type Props = {
  width?: string;
  maxWidth?: string;
  children: ReactNode;
};

const MaxWidthWrapper: React.FC<Props> = (props) => {
  const { maxWidth = "88%", children, width } = props;
  return (
    <Box
      sx={{
        maxWidth,
        width,
        mx: "auto",
        p: 2,
      }}
    >
      {children}
    </Box>
  );
};

export default MaxWidthWrapper;
