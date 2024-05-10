import { useCallback } from "react";
import {
  customizationActions,
  useAppDispatch,
  useAppSelector,
} from "../../store";
import { productApiService } from "../../infrastructure";
import { CustomizationConfig } from "..";

export const useTemplateCustomization = () => {
  const templateState = useAppSelector((state) => state.customizations);
  const dispatch = useAppDispatch();
  const { customizations, status, errorMessage } = templateState;
  const isLoading = status === "loading" || status === "initial";
  const isError = status === "error";

  const fetchTemplateCustomizations = useCallback(async () => {
    dispatch(customizationActions.setLoadingCustomizations());
    const apiResponse = await productApiService.getTemplateCustomizations();
    const { data, success, error } = apiResponse;
    if (success) {
      dispatch(customizationActions.setSuccessCustomizations(data));
    } else {
      dispatch(customizationActions.setErrorCustomizations(error));
    }
  }, [dispatch]);

  const onAddCustomization = useCallback(
    (customization: CustomizationConfig) => {
      dispatch(customizationActions.addCustomizations(customization));
    },
    [dispatch]
  );

  const onRemoveCustomization = useCallback(
    (customizationId: string) => {
      dispatch(customizationActions.removeCustomizations(customizationId));
    },
    [dispatch]
  );

  return {
    isLoading,
    isError,
    errorMessage,
    customizations,
    fetchTemplateCustomizations,
    onAddCustomization,
    onRemoveCustomization,
  };
};
