import { useCallback, useMemo } from "react";
import { MediaType } from "../types";
import { DataState, FetchFunction, useDataFetch } from "./useDataFetch";
import { imageApiService } from "../../infrastructure";

export const useFetchMedia = (
  fileType: MediaType,
  disableAutoFetch = false
) => {
  const initialState = useMemo<DataState<string[], string>>(
    () => ({
      data: [],
      error: null,
      errorMessage: "",
      isError: false,
      isFetching: false,
      isSuccess: false,
    }),
    []
  );

  const fetchFn = useCallback<FetchFunction<string[]>>(async () => {
    const result = await imageApiService.getImageList(fileType);
    return result;
  }, [fileType]);

  return useDataFetch(fetchFn, initialState, disableAutoFetch);
};
