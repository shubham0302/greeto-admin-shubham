import { AddToPhotos, DeleteOutline } from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputAdornment,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useMemo } from "react";
import {
  CustomizationConfig,
  DropDownCustomizationConfig,
  noOp,
} from "../../../../common";
import MediaUploader from "../../../../common/components/MediaUploader";
import TableComp, { HeadData } from "../../../../common/components/TableComp";

type Props = {
  customization: DropDownCustomizationConfig;
  onChange: (config: CustomizationConfig) => void;
};

const headData: HeadData[] = [
  {
    label: "Sr No.",
  },
  {
    label: "Label",
  },
  {
    label: "Price",
  },
  {
    label: "Photo",
  },
  {
    label: "Actions",
  },
];

const DropdownCustomizationConfigEditor: React.FC<Props> = (props) => {
  const { customization } = props;

  const { options = [] } = customization;

  const rows = useMemo(
    () =>
      options.map((opt, i) => {
        return (
          <TableRow key={i}>
            <TableCell>{i + 1}</TableCell>
            <TableCell>
              <TextField value={opt.label} disabled placeholder="eg. book" />
            </TableCell>
            <TableCell>
              <TextField
                value={opt.price}
                disabled
                placeholder="eg. 100"
                type="number"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">₹</InputAdornment>
                  ),
                }}
              />
            </TableCell>
            <TableCell>
              <MediaUploader
                onRemove={noOp}
                onUpload={noOp}
                src={opt.charmUrl}
                type="image"
                height="50px"
                width="50px"
                noImageIcon={AddToPhotos}
              />
            </TableCell>
            <TableCell>
              <IconButton>
                <DeleteOutline />
              </IconButton>
            </TableCell>
          </TableRow>
        );
      }),
    [options]
  );

  return (
    <Box
      sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography>Customization Options</Typography>
      </Box>
      <TableComp body={rows} headData={headData} />
    </Box>
  );
};

export default DropdownCustomizationConfigEditor;
