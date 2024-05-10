import { useCallback, useMemo } from "react";
import {
  DataState,
  FetchFunction,
  VariantNotification,
  useDataFetch,
} from "../../../common";
import { productApiService } from "../../../infrastructure";

export const useFetchVariantNotificationList = (
  variantId: string,
  generateDemoData = false,
  disableAutoFetch = false
) => {
  const initialState = useMemo<DataState<VariantNotification[], string>>(
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
    FetchFunction<VariantNotification[]>
  >(async () => {
    const result = await productApiService.getVariantNotifications(
      variantId,
      generateDemoData
    );
    return result;
  }, [generateDemoData, variantId]);

  return useDataFetch(fetchFn, initialState, disableAutoFetch);
};
