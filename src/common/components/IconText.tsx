import { Box } from "@mui/material";
import React, { ReactNode } from "react";

interface IconTextProps {
  icon: ReactNode;
  iconColor?:
    | "primary"
    | "secondary"
    | "error"
    | "gray"
    | "warning"
    | "success";
  text: ReactNode | string;
  textColor?: string;
  noCapitalize?: boolean;
}

const IconText: React.FC<IconTextProps> = (props) => {
  const { noCapitalize = false } = props;
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.2,
      }}
    >
      <Box
        component={"span"}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: `${props.iconColor}.main` || "primary.main",
        }}
      >
        {props.icon}
      </Box>
      <Box
        component={"span"}
        color={props.textColor || "gray.main"}
        fontWeight={"400"}
        fontSize={15}
        textTransform={noCapitalize ? "lowercase" : "capitalize"}
      >
        {props.text}
      </Box>
    </Box>
  );
};

export default IconText;
