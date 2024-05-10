import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { noOp } from "../../../../common";
import TableComp, { HeadData } from "../../../../common/components/TableComp";
import { useFetchCustomizations } from "../../hooks";
import CustomizationRow from "./CustomizationRow";

type Props = {
  productId: string;
  padding?: number;
};

const headData: HeadData[] = [
  {
    label: "Name",
  },
  {
    label: "Type",
  },
  {
    label: "Actions",
  },
];

const CustomisationEditor: React.FC<Props> = (props) => {
  const { productId, padding = 4 } = props;
  const { data, isError, isFetching, errorMessage } =
    useFetchCustomizations(productId);

  const [customizations, setCustomizations] = useState(data);
  useEffect(() => {
    setCustomizations(data);
  }, [data]);

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
        <>
          {isError && (
            <Typography>
              Error fetching customizations: {errorMessage}
            </Typography>
          )}
          {!isError && (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              ></Box>
              <TableComp
                headData={headData}
                body={customizations.map((e, i) => (
                  <CustomizationRow
                    customization={e}
                    index={i}
                    onDelete={noOp}
                    onEdit={noOp}
                    key={i}
                  />
                ))}
              />
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default CustomisationEditor;
