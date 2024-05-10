import { useCallback, useMemo } from "react";
import { manufacturerApiService } from "../../infrastructure/ManuFacturerApiService";
import { Manufacturer } from "../types";
import { DataState, FetchFunction, useDataFetch } from "./useDataFetch";

export const useFetchManuFacturerDetails = (
  id: string,
  disableAutoFetch = false
) => {
  const initialState = useMemo<DataState<Manufacturer, string>>(
    () => ({
      data: null,
      error: null,
      errorMessage: "",
      isError: false,
      isFetching: !disableAutoFetch,
      isSuccess: false,
    }),
    [disableAutoFetch]
  );

  const fetchFn = useCallback<FetchFunction<Manufacturer>>(async () => {
    const result = await manufacturerApiService.getManufacturerDetails(id);
    return result;
  }, [id]);

  return useDataFetch(fetchFn, initialState, disableAutoFetch);
};
