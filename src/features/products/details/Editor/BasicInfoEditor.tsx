import { Box, Typography } from "@mui/material";
import React from "react";
import {
  Product,
  noOp,
  useActiveCategories,
  useActiveRelations,
} from "../../../../common";
import SFTextEditor from "../../../../common/components/CKEditor";
import SFInput from "../../../../common/components/SFInput";
import SFMultipleSelect from "../../../../common/components/SFMultiDropdown";

type Props = {
  product: Product;
  onChangeProduct: (product: Product) => void;
  padding?: number;
};

const BasicInfoEditor: React.FC<Props> = (props) => {
  const { product, padding = 4 } = props;

  const { categories } = useActiveCategories();
  const { relations } = useActiveRelations();

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 4,
        p: padding,
      }}
    >
      <SFInput
        label="Product Name"
        placeholder="Enter product name here"
        value={product.name}
        disabled
      />
      <SFTextEditor value={product.description} disabled onChange={noOp} />
      <Box
        sx={{ display: "flex", gap: 2, alignItems: "center", width: "100%" }}
      >
        <Box sx={{ flex: 1 }}>
          <SFMultipleSelect
            label="Categories"
            options={categories.map((e) => ({ label: e.name, value: e._id }))}
            setValue={noOp}
            value={product.categories}
            fullWidth
            disabled
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <SFMultipleSelect
            label="For"
            options={relations.map((e) => ({ label: e.name, value: e._id }))}
            setValue={noOp}
            value={product.relatives}
            fullWidth
            disabled
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="labelXxl">Bullet Points</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {product.bulletPoints.map((point, key) => (
          <Box
            sx={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              gap: 2,
            }}
            key={key}
          >
            <SFInput
              placeholder="Enter points here"
              sx={{
                flex: 1,
              }}
              value={point}
              disabled
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default BasicInfoEditor;
