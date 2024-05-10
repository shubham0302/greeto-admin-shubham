import { Box, IconButton, InputAdornment } from "@mui/material";
import SFLabel from "./SFLabel";
import SFInput from "./SFInput";
import { Search } from "@mui/icons-material";

interface SearchProps {
  placeholder: string;
  label?: string;
  labelSize?: number;
  labelColor?: string;
  styles?: object;
}

const SFSearch: React.FC<SearchProps> = (props) => {
  return (
    <Box sx={props.styles}>
      {props.label && (
        <SFLabel fontColor={props.labelColor} fontSize={props.labelSize}>
          {props.label}
        </SFLabel>
      )}
      <SFInput
        placeholder={props.placeholder}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton>
                <Search fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default SFSearch;
