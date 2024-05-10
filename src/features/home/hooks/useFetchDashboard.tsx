import { useCallback, useMemo } from "react";
import { DataState, FetchFunction, useDataFetch } from "../../../common";
import { DashboardType } from "../types";

export const useFetchDashboardCount = (disableAutoFetch = false) => {
  const initialState = useMemo<DataState<DashboardType, string>>(
    () => ({
      data: null,
      error: null,
      errorMessage: "",
      isError: false,
      isFetching: true,
      isSuccess: false,
    }),
    []
  );

  const fetchFn = useCallback<FetchFunction<DashboardType>>(async () => {
    // const result = await dashboardApiService.getCount();
    return null;
  }, []);

  return useDataFetch(fetchFn, initialState, disableAutoFetch);
};
