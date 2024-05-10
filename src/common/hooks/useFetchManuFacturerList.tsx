import { useCallback, useMemo } from "react";
import { manufacturerApiService } from "../../infrastructure/ManuFacturerApiService";
import { Manufacturer, ManufacturerFilter } from "../types";
import { DataState, FetchFunction, useDataFetch } from "./useDataFetch";

export const useFetchManuFacturerList = (
  filters?: ManufacturerFilter,
  disableAutoFetch = false
) => {
  const initialState = useMemo<DataState<Manufacturer[], string>>(
    () => ({
      data: [],
      error: null,
      errorMessage: "",
      isError: false,
      isFetching: !disableAutoFetch,
      isSuccess: false,
    }),
    [disableAutoFetch]
  );

  const fetchFn = useCallback<FetchFunction<Manufacturer[]>>(async () => {
    const result = await manufacturerApiService.getManufacturerList(filters);
    return result;
  }, [filters]);

  return useDataFetch(fetchFn, initialState, disableAutoFetch);
};
