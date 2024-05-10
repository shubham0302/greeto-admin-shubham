import { useCallback, useMemo } from "react";
import {
  DataState,
  FetchFunction,
  Shipping,
  useDataFetch,
} from "../../../common";
import { productApiService } from "../../../infrastructure";

export const useFetchProductShippingDetails = (
  productId: string,
  generateDemoData = false,
  disableAutoFetch = false
) => {
  const initialState = useMemo<DataState<Shipping, string>>(
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

  const fetchFn = useCallback<FetchFunction<Shipping>>(async () => {
    const result = await productApiService.getShippingDetails(
      productId,
      generateDemoData
    );
    return result;
  }, [generateDemoData, productId]);

  return useDataFetch(fetchFn, initialState, disableAutoFetch);
};
