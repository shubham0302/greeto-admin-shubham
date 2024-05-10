import { Box, Typography } from "@mui/material";
import React from "react";
import {
  CustomizationConfig,
  TextCustomizationConfig,
} from "../../../../common";
import SFInput from "../../../../common/components/SFInput";

type Props = {
  customization: TextCustomizationConfig;
  onChange: (config: CustomizationConfig) => void;
};

const TextCustomizationConfigEditor: React.FC<Props> = (props) => {
  const { customization } = props;

  return (
    <Box
      sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2 }}
    >
      <SFInput
        value={customization.sample}
        disabled
        name="sample"
        label="Sample"
        placeholder="eg. Name of a person"
      />
      <SFInput
        value={customization.noOfLine}
        disabled
        name="noOfLine"
        label="No. of Lines"
        placeholder="eg. 1"
        type="number"
      />
      <Typography>Character Limit</Typography>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <SFInput
          value={customization.minCharLimit}
          disabled
          name="minCharLimit"
          label="Min"
          placeholder="eg. 1"
          type="number"
        />
        <SFInput
          value={customization.maxCharLimit}
          disabled
          name="maxCharLimit"
          label="Max"
          placeholder="eg. 10"
          type="number"
        />
      </Box>
    </Box>
  );
};

export default TextCustomizationConfigEditor;
