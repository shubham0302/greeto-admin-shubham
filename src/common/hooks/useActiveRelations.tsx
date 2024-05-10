import { useCallback } from "react";
import { relationApiService } from "../../infrastructure";
import { relationActions, useAppDispatch, useAppSelector } from "../../store";

export const useActiveRelations = () => {
  const categoryState = useAppSelector((state) => state.relation);
  const dispatch = useAppDispatch();
  const { relations, status, errorMessage } = categoryState;
  const isLoading = status === "loading" || status === "initial";
  const isError = status === "error";

  const fetchRelations = useCallback(async () => {
    dispatch(relationActions.setLoadingRelations());
    const apiResponse = await relationApiService.getActiveRelationList();
    const { data, success, error } = apiResponse;
    if (success) {
      dispatch(relationActions.setSuccessRelations(data));
    } else {
      dispatch(relationActions.setErrorRelations(error));
    }
  }, [dispatch]);

  return {
    isLoading,
    isError,
    errorMessage,
    relations,
    fetchRelations,
  };
};
