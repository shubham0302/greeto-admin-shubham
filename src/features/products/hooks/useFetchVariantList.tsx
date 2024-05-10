import { useCallback, useMemo } from "react";
import {
  DataState,
  FetchFunction,
  Variant,
  useDataFetch,
} from "../../../common";
import { productApiService } from "../../../infrastructure";

export const useFetchVariantList = (
  productId: string,
  generateDemoData = false,
  disableAutoFetch = false
) => {
  const initialState = useMemo<DataState<Variant[], string>>(
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

  const fetchFn = useCallback<FetchFunction<Variant[]>>(async () => {
    const result = await productApiService.getProductVariants(
      productId,
      generateDemoData
    );
    return result;
  }, [generateDemoData, productId]);

  return useDataFetch(fetchFn, initialState, disableAutoFetch);
};
