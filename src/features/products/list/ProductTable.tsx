import { Box } from "@mui/material";
import React from "react";
import { Manufacturer, Product, noOp } from "../../../common";
import ProductTile from "./ProductTile";

type Props = {
  products: Product[];
  manuFacturerList: Manufacturer[];
};

const ProductTable: React.FC<Props> = (props) => {
  const { products, manuFacturerList } = props;
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {products.map((product, idx) => (
        <ProductTile
          product={product}
          key={idx}
          onDeleteProduct={noOp}
          index={idx}
          manuFacturerList={manuFacturerList}
        />
      ))}
    </Box>
  );
};

export default ProductTable;
