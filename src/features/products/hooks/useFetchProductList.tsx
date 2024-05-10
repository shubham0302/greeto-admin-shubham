import { useCallback, useMemo } from "react";
import {
  DataState,
  FetchFunction,
  Product,
  ProductFilter,
  useDataFetch,
} from "../../../common";
import { productApiService } from "../../../infrastructure";

export const useFetchProductList = (
  filters?: ProductFilter,
  generateDemoData = false,
  disableAutoFetch = false
) => {
  const initialState = useMemo<DataState<Product[], string>>(
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

  const fetchFn = useCallback<FetchFunction<Product[]>>(async () => {
    const result = await productApiService.getProductList(
      filters,
      generateDemoData
    );
    return result;
  }, [filters, generateDemoData]);

  return useDataFetch(fetchFn, initialState, disableAutoFetch);
};
