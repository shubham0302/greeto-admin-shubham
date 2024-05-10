import { Box, CircularProgress } from "@mui/material";
import { FC, useCallback, useEffect, useState } from "react";
import { noOp } from "../../../../common";
import TableComp, { HeadData } from "../../../../common/components/TableComp";
import { Variant } from "../../../../common/types/productTypes";
import { useFetchVariantList } from "../../hooks";
import VariantRow from "./VariantRow";

const headData: HeadData[] = [
  {
    label: "SKU",
  },
  {
    label: "Verified",
  },
  {
    label: "Combinations",
  },
  {
    label: "Price",
  },
  {
    label: "Stock",
  },
  {
    label: "Action",
  },
];

type Props = {
  productId: string;
  padding?: number;
};

const VariantEditor: FC<Props> = (props) => {
  const { productId, padding = 4 } = props;

  const { data, isFetching } = useFetchVariantList(productId);

  const [variants, setVariants] = useState<Variant[]>(data);

  useEffect(() => {
    setVariants(data);
  }, [data]);

  const onChange = useCallback((variant: Variant, index: number) => {
    setVariants((prev) => prev.map((e, i) => (i === index ? variant : e)));
  }, []);

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
      {isFetching && <CircularProgress />}
      {!isFetching && (
        <TableComp
          headData={headData}
          body={variants.map((variant, idx) => (
            <VariantRow
              index={idx}
              onChangeVariant={onChange}
              onDeleteVariant={noOp}
              variant={variant}
              key={idx}
            />
          ))}
          isSticky
          maxHeight="400px"
        />
      )}
    </Box>
  );
};

export default VariantEditor;
