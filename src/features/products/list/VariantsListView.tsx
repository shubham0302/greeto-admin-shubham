import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { Variant, noOp } from "../../../common";
import { useFetchVariantList } from "../hooks/useFetchVariantList";
import VariantTile from "./VariantTile";

type Props = {
  productId: string;
};

const VariantsListView: React.FC<Props> = (props) => {
  const { productId } = props;
  const { data, errorMessage, isFetching, isError } =
    useFetchVariantList(productId);
  return (
    <Box sx={{ width: "100%", p: 2 }}>
      {isFetching && <CircularProgress />}
      {!isFetching && (
        <>
          {isError && (
            <Typography>Error fetching variants: {errorMessage}</Typography>
          )}
          {!isError && <VariantsList variants={data} />}
        </>
      )}
    </Box>
  );
};

type PropsList = {
  variants: Variant[];
};

const VariantsList: React.FC<PropsList> = (props) => {
  const { variants: pVariants } = props;

  const [variants, setVariants] = useState(pVariants);
  useEffect(() => {
    setVariants(pVariants);
  }, [pVariants]);

  const onChange = useCallback((variant: Variant, index: number) => {
    setVariants((prev) => prev.map((e, i) => (i === index ? variant : e)));
  }, []);

  return (
    <Box
      sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2 }}
    >
      {variants.map((variant, idx) => (
        <VariantTile
          variant={variant}
          key={idx}
          index={idx}
          onDeleteVariant={noOp}
          onVariantSave={onChange}
        />
      ))}
    </Box>
  );
};

export default VariantsListView;
