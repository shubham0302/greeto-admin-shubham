import React, { useCallback, useState } from "react";
import { useFetchProductList } from "../hooks/useFetchProductList";
import {
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  MenuItem,
  SelectChangeEvent,
  Switch,
  Typography,
} from "@mui/material";
import ProductTable from "./ProductTable";
import MaxWidthWrapper from "../../../common/components/MaxWidthWrapper";
import SFDropdownComp from "../../../common/components/SFDropdown";
import {
  ProductFilter,
  useFetchManuFacturerList,
  useToggle,
} from "../../../common";
import SFInput from "../../../common/components/SFInput";
import SFButton from "../../../common/components/Button";

type Props = {
  manufacturerId?: string;
  hideFilters?: boolean;
  fullWidth?: boolean;
};

const ProductListPage: React.FC<Props> = (props) => {
  const { manufacturerId, hideFilters = false, fullWidth = false } = props;
  const [name, setName] = useState("");
  const { data: manuFacturerList, isFetching: fetchingManuFacturer } =
    useFetchManuFacturerList();
  const onChangeName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  const [manu, setManu] = useState("");
  const onChangeManu = useCallback(
    (e: SelectChangeEvent<string | string[]>) => {
      setManu(e.target.value as string);
    },
    []
  );

  const {
    isOpen: isActive,
    open: openActive,
    close: closeActive,
  } = useToggle();
  const onToggleActive = useCallback(
    (_: any, c: boolean) => {
      if (c) {
        openActive();
      } else {
        closeActive();
      }
    },
    [closeActive, openActive]
  );

  const {
    isOpen: isVerified,
    open: openVerified,
    close: closeVerified,
  } = useToggle();
  const onToggleVerified = useCallback(
    (_: any, c: boolean) => {
      if (c) {
        openVerified();
      } else {
        closeVerified();
      }
    },
    [closeVerified, openVerified]
  );

  const [filters, setFilters] = useState<ProductFilter>({
    creator: manufacturerId,
  });
  const { data, isError, isFetching, errorMessage } =
    useFetchProductList(filters);

  const onSaveFilters = useCallback(() => {
    setFilters({
      active: isActive,
      isVerified: isVerified,
      name,
      creator: manu,
    });
  }, [isActive, isVerified, manu, name]);

  const onResetFilters = useCallback(() => {
    setFilters({ creator: manufacturerId });
    setName("");
    setManu("");
    closeActive();
    closeVerified();
  }, [closeActive, closeVerified, manufacturerId]);

  return (
    <MaxWidthWrapper
      width={fullWidth ? "100%" : "88%"}
      maxWidth={fullWidth ? "100%" : "88%"}
    >
      {!hideFilters && (
        <>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Product Filters
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 4,
              alignItems: "center",
              mb: 4,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <SFInput
                label={"Search"}
                placeholder="Search by product"
                value={name}
                onChange={onChangeName}
              />
            </Box>
            {!manufacturerId && (
              <Box sx={{ flex: 1 }}>
                {fetchingManuFacturer && <CircularProgress />}
                {!fetchingManuFacturer && (
                  <SFDropdownComp
                    options={manuFacturerList.map((e) => (
                      <MenuItem value={e._id}>{e.companyName}</MenuItem>
                    ))}
                    label={"ManuFacturer"}
                    value={manu}
                    onChange={onChangeManu}
                  />
                )}
              </Box>
            )}
            <FormControlLabel
              control={<Switch />}
              checked={isVerified}
              onChange={onToggleVerified}
              label={"Verified"}
            />
            <FormControlLabel
              checked={isActive}
              onChange={onToggleActive}
              control={<Switch />}
              label={"Active"}
            />

            <Button variant="outlined" onClick={onResetFilters}>
              Reset
            </Button>
            <SFButton onClick={onSaveFilters} disabled={fetchingManuFacturer}>
              Apply
            </SFButton>
          </Box>
        </>
      )}
      <Box sx={{ width: "100%" }}>
        {isFetching && <CircularProgress />}
        {!isFetching && (
          <>
            {isError && (
              <Typography>Error fetching products: {errorMessage}</Typography>
            )}
            {!isError && (
              <ProductTable
                products={data}
                manuFacturerList={manuFacturerList}
              />
            )}
          </>
        )}
      </Box>
    </MaxWidthWrapper>
  );
};

export default ProductListPage;
