import { useCallback } from "react";
import { categoryApiService } from "../../infrastructure";
import { categoryActions, useAppDispatch, useAppSelector } from "../../store";

export const useActiveCategories = () => {
  const categoryState = useAppSelector((state) => state.category);
  const dispatch = useAppDispatch();
  const { categories, status, errorMessage } = categoryState;
  const isLoading = status === "loading" || status === "initial";
  const isError = status === "error";

  const fetchCategories = useCallback(async () => {
    dispatch(categoryActions.setLoadingCategories());
    const apiResponse = await categoryApiService.getActiveCategoryList();
    const { data, success, error } = apiResponse;
    if (success) {
      dispatch(categoryActions.setSuccessCategories(data));
    } else {
      dispatch(categoryActions.setErrorCategories(error));
    }
  }, [dispatch]);

  return {
    isLoading,
    isError,
    errorMessage,
    categories,
    fetchCategories,
  };
};
