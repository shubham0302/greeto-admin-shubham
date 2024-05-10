import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FC } from "react";
import SFLabel from "./SFLabel";

type SFMultiSelectProps = {
  options: { label: string; value: string }[];
  label: string;
  value: string[];
  setValue: (value: string[]) => void;
  fullWidth?: boolean;
  disabled?: boolean;
};

const SFMultipleSelect: FC<SFMultiSelectProps> = (props) => {
  const {
    label,
    options,
    setValue,
    value,
    fullWidth = true,
    disabled = false,
  } = props;

  const handleChange = (event: SelectChangeEvent<typeof value>) => {
    const {
      target: { value },
    } = event;
    setValue(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div>
      <FormControl
        variant="outlined"
        size="small"
        sx={{ width: fullWidth ? "100%" : 300 }}
        disabled={disabled}
      >
        <SFLabel>{label}</SFLabel>
        <Select
          labelId={`demo-multiple-checkbox-label-${label}`}
          id={`demo-multiple-checkbox-${label}`}
          multiple
          value={value}
          size="small"
          disabled={disabled}
          sx={{
            borderRadius: 0,
            fontSize: 14,
          }}
          onChange={handleChange}
          renderValue={(selected) =>
            options
              .filter((e) => selected.includes(e.value))
              .map((e) => e.label)
              .join(", ")
          }
          MenuProps={{
            PaperProps: {
              style: {
                height: options?.length * 45 + 15,
                maxHeight: 500,
                width: 200,
              },
            },
          }}
        >
          {options.map((name) => (
            <MenuItem key={name.value} value={name.value}>
              <Checkbox
                sx={{ p: 0.6 }}
                size="small"
                checked={value.indexOf(name.value) > -1}
              />
              <ListItemText sx={{ fontSize: 14 }} primary={name.label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SFMultipleSelect;
