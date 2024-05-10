import { Visibility } from "@mui/icons-material";
import { Chip, Drawer, IconButton, TableCell, TableRow } from "@mui/material";
import { FC, useCallback } from "react";
import { useToggle } from "../../../../common";
import { Variant } from "../../../../common/types/productTypes";
import VariantDrawer from "./VariantDrawer";

type Props = {
  variant: Variant;
  onChangeVariant: (variant: Variant, index: number) => void;
  onDeleteVariant: (index: number) => void;
  index: number;
};

const VariantRow: FC<Props> = (props) => {
  const { index, variant, onChangeVariant } = props;

  const { open, isOpen, close } = useToggle();

  const onSave = useCallback(
    (variant: Variant) => {
      onChangeVariant(variant, index);
    },
    [index, onChangeVariant]
  );

  return (
    <>
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
      <TableRow>
        <TableCell>#{variant.sku}</TableCell>
        <TableCell>
          <Chip
            label={variant.isVerified ? "Verified" : "Not Verified"}
            color={variant.isVerified ? "success" : "warning"}
            size="small"
            variant="outlined"
          />
        </TableCell>
        <TableCell>{variant.type.length} Combinations</TableCell>
        <TableCell>₹{variant.price}</TableCell>
        <TableCell>{variant.stock} Units</TableCell>
        <TableCell>
          <IconButton onClick={open}>
            <Visibility />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
};

export default VariantRow;
