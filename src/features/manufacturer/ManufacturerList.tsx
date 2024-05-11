import React, { useCallback, useEffect, useState } from "react";
import { Manufacturer, useFetchManuFacturerList } from "../../common";
import { Box } from "@mui/system";
import { CircularProgress, Typography } from "@mui/material";
import TableComp, { HeadData } from "../../common/components/TableComp";
import ManuFacturerRow from "./ManuFacturerRow";
import MaxWidthWrapper from "../../common/components/MaxWidthWrapper";

const headData: HeadData[] = [
  {
    label: "Sr No.",
  },
  {
    label: "Name",
  },
  {
    label: "Contact Details",
  },
  {
    label: "Verified Products",
  },
  {
    label: "Not Verified Products",
  },
  {
    label: "Actions",
  },
];

const ManufacturerList: React.FC<any> = () => {
  const { data, errorMessage, isError, isFetching } =
    useFetchManuFacturerList();
  const [list, setList] = useState(data);

  useEffect(() => {
    setList(data);
  }, [data]);

  const onChange = useCallback((manufacturer: Manufacturer) => {
    setList((prev) =>
      prev.map((e) => (e._id === manufacturer._id ? manufacturer : e))
    );
  }, []);

  return (
    <MaxWidthWrapper>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          gap: 2,
        }}
      >
        {/* filters */}
        {isFetching && <CircularProgress />}
        {!isFetching && (
          <>
            {isError && (
              <Typography>
                Error fetching manufacturers: {errorMessage}
              </Typography>
            )}
            {!isError && (
              <TableComp
                headData={headData}
                body={list?.map((e, i) => (
                  <ManuFacturerRow
                    index={i}
                    manufacturer={e}
                    onChange={onChange}
                  />
                ))}
              />
            )}
          </>
        )}
      </Box>
    </MaxWidthWrapper>
  );
};

export default ManufacturerList;
