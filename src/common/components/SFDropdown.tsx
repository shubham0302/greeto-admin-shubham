import {
  FormControl,
  Select,
  SelectChangeEvent,
  SelectProps,
  Typography,
} from "@mui/material";
import React, { FC, ReactNode, useCallback, useMemo } from "react";
import SFLabel from "./SFLabel";

type DropdownProps<T> = SelectProps<T> & {
  options: React.ReactNode;
  setValue?: (value: T) => void;
  placeholder?: string;
  width?: number;
  fill?: boolean;
  fit?: boolean;
  labelFontSize?: number;
  labelFontColor?: string;
  noBorder?: boolean;
  noRender?: boolean;
  bgColor?: string;
  showBgColor?: boolean;
};

const SFDropdownComp: FC<DropdownProps<string | string[]>> = ({
  label,
  options,
  value,
  setValue,
  placeholder,
  width,
  noBorder = false,
  labelFontSize,
  labelFontColor,
  noRender = false,
  bgColor = "#fff",
  showBgColor = false,
  ...props
}) => {
  const renderValue = useMemo(
    () =>
      (val: any): ReactNode => {
        const value = val as any;
        return (
          <Typography color={"gray.600"} variant="bodyMd" fontWeight={"400"}>
            {value || placeholder}
          </Typography>
        );
      },
    [placeholder]
  );

  const handleChange = useCallback(
    (event: SelectChangeEvent<string | string[]>) => {
      setValue(event.target.value);
    },
    [setValue]
  );

  return (
    <FormControl
      fullWidth
      size="small"
      sx={{
        width: props.fill ? "100%" : props.fit ? "fit-content" : width,
      }}
    >
      {label && (
        <SFLabel fontSize={labelFontSize || 14} fontColor={labelFontColor}>
          {label}
        </SFLabel>
      )}
      <Select<string | string[]>
        size="small"
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        onChange={handleChange}
        displayEmpty
        renderValue={noRender ? props.renderValue : renderValue}
        sx={{
          backgroundColor:
            props.variant === "filled"
              ? "#fff"
              : showBgColor
              ? bgColor
              : "transparent",
          borderRadius: 0,

          ".MuiOutlinedInput-notchedOutline": {
            border: `${noBorder ? 0 : 1}px solid`,
            borderColor: "gray.100",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            border: `${noBorder ? 0 : 1}px solid`,
            borderColor: "gray.200",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: `${noBorder ? 0 : 1}px solid`,
            borderColor: "gray.400",
          },
          ".MuiSvgIcon-root ": {
            fill: "gray.500",
          },
        }}
        {...props}
      >
        {options}
      </Select>
    </FormControl>
  );
};

export default SFDropdownComp;
