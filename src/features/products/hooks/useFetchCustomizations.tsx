import { useCallback, useMemo } from "react";
import {
  CustomizationConfig,
  DataState,
  FetchFunction,
  useDataFetch,
} from "../../../common";
import { productApiService } from "../../../infrastructure";

export const useFetchCustomizations = (
  productId: string,
  generateDemoData = false,
  disableAutoFetch = false
) => {
  const initialState = useMemo<DataState<CustomizationConfig[], string>>(
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

  const fetchFn = useCallback<
    FetchFunction<CustomizationConfig[]>
  >(async () => {
    const result = await productApiService.getProductCustomizations(
      productId,
      generateDemoData
    );
    return result;
  }, [generateDemoData, productId]);

  return useDataFetch(fetchFn, initialState, disableAutoFetch);
};
