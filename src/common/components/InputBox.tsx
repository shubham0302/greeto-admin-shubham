import { Box, TextField, TextFieldProps, Typography } from "@mui/material";
import React from "react";

type Props = TextFieldProps;

const InputBox: React.FC<Props> = (props) => {
  const { label, children, ...rest } = props;

  return (
    <Box sx={{ width: "100%" }}>
      <Typography mb={1}>{label}</Typography>
      <TextField {...rest} fullWidth />
      {children}
    </Box>
  );
};

export default InputBox;
