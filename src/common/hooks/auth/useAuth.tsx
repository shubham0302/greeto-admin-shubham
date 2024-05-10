import { useCallback, useEffect, useMemo } from "react";
import { authService } from "../../../infrastructure";
import { authActions, useAppDispatch, useAppSelector } from "../../../store";
import { useAlert } from "../../alerts";
import { User } from "../../types";
import { useToggle } from "../useToggle";

export const useAuth = (updateProfile = false) => {
  const authState = useAppSelector((state) => state.auth);
  const { error: showError } = useAlert();
  const { errorMessage, isLoggedIn, status, user } = authState;
  // const isFetching = useMemo(() => status === "loading", [status]);
  const isAppLoading = useMemo(() => status === "initial", [status]);
  const isError = useMemo(() => status === "error", [status]);
  const {
    isOpen: loginInProgress,
    open: startLogin,
    close: finishLogin,
  } = useToggle();
  const {
    isOpen: isFetching,
    open: startFetching,
    close: finishFetching,
  } = useToggle();
  const {
    isOpen: logoutInProgress,
    open: startLogout,
    close: stopLogout,
  } = useToggle();
  const dispatch = useAppDispatch();
  const logoutSubmit = useCallback(
    async (cb?: () => void) => {
      startLogout();
      const loginResponse = await authService.logout();
      const { success, error } = loginResponse;
      if (success) {
        dispatch(authActions.setLogout());
        if (cb) {
          cb();
        }
      } else {
        showError(error?.message || "Something went wrong");
      }
      stopLogout();
    },
    [dispatch, showError, startLogout, stopLogout]
  );
  const signInSubmit = useCallback(
    async (identifier: string, password: string) => {
      startLogin();
      const loginResponse = await authService.login(identifier, password);
      const { success, error, data } = loginResponse;
      if (success) {
        dispatch(authActions.setSuccessUser(data));
      } else {
        finishLogin();
        showError(error?.message || "Something went wrong");
      }
    },
    [dispatch, finishLogin, showError, startLogin]
  );
  const fetchProfile = useCallback(async () => {
    startFetching();
    // await new Promise((res) =>
    //   setTimeout(() => {
    //     return res(true);
    //   }, 3000)
    // );
    const loginResponse = await authService.fetchProfile();
    const { data, success } = loginResponse;
    if (success) {
      dispatch(authActions.setSuccessUser(data));
    }
    finishFetching();
  }, [dispatch, finishFetching, startFetching]);

  useEffect(() => {
    if (updateProfile) {
      fetchProfile();
    }
  }, [fetchProfile, updateProfile]);

  const changeUser = useCallback(
    (user: User) => {
      dispatch(authActions.setUser(user));
    },
    [dispatch]
  );

  return {
    fetchProfile,
    signInSubmit,
    logoutSubmit,
    changeUser,
    user,
    isAppLoading,
    loginInProgress,
    logoutInProgress,
    isError,
    isFetching,
    isLoggedIn,
    errorMessage,
  };
};
