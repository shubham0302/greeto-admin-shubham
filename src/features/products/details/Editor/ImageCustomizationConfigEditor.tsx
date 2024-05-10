import { Box } from "@mui/material";
import React from "react";
import {
  CustomizationConfig,
  ImageCustomizationConfig,
} from "../../../../common";
import SFInput from "../../../../common/components/SFInput";

type Props = {
  customization: ImageCustomizationConfig;
  onChange: (config: CustomizationConfig) => void;
};

const ImageCustomizationConfigEditor: React.FC<Props> = (props) => {
  const { customization } = props;

  return (
    <Box
      sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2 }}
    >
      <SFInput
        value={customization.noOfImages}
        disabled
        name="noOfImages"
        label="No. of Images"
        placeholder="eg. 1"
        type="number"
      />
    </Box>
  );
};

export default ImageCustomizationConfigEditor;
