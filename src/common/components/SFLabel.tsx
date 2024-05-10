import { Typography } from "@mui/material";
import React, { ReactNode } from "react";

interface LabelProps {
  fontSize?: number;
  fontColor?: string;
  children: ReactNode;
}

const SFLabel: React.FC<LabelProps> = ({ children, fontSize, fontColor }) => {
  return (
    <Typography
      fontSize={fontSize || "14px"}
      color={fontColor || "gray.900"}
      fontWeight={"400"}
      mb={"2px"}
    >
      {children}
    </Typography>
  );
};

export default SFLabel;
