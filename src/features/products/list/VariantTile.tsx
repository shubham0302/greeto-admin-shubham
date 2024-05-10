import { Image, Visibility } from "@mui/icons-material";
import { Box, Chip, Drawer, IconButton, Typography } from "@mui/material";
import React, { useCallback } from "react";
import { Variant, useToggle } from "../../../common";
import VariantDrawer from "../details/Editor/VariantDrawer";
import VariantNotificationTile from "./VariantNotificationTile";

type Props = {
  variant: Variant;
  onVariantSave: (variant: Variant, index: number) => void;
  onDeleteVariant: (index: number) => void;
  index: number;
};

const VariantTile: React.FC<Props> = (props) => {
  const { variant, index, onVariantSave } = props;
  const { isOpen, open, close } = useToggle();

  const onSave = useCallback(
    (variant: Variant) => {
      onVariantSave(variant, index);
    },
    [index, onVariantSave]
  );

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Drawer open={isOpen} anchor="right" onClose={close}>
        {isOpen && (
          <VariantDrawer
            onClose={close}
            onSave={onSave}
            variant={variant}
            idx={index}
          />
        )}
      </Drawer>
      <Box
        sx={{
          width: "80px",
          height: "80px",
          bgcolor: "gray.100",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {variant.photo ? (
          <img
            src={variant.photo}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        ) : (
          <Image />
        )}
      </Box>
      <Typography variant="labelXl">#{variant.sku}</Typography>
      <Chip
        label={variant.isVerified ? "Verified" : "Not Verified"}
        color={variant.isVerified ? "success" : "warning"}
        size="small"
        variant="outlined"
      />
      <Typography variant="bodyLr">
        <strong>{variant.type.length}</strong> Combinations
      </Typography>
      <Typography>₹{variant.price}</Typography>
      <Typography>{variant.stock} units</Typography>
      <Box
        sx={{
          ml: "auto",
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <VariantNotificationTile variantId={variant._id} />
        <IconButton onClick={open}>
          <Visibility />
        </IconButton>
      </Box>
    </Box>
  );
};

export default VariantTile;
