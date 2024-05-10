import { Visibility } from "@mui/icons-material";
import { Drawer, IconButton, TableCell, TableRow } from "@mui/material";
import React from "react";
import { CustomizationConfig, noOp, useToggle } from "../../../../common";
import CustomizationDrawer from "./CustomizationDrawer";

type Props = {
  customization: CustomizationConfig;
  index: number;
  onEdit: (customization: CustomizationConfig, index: number) => void;
  onDelete: (index: number) => void;
};

const CustomizationRow: React.FC<Props> = (props) => {
  const { customization } = props;
  const { isOpen, open, close } = useToggle();

  return (
    <>
      <Drawer open={isOpen} anchor="right" onClose={close}>
        {isOpen && (
          <CustomizationDrawer
            onClose={close}
            onSave={noOp}
            customization={customization}
          />
        )}
      </Drawer>

      <TableRow>
        <TableCell>{customization.label}</TableCell>
        <TableCell>{customization.type}</TableCell>
        <TableCell>
          <IconButton onClick={open}>
            <Visibility />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
};

export default CustomizationRow;
