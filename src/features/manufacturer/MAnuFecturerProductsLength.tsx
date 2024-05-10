import { Box, CircularProgress, TableCell, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { useFetchProductList } from "../products/hooks";

type Props = {
  manufacturerId: string;
};

const ManuFecturerProductsLength: React.FC<Props> = (props) => {
  const { manufacturerId } = props;

  const filter = useMemo(() => ({ creator: manufacturerId }), [manufacturerId]);
  const { data, isFetching } = useFetchProductList(filter);

  return (
    <>
      {/* <TableCell>
      {isFetching && <CircularProgress />}
      {!isFetching && <>{data?.filter(e=>e.)?.length || 0} products</>}
    </TableCell> */}
      <TableCell>
        {isFetching && <CircularProgress />}
        {!isFetching && (
          <Box>
            <Typography>
              <strong>{data?.filter((e) => e.allVerified)?.length || 0}</strong>{" "}
              products
            </Typography>
          </Box>
        )}
      </TableCell>
      <TableCell>
        {isFetching && <CircularProgress />}
        {!isFetching && (
          <Box>
            <Typography>
              <strong>
                {data?.filter((e) => !e.allVerified)?.length || 0}
              </strong>{" "}
              products
            </Typography>
          </Box>
        )}
      </TableCell>
    </>
  );
};

export default ManuFecturerProductsLength;
