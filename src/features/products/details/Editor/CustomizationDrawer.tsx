import { Close } from "@mui/icons-material";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import React from "react";
import {
  CustomizationConfig,
  DropDownCustomizationConfig,
  ImageCustomizationConfig,
  TextCustomizationConfig,
  noOp,
} from "../../../../common";
import SFButton from "../../../../common/components/Button";
import SFTextEditor from "../../../../common/components/CKEditor";
import SFInput from "../../../../common/components/SFInput";
import DropdownCustomizationConfigEditor from "./DropdownCustomizationConfigEditor";
import ImageCustomizationConfigEditor from "./ImageCustomizationConfigEditor";
import TextCustomizationConfigEditor from "./TextCustomizationConfigEditor";

type Props = {
  isCreate?: boolean;
  customization: CustomizationConfig;
  onSave: (config: CustomizationConfig) => void;
  onClose: () => void;
};

const CustomizationDrawer: React.FC<Props> = (props) => {
  const { customization, isCreate = false, onClose } = props;

  return (
    <Box
      sx={{
        minWidth: "500px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          p: 2,
          alignItems: "center",
        }}
      >
        <Typography variant="labelXxl">
          {isCreate ? "Create Customization" : "Edit Customization"}
        </Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Box>
      <Divider />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          p: 2,
          gap: 2,
        }}
      >
        <SFInput
          label={"Name"}
          placeholder="Name of customization"
          value={customization.label}
          disabled
        />
        <Typography>Instructions</Typography>
        <SFTextEditor
          value={customization.description}
          onChange={noOp}
          disabled
        />
        {customization.type === "text" && (
          <TextCustomizationConfigEditor
            customization={customization as TextCustomizationConfig}
            onChange={noOp}
          />
        )}
        {customization.type === "image" && (
          <ImageCustomizationConfigEditor
            customization={customization as ImageCustomizationConfig}
            onChange={noOp}
          />
        )}
        {customization.type === "dropdown" && (
          <DropdownCustomizationConfigEditor
            customization={customization as DropDownCustomizationConfig}
            onChange={noOp}
          />
        )}
      </Box>
      <Divider />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        <SFButton onClick={onClose}>Close</SFButton>
      </Box>
    </Box>
  );
};

export default CustomizationDrawer;
