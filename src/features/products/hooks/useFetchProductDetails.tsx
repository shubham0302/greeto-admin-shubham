import { useCallback, useMemo } from "react";
import {
  DataState,
  FetchFunction,
  Product,
  useDataFetch,
} from "../../../common";
import { productApiService } from "../../../infrastructure";

export const useFetchProductDetails = (
  productId: string,
  generateDemoData = false,
  disableAutoFetch = false
) => {
  const initialState = useMemo<DataState<Product, string>>(
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

  const fetchFn = useCallback<FetchFunction<Product>>(async () => {
    const result = await productApiService.getProductDetails(
      productId,
      generateDemoData
    );
    return result;
  }, [generateDemoData, productId]);

  return useDataFetch(fetchFn, initialState, disableAutoFetch);
};
