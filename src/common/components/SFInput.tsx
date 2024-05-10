import { Box, TextField, TextFieldProps } from "@mui/material";
import React from "react";
import SFLabel from "./SFLabel";

type SFInputProps = TextFieldProps & {
  labelColor?: string;
  labelSize?: number;
};

const SFInput: React.FC<SFInputProps> = ({
  label,
  variant = "filled",
  ...props
}) => {
  return (
    <Box width={"100%"}>
      <SFLabel fontColor={props.labelColor} fontSize={props.labelSize || 14}>
        {label}
      </SFLabel>
      <TextField
        {...props}
        variant="outlined"
        size="small"
        fullWidth
        inputProps={{
          style: { fontSize: 14 },
        }}
        sx={{
          bgcolor: variant === "filled" ? "gray.white" : "transparent",

          "& .MuiOutlinedInput-root": {
            height: props.multiline ? null : 40,
            "& fieldset": {
              borderRadius: 0,
              borderColor: "gray.100",
              fontSize: 14,
            },
            "&:hover fieldset": {
              borderColor: "gray.200",
            },
            "&.Mui-focused fieldset": {
              border: "1px solid",
              borderColor: "gray.400",
            },
            "&.Mui-error fieldset": {
              borderColor: "error.300",
              backgroundColor: "error.50",
            },
          },

          "& input::placeholder": {
            fontSize: "14px",
            fontWeight: "500",
          },
        }}
      />
    </Box>
  );
};

export default SFInput;
